import Link from "next/link";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";
import { useAuth } from "../(helpers)/authContext";

const FloatingButton = () => {
  const {token} = useAuth()
  return (
    <Link
      href={token ? "/compose/post" : '/auth/signin'}
      className="lg:hidden size-[60px] fixed flex items-center justify-center bottom-[90px] right-[35px] rounded-full p-[7px] bg-lightBlue text-white"
    >
      <BsPlus size={16} className="" />
      <RiLeafLine size={24} />
    </Link>
  );
};

export default FloatingButton;
