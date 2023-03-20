import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import {
  CalendarIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { Tweet, TweetBody } from "../typings";
import { fetchTweet } from "../utils/fetchTweets";
interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>;
}
function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const { data: session } = useSession();
  const [imageUrlBox, setImageUrlBox] = useState<Boolean>(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!imageRef.current?.value) return;
    setImage(imageRef.current.value);
    imageRef.current.value = "";
    setImageUrlBox(false);
  };
  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || "Unknown User",
      profilepics: session?.user?.image || "profilepics.jpg",
      image: image,
    };
    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: "POST",
    });
    const json = await result.json();
    const newTweets = await fetchTweet()
    setTweets(newTweets)

    toast('Tweet Posted')
    setInput('')
    setImage('')
    setImageUrlBox(false)
  };
  const handleTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    postTweet();
  };
  return (
    <div className="flex p-5 space-x-2 items-start">
      <img
        className="w-8 h-8 rounded-full mt-4 object-cover"
        src={session?.user?.image || "profilepics.jpg"}
        alt=""
      />
      <div className="flex flex-1 pl-2 items-center">
        <form className="flex flex-1 flex-col">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="How is coding tell me!"
            className="w-full h-16 text-xl outline-none placeholder:text-xl"
          />
          <div className="flex items-center">
            <div className="flex space-x-2 text-blue-400 flex-1">
              <PhotoIcon
                onClick={() => setImageUrlBox(!imageUrlBox)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <MagnifyingGlassIcon className="h-5 w-5" />
              <FaceSmileIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <MapPinIcon className="h-5 w-5" />
            </div>
            <button
              onClick={handleTweet}
              disabled={!input || !session}
              className="px-5 py-2 font-bold text-white bg-orange-400 rounded-full disabled:opacity-50"
            >
              Commune!!!
            </button>
          </div>
          {imageUrlBox && (
            <form className="rounded-lg mt-5 bg-orange-300 py-2 px-4 flex">
              <input
                ref={imageRef}
                type="text"
                placeholder="Enter Image URL ..."
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add image
              </button>
            </form>
          )}
          {image && (
            <img
              src={image}
              className="mt-10 rounded-xl shadow-lg h-40 w-full object-contain"
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
