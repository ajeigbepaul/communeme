import React, { useState } from 'react'
import toast from "react-hot-toast";
import {ArrowPathIcon} from "@heroicons/react/24/solid"
import TweetBox from './TweetBox'
import { Tweet } from '../typings'
import TweetComponent from './Tweet'
import { fetchTweet } from '../utils/fetchTweets'
interface Props{
  tweets:Tweet[]
}
function Feed({tweets:tweetsProp}:Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp);

  const handleRefresh = async()=>{
  const refreshToastnotify = toast.loading("refreshing...");
  const tweets = await fetchTweet();
     setTweets(tweets);
     toast.success('Feed Updated!',{id:refreshToastnotify,})
  }
  return (
    <div className='flex flex-col col-span-7 lg:col-span-5 border-x max-h-screen overflow-scroll'>
        <div className='flex justify-between items-center'>
            <h1 className='p-5 pb-0 font-bold'>Home</h1>
            <ArrowPathIcon 
            className='w-8 h-8 mt-5 mr-5 cursor-pointer text-orange-400 transition-all duration-500 ease-out hover:rotate-180 active:scale-125 font-bold'
            onClick={handleRefresh}/>
        </div>
        <div>
            <TweetBox setTweets={setTweets}/>
        </div>
        <div>
          {tweets.map(tweet=><TweetComponent key={tweet._id} tweet={tweet}/>)}
        </div>
    </div>
  )
}

export default Feed