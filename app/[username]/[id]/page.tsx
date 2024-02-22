"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  IoArrowBackOutline,
  IoBookmarkOutline,
  IoStatsChart,
} from "react-icons/io5";
import avatarImg from "../../(assets)/avatar.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TweetProps } from "@/app/page";
import { LuDot } from "react-icons/lu";
import moment from "moment";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "@/app/(helpers)/authContext";
import Image from "next/image";
import { BiMessageRounded } from "react-icons/bi";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";

const ViewTweet = () => {
  const tweetId = useParams().id;
  const queryClient = useQueryClient();
  const router = useRouter();
  const retrievedData: any = queryClient.getQueryData(["allPosts"]);
  let tweets: TweetProps[] = retrievedData && retrievedData?.data?.data;
  console.log(tweets);
  const tweet = tweets && tweets.find((item) => tweetId === item._id);

  const { token, user } = useAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const checkLike = () => {
    tweet &&
      tweet.likedBy &&
      tweet.likedBy.find((item) => {
        if (item == user._id) {
          setHasLiked(true);
        } else {
          setHasLiked(false);
        }
      });
  };
  useEffect(() => {
    checkLike();
  }, []);
  const { data, mutate } = useMutation({
    mutationFn: (postId: string) =>
      axios.post(`${apiUrl}/post/likes/${postId}`, "", { headers }),
    onSuccess: async (data) => {
      console.log(data);
      if (data.data.message.includes("Liked")) {
        setHasLiked(true);
      } else if (data.data.message.includes("Unliked")) {
        setHasLiked(false);
      }
      await queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      toast.success(data.data.message);
    },
  });
  let hasImage = false;
  tweet &&
    tweet.images?.find((image) => {
      if (image !== null) {
        hasImage = true;
      }
    });
  return (
    <div>
      {/* Top Nav */}
      <nav className="bg-transparent w-full sticky top-0  h-[52px] py-[8px] px-[16px] backdrop-blur-sm">
        <div
          onClick={() => router.back()}
          className="flex items-center gap-x-[24px] text-white"
        >
          <IoArrowBackOutline size={16} />
          <span>Post</span>
        </div>
      </nav>
      {/* TWEET */}
      <section>
        <div className="w-full flex flex-col border-b border-b-border">
          <div className="w-full flex items-start">
            {/* Avatar */}
            <Avatar className=" size-[30px] lg:w-[28px] lg:h-[28px]">
              <AvatarImage src={avatarImg.src} className="object-cover" />
            </Avatar>
            {/* Tweet */}
            <div className=" w-full flex flex-col px-[8px]">
              {/* handle */}
              <div className="flex lg:flex-row flex-col lg:items-center gap-y-[2px] lg:gap-[4px] text-[14px] xl:text-[16px]">
                <span className="">{tweet?.user?.name}</span>
                <div className="flex flex-row gap-x-[4px]">
                  <span className="text-primary-foreground">
                    @{tweet && tweet.user.username}
                  </span>
                  <LuDot size={16} className="" />
                  <span className="max-lg:text-primary-foreground">
                    {tweet &&
                      tweet.tweetTime &&
                      moment(tweet?.tweetTime).fromNow()}
                  </span>
                </div>
              </div>
              {/* TWEET */}
              <pre className="text-wrap mt-[4px] text-[12px] font-sans">
                {tweet && tweet.content.length > 200
                  ? tweet.content.slice(0, 200) + "..."
                  : tweet && tweet.content}
              </pre>
              <div className="w-full lg:px-[32px] pb-[8px]">
                {/* Images */}
                {hasImage && tweet?.images && tweet?.images?.length > 0 && (
                  <div className="mt-[12px] flex flex-wr place-items-center gap-[4px] border-[1px] h-[150px] max-w-[]  w-full rounded-[16px] overflow-hidden justify-center">
                    {tweet?.images &&
                      hasImage &&
                      tweet?.images?.length > 0 &&
                      tweet?.images?.map((img: string, index: number) => (
                        <Image
                          key={index}
                          src={img}
                          alt={"img"}
                          height={300}
                          width={300}
                          className="w[200px] w-full h-full  object-cover"
                        />
                      ))}
                  </div>
                )}
                {/* Icons */}
                <div className="w-full flex justify-end gap-x-[8px] text-[12px] xl:text-[12px] lg:justify-between mt-[16px]">
                  <div className="flex gap-x-[5px] items-center cursor-pointer">
                    <BiMessageRounded size={18} />
                    <span>1.2k</span>
                  </div>
                  <div className="flex gap-x-[5px] items-center cursor-pointer">
                    <FaRetweet size={18} />
                    <span>472</span>
                  </div>
                  <div
                    onClick={() => tweet && mutate(tweet._id)}
                    className="flex gap-x-[5px] items-center cursor-pointer"
                  >
                    {hasLiked ? (
                      <FaHeart className="text-red-600" size={18} />
                    ) : (
                      <FaRegHeart size={18} />
                    )}
                    <span> {tweet && tweet.likedBy?.length}</span>
                  </div>
                  <div className="flex gap-x-[5px] items-center cursor-pointer">
                    <FaRetweet size={18} />
                    <span>1.2k</span>
                  </div>
                  <div className="flex gap-x-[5px] items-center cursor-pointer">
                    <IoStatsChart size={18} />
                    <span>1.2k</span>
                  </div>
                  <div className="lg:flex hidden gap-x-[8px] items-center cursor-pointer">
                    {
                      <IoBookmarkOutline size={18} />
                      // <FaBookmark />
                    }
                    <FiUpload size={18} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewTweet;
