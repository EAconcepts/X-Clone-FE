import Link from "next/link";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

const FloatingButton = () => {
  return (
    <Link href='/compose/post'  className="size-[64px] fixed flex items-center justify-center bottom-[90px] right-[35px] rounded-full p-[8px] bg-secondary-foreground text-white">
      <BsPlus size={14} />
      <RiLeafLine size={24} />
    </Link>
  );
};

export default FloatingButton;
