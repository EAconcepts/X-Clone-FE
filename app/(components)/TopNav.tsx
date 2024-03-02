"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { CiSettings } from "react-icons/ci";
import avatarImg from "../(assets)/avatar.jpg";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "../(helpers)/authContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const TopNav = ({ scrollTopPos }: { scrollTopPos: boolean }) => {
  const [activeTab, setActiveTab] = useState<string>("for you");
  const handleForYouTab = () => {
    setActiveTab("for you");
  };
  const { token, setToken } = useAuth();
  const router = useRouter()

  const handleFollowingTab = () => {
    setActiveTab("following");
  };
  const signOut = () => {
    router.push("/auth/siginin");
    localStorage.clear();
    setToken(null);
    toast.success('Logout successful')
  };
  return (
    <nav
      className={`w-full sticky top-0 z-10 bg-transparent pt-[4px] px-[24px] lg:px-[24px] h-[80px] lg:h-[40px] border-b border-b-border flex flex-col lg:flex-row  lg:items-center justify-between lg:pl-[32px] max-lg:bg-gradient-to-b from-black to-slate-500/10 max-lg:mb-[8px] transition-all duration-700 ${
        !scrollTopPos && "max-lg:translate-y-[-100px]"
      }`}
    >
      <div className="w-full z-10 flex lg:hidden justify-between mb-[18px]">
        <Avatar className="w-[32px] h-[32px]">
          <AvatarImage src={avatarImg.src} className="object-cover" />
        </Avatar>
        <FaXTwitter size={28} />
        <button className="block lg:hidden">
          <CiSettings onClick={signOut} size={20} color="white" />
        </button>
      </div>
      <div className="fixed top-0 left-0   w-full h-[80px] lg:h-[40px] backdrop-blur"></div>
      <div className="w-full flex justify-between">
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
        <button className="lg:block hidden">
          <CiSettings color="white" />
        </button>
      </div>
    </nav>
  );
};
export default TopNav;
