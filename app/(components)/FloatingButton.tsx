import React from "react";
import { BsPlus } from "react-icons/bs";
import { RiLeafLine } from "react-icons/ri";

const FloatingButton = () => {
  return (
    <div className="size-[64px] fixed flex items-center justify-center bottom-[90px] right-[35px] rounded-full p-[8px] bg-secondary-foreground text-white">
      <BsPlus size={14} />
      <RiLeafLine size={24} />
    </div>
  );
};

export default FloatingButton;
