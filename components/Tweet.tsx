import React, { useEffect, useState } from "react";
import { Comment, Tweet } from "../typings";
import TimeAgo from "react-timeago";
import {
  ChatBubbleBottomCenterIcon,
  HeartIcon,
  ArrowUpTrayIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import { fetchComments } from "../utils/fetchComments";
interface Props {
  tweet: Tweet;
}
function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };
  useEffect(() => {
    refreshComments();
  },[]);
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
        <div className="flex items-center cursor-pointer space-x-3 text-gray-400">
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

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-8 h-8 border-x border-orange-500/30"/>
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
