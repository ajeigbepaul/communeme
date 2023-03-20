import React from "react";

interface Props {
  Icon: JSX.Element;
  title: string;
  onClick?:()=>{}
}

export default function SidebarRow({ Icon, title , onClick}: Props) {
  return (
    <div onClick={()=>onClick?.()} className="flex items-center space-x-2 px-4 py-3 rounded-full hover:bg-blue-50 cursor-pointer group transition-all duration-300 max-w-fit ">
      {Icon}
      <p className="hidden text-base font-light group-hover:text-blue-400 md:inline-flex lg:text-xl">{title}</p>
    </div>
  );
}
