import React from 'react'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  EnvelopeIcon,
  ListBulletIcon,
  EllipsisHorizontalCircleIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {useSession, signIn, signOut} from "next-auth/react"
import SidebarRow from './SidebarRow';
function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className='flex flex-col col-span-2 items-center px-4 md:items-start'>
      <img src="communelogo.png" alt="logo" className="w-16 h-16" />
      <SidebarRow Icon={<HomeIcon className="w-6 h-6" />} title="Home" />
      <SidebarRow Icon={<HashtagIcon className="w-6 h-6" />} title="Explore" />
      <SidebarRow
        Icon={<BellIcon className="w-6 h-6" />}
        title="Notification"
      />
      <SidebarRow Icon={<EnvelopeIcon className="w-6 h-6" />} title="Messge" />
      <SidebarRow
        Icon={<BookmarkIcon className="w-6 h-6" />}
        title="Bookmarks"
      />
      <SidebarRow Icon={<ListBulletIcon className="w-6 h-6" />} title="Lists" />

      <SidebarRow Icon={<UserIcon className="w-6 h-6" />} title={session ? 'Sign Out' : 'Sign In'} onClick={session ? signOut : signIn}/>
      <SidebarRow
        Icon={<EllipsisHorizontalCircleIcon className="w-6 h-6" />}
        title="More"
      />
    </div>
  );
}

export default Sidebar



