"use client";

import { useState } from "react";
import { CiSettings } from "react-icons/ci";

const TopNav = () => {
  const [activeTab, setActiveTab] = useState<string>("for you");
  const handleForYouTab = () => {
    setActiveTab("for you");
  };
  const handleFollowingTab = () => {
    setActiveTab("following");
  };
  return (
    <nav className="w-full sticky top-0 z-10 bg-transparent pt-[4px] px-[24px] h-[40px] border-b border-b-border flex items-center justify-between pl-[32px]">
      <div className='fixed top-0 w-full h-[40px] backdrop-blur'></div>
      <button
        onClick={handleForYouTab}
        className={`${activeTab === "for you" && "relative activeTab"}`}
      >
        For you
      </button>
      <button
        onClick={handleFollowingTab}
        className={` relative ${activeTab === "following" && "activeTab"} `}
      >
        Following
      </button>
      <button>
        <CiSettings color="white" />
      </button>
    </nav>
  );
};
export default TopNav;
