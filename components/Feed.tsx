import React from 'react'
import {ArrowPathIcon} from "@heroicons/react/24/solid"
import TweetBox from './TweetBox'

function Feed() {
  return (
    <div className='flex flex-col col-span-7 lg:col-span-5 border-x'>
        <div className='flex justify-between items-center'>
            <h1 className='p-5 pb-0 font-bold'>Home</h1>
            <ArrowPathIcon className='w-8 h-8 mt-5 mr-5 cursor-pointer text-orange-400 transition-all duration-500 ease-out hover:rotate-180 active:scale-125 font-bold'/>
        </div>
        <div>
            <TweetBox/>
        </div>
    </div>
  )
}

export default Feed