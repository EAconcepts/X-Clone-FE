"use client";

import React, { useEffect, useState } from "react";
import { CiMail, CiSearch } from "react-icons/ci";
import { GoHomeFill } from "react-icons/go";
import { LinksProp } from "./LeftMenu";
import { BsSlashSquare } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import Link from "next/link";

const Footer = ({scrollPos}:{scrollPos:string}) => {
  const footerLinks: LinksProp[] = [
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
      title: "Grok",
      icon: BsSlashSquare,
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
  ];

  return (
    <footer className={`w-[100vw] bg-black px-[16px] py-[8px] h-fit flex justify-between fixed bottom-0 left-0 border-t-[1px] border-t-border ${scrollPos=='up' && 'opacity-35'}`}>
      {footerLinks.map((item, index) => (
        <Link key={index} href={"#"} className="">
          <item.icon size={26} />
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
