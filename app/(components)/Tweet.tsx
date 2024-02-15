"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import avatarImg from "../(assets)/avatar.jpg";
import { LuDot } from "react-icons/lu";
import Image from "next/image";
import { TweetProps, user } from "../page";
import { BiMessageRounded } from "react-icons/bi";
import { FaBookmark, FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { IoBookmarkOutline, IoStatsChart } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../(helpers)/authContext";
import { toast } from "sonner";

const Tweet = ({ tweet }: { tweet: TweetProps }) => {
  const { token, user } = useAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
 
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const checkLike = () => {
    tweet.likedBy &&
      tweet.likedBy.find((item) => {
        if (item == user._id) {
          setHasLiked(true);
        } else {
          setHasLiked(false);
        }
      });
  };
  useEffect(()=>{

    checkLike()
  },[])
  const handlePostLike = (postId: string) => {
    axios
      .post(`http://localhost:7000/api/post/likes/${postId}`, "", { headers })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          if (response.data.message.includes("Liked")) {
            
            setHasLiked(true);
          } else if (response.data.message.includes("Unliked")) {
            
            setHasLiked(false);
          }
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message || error.response.message);
      });
  };
  return (
    <div className="w-full flex flex-col border-b border-b-border">
      <div className="w-full flex items-start">
        <Avatar className="w-[28px] h-[28px]">
          <AvatarImage src={avatarImg.src} className="object-cover" />
        </Avatar>
        {/* Tweet */}
        <div className=" w-full flex flex-col px-[8px]">
          {/* handle */}
          <div className="flex items-center gap-x-[4px] text-[12px] xl:text-[14px]">
            <span className="">{tweet?.user?.name}</span>
            <span className="text-primary-foreground">
              @{tweet.user.username}
            </span>
            <LuDot className="" />
            <span>{tweet.tweetTime && moment(tweet?.tweetTime).fromNow()}</span>
          </div>
          <pre className="text-wrap mt-[4px] text-[12px] font-sans">
            {tweet.content.length > 200
              ? tweet.content.slice(0, 200) + "..."
              : tweet.content}
          </pre>
          <div className="w-full px-[32px] pb-[8px]">
            {/* Images */}
            <div className="mt-[12px] grid grid-cols-2 place-items-center gap-[4px] border-[1px]  w-fit rounded-[16px] overflow-hidden justify-center">
              {/* {tweet.images &&
                tweet.images?.map((img: string, index: number) => (
                  <Image
                    key={index}
                    src={img}
                    alt={"img"}
                    height={50}
                    width={50}
                    className="w-[200px] h-[120px] object-cover"
                  />
                ))} */}
            </div>
            <div className="w-full flex text-[10px] xl:text-[12px] justify-between mt-[16px]">
              <div className="flex gap-x-[5px] items-center cursor-pointer">
                <BiMessageRounded />
                <span>1.2k</span>
              </div>
              <div className="flex gap-x-[5px] items-center cursor-pointer">
                <FaRetweet />
                <span>472</span>
              </div>
              <div
                onClick={() => handlePostLike(tweet._id)}
                className="flex gap-x-[5px] items-center cursor-pointer"
              >
                {hasLiked ? (
                  <FaHeart className="text-red-600`" />
                ) : (
                  <FaRegHeart />
                )}
                <span>2.7k</span>
              </div>
              <div className="flex gap-x-[5px] items-center cursor-pointer">
                <FaRetweet />
                <span>1.2k</span>
              </div>
              <div className="flex gap-x-[5px] items-center cursor-pointer">
                <IoStatsChart />
                <span>1.2k</span>
              </div>
              <div className="flex gap-x-[8px] items-center cursor-pointer">
                {
                  <IoBookmarkOutline />
                  // <FaBookmark />
                }
                <FiUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
