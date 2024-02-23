"use client";
import { TweetProps } from "@/app/page";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { FaHeart, FaRegHeart, FaRetweet } from "react-icons/fa6";
import {
  IoCloseOutline,
  IoEllipsisHorizontal,
  IoStatsChart,
} from "react-icons/io5";

interface ViewImagesProps {
  images: string[] | undefined;
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, string, unknown>;
  tweet: TweetProps | undefined;
  hasLiked: boolean;
  setShowImages: React.Dispatch<React.SetStateAction<boolean>>;
}
const ViewImages = ({
  images,
  mutate,
  tweet,
  hasLiked,
  setShowImages,
}: ViewImagesProps) => {
  const [showOptions, setShowoptions] = useState<boolean>(true);
  return (
    <div className="fixed h-screen top-0 bottom-0 bg-black left-0 w-full z-20">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full h-full relative"
      >
        {showOptions && (
          <>
            {/* Top nav */}
            <div className="absolute top-[4px] w-full px-[8px] max-w-full flex justify-between">
              {/* Close Icon */}
              <div
                onClick={() => setShowImages(false)}
                className="rounded-full p-[4px] text-white bg-black z-20"
              >
                <IoCloseOutline size={26} />
              </div>
              {/* More  */}
              <div className="rounded-full p-[4px] text-white bg-black">
                <IoEllipsisHorizontal size={24} />
              </div>
            </div>
            {/* bottom Icons */}
            <div className="w-full px-[16px] absolute bottom-[12px] flex gap-x-[6px] text-[14px] xl:text-[12px] justify-center mt-[16px]">
              {/* comment */}
              <div className="flex gap-x-[5px] items-center cursor-pointer">
                <BiMessageRounded size={18} />
                <span>1.2k</span>
              </div>
              {/* Retweet */}
              <div className="flex gap-x-[5px] items-center cursor-pointer">
                <FaRetweet size={18} />
                <span>472</span>
              </div>
              {/* Like */}
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
              {/* Impression */}
              <div className="flex gap-x-[5px] items-center cursor-pointer">
                <IoStatsChart size={18} />
                <span>1.2k</span>
              </div>
            </div>
          </>
        )}
        <CarouselContent>
          {images &&
            images.map((item, index) => (
              <CarouselItem key={index} className="relative w-full ">
                {/* Image */}
                <Image
                  onClick={() => setShowoptions((prev) => !prev)}
                  width={500}
                  height={500}
                  src={item}
                  alt={""}
                  className="w-full mt-[32px] h-[] z-30"
                />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ViewImages;
