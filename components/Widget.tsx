import React from 'react'
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline"
import {TwitterTimelineEmbed} from "react-twitter-embed"
function Widget() {
  return (
    <div className="mt-2 px-2 col-span-2 hidden lg:inline">
      <div className="mt-2 flex items-center space-x-2 rounded-full bg-blue-100 p-3">
        <MagnifyingGlassIcon className="w-6 h-6 text-gray-500" />
        <input
          type="text"
          placeholder="Search Communeme"
          className="outline-none bg-transparent flex-1"
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="ajeigbepaul"
        options={{ height: 700,width:300 }}
      />
    </div>
  );
}

export default Widget