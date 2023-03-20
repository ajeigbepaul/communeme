import React, { useEffect, useRef, useState } from "react";
import { Comment, CommentBody, Tweet } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
  ArrowUpTrayIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { fetchComments } from "../utils/fetchComments";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
interface Props {
  tweet: Tweet;
}
function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  // const commentRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState<string>("");
  const [commentBox, setCommentBox] = useState<Boolean>(false);
  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };
  useEffect(() => {
    refreshComments();
  }, []);
  const postComment = async () => {
    const refreshToastnotify = toast.loading("Loading...");
    const commentInfo: CommentBody = {
      comment: input,
      username: session?.user?.name || "Unknown User",
      profileImg: session?.user?.image || "profilepics.jpg",
      tweetId: tweet._id,
    };
    const result = await fetch(`/api/addComment`, {
      body: JSON.stringify(commentInfo),
      method: "POST",
    });
    const json = await result.json();
    const newComment = await fetchComments(tweet._id);
    setComments(newComment);
    setInput("");
    setCommentBox(false);
   toast.success("Comment made!!", { id: refreshToastnotify });
    return json;
  };
  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postComment();
  };
  return (
    <div className="p-5 flex flex-col space-x-3 border-y border-gray-200">
      <div className="flex space-x-1">
        <img
          src={tweet.profilepics}
          alt=""
          className="bg-red-500 rounded-full w-10 h-10"
        />
        <div>
          <div className="flex items-center space-x-1">
            <p className="font-bold mr-1">{tweet.username}</p>
            <p className="hiden text-sm text-gray-400 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()}
            </p>
            <TimeAgo
              className="text-sm text-gray-400"
              date={tweet._createdAt}
            />
          </div>
          <p>{tweet.text}</p>
          {tweet?.image && (
            <img
              src={tweet.image}
              alt=""
              className=" bg-slate-400 max-h-60 m-5 ml-0 rounded-lg shadow-sm"
            />
          )}
        </div>
      </div>
      <div className="flex mt-1 justify-between">
        <div
          onClick={() => session && setCommentBox(!commentBox)}
          className="flex items-center cursor-pointer space-x-3 text-gray-400"
        >
          <ChatBubbleBottomCenterIcon className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex items-center cursor-pointer space-x-3 text-gray-400">
          <ArrowsRightLeftIcon className="h-5 w-5" />
        </div>
        <div className="flex items-center cursor-pointer space-x-3 text-gray-400">
          <HeartIcon className="w-5 h-5" />
        </div>
        <div className="flex items-center cursor-pointer space-x-3 text-gray-400">
          <ArrowUpTrayIcon className="w-5 h-5" />
        </div>
      </div>
      {commentBox && (
        <form className="mt-3 flex space-x-3" onSubmit={handleComment}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Comment ..."
            className="bg-gray-100 flex-1 rounded-lg outline-none p-3"
          />
          <button
            type="submit"
            disabled={!input}
            className="text-orange-300 disabled:text-gray-100"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar-thin scrollbar-thumb-gray-500">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-8 h-8 border-x border-orange-500/30" />
              <img
                src={comment.profileImg}
                className="h-7 w-7 rounded-full object-cover"
                alt=""
              />
              <div className="">
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hiden font-sm text-gray-400 sm:inline">
                    @{tweet.username.replace(/\s+/g, "").toLowerCase()}
                  </p>
                  <TimeAgo
                    className="text-gray-400"
                    date={comment._createdAt}
                  />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
