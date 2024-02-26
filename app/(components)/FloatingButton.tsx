import Link from "next/link";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

const FloatingButton = () => {
  return (
    <Link
      href="/compose/post"
      className="lg:hidden size-[60px] fixed flex items-center justify-center bottom-[90px] right-[35px] rounded-full p-[7px] bg-lightBlue text-white"
    >
      <BsPlus size={16} className="" />
      <RiLeafLine size={24} />
    </Link>
  );
};

export default FloatingButton;
