'use client'

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IconType } from "react-icons";
import { BsSlashSquare } from "react-icons/bs";
import { CiCircleMore, CiMail, CiSearch, CiUser } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { GoHomeFill } from "react-icons/go";
import { IoEllipsisHorizontal, IoNotifications } from "react-icons/io5";
import avatarImg from "../(assets)/avatar.jpg";
import { usePathname } from "next/navigation";
import { Popover } from "@/components/ui/popover";
import PopoverDialog from "./Popover";

export interface LinksProp {
  title: string;
  icon: IconType;
  link: string;
  linkFn?: ()=>void;
}
export const LeftMenu = () => {
  const navLinks: LinksProp[] = [
    {
      title: "Home",
      icon: GoHomeFill,
      link: "#",
    },
    {
      title: "Explore",
      icon: CiSearch,
      link: "#",
    },
    {
      title: "Notifications",
      icon: IoNotifications,
      link: "#",
    },
    {
      title: "Messages",
      icon: CiMail,
      link: "#",
    },
    {
      title: "Grok",
      icon: BsSlashSquare,
      link: "#",
    },
    {
      title: "Premium",
      icon: FaXTwitter,
      link: "#",
    },
    {
      title: "Profile",
      icon: CiUser,
      link: "#",
    },
    // {
    //   title: "More",
    //   icon: CiCircleMore,
    //   link: "#",
    // },
  ];
  const popoverLinks = [

  ]
  const location = usePathname()
  const popoverContent=(
    <div></div>
  )
  return (
    <aside
      className={`${
        location.includes("/auth") && "hidden"
      } w-[30%] hidden relative border-r pl-[64px] pr-[24px] h-[100vh]  overflow-hidden xl:overflow-y-scroll lg:flex flex-col pt-[8px] pb-[16px] `}
    >
      <FaXTwitter size={28} />
     
      <nav className="flex flex-col mt-[14px] md:gap-y-[14px] lg:gap-y-[16px] xl:gap-y-[18px] ">
        {navLinks?.map((item: LinksProp, index: number) => (
          <Link
            key={index}
            href={item.link}
            className="flex items-center gap-x-[12px] text-[12px] lg:text-[14px] xl:text-[16px]"
          >
            <item.icon size={18} /> <span className="">{item.title}</span>
          </Link>
        ))}
        <PopoverDialog
          triggerText={
            <div className="flex items-center gap-x-[12px] text-[12px] lg:text-[14px] xl:text-[16px]">
              <CiCircleMore size={18} /> <span className="">More</span>
            </div>
          }
        >
          Children
        </PopoverDialog>
        <Button className="w-full lg:text-[10px] xl:text-[16px] rounded-[20px] text-white">
          Post
        </Button>
      </nav>
      <div className="absolute bottom-[8px] right-0 flex items-center gap-x-[8px] text-[10px] xl:text-[12px]">
        <Avatar className="w-[32px] h-[32px]">
          <AvatarImage src={avatarImg.src} className="object-cover" />
        </Avatar>
        <div className="flex flex-col">
          <h3 className=" text-nowrap">Emmanuel Ayodeji A.</h3>
          <p className=" text-primary-foreground">@emmycodes_</p>
        </div>
        <IoEllipsisHorizontal size={16} />
      </div>
    </aside>
  );
};
