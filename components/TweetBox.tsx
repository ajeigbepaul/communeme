import React, { useState } from "react";
import {
  CalendarIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
function TweetBox() {
  const [input, setInput] = useState<string>("");
  return (
    <div className="flex p-5 space-x-2 items-start">
      <img
        className="w-8 h-8 rounded-full mt-4 object-cover"
        src="profilepics.jpg"
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
              <PhotoIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <MagnifyingGlassIcon className="h-5 w-5" />
              <FaceSmileIcon className="h-5 w-5" />
              <CalendarIcon className="h-5 w-5" />
              <MapPinIcon className="h-5 w-5" />
            </div>
            <button disabled={!input} className="px-5 py-2 font-bold text-white bg-orange-400 rounded-full disabled:opacity-50">
              Commune!!!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TweetBox;
