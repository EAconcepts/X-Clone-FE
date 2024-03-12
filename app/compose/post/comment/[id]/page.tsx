"use client";

// const router = useRouter();
import { useParams, useRouter } from "next/navigation";
import {
  AiOutlineArrowLeft,
  AiOutlineGif,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { FaRegImage } from "react-icons/fa";
import { BiLocationPlus } from "react-icons/bi";
import {
  GrFormLocation,
  GrLocation,
  GrLocationPin,
  GrMapLocation,
} from "react-icons/gr";
import { useAuth } from "@/app/(helpers)/authContext";
import { useQueryClient } from "@tanstack/react-query";
import { TweetProps } from "@/app/page";
import Image from "next/image";





const NewComment = () => {
  const { user } = useAuth();
  const tweetId = useParams()._id
  
  const queryClient = useQueryClient()
  const retrievedData: any = queryClient.getQueryData(["allPosts"]);
  let tweets: TweetProps[] = retrievedData && retrievedData?.data?.data;
  const tweet = tweets && tweets.find((item) => tweetId === item._id);

  // console.log(tweets);
  


  return (
    <div className="bg-black text-white w-full h-full">
      <header className="px-3 py-3 items-center flex justify-between">
        <AiOutlineArrowLeft className="text-xl font-bold text-white" />

        <div className="flex gap-5 text-blue-700  items-center">
          <h2 className="font-bold text-sm">Drafts</h2>
          <button
            disabled={true}
            className="bg-blue-700 py-2 px-5 rounded-md text-white font-bold"
          >
            Reply
          </button>
        </div>
      </header>

      <div className="px-[13px]">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            {/* <img src={dp} className="w-[80px]" alt="" /> */}
            {/* <Image src={tweet?.user.avatar} alt="User profile" /> */}
            <div className="border-l-[3px] my-[8px] border-[#3e3d3d] h-[180px]"></div>
            {/* <img src={dp} className="w-[70px]" alt="" /> */}
          </div>

          <div className="border border-red-500">
            <div>
              <div className="flex items-center gap-1">
                <h4 className="name text-white font-bold text-base">
                  Amaka Okafor
                </h4>
                <h6 className="userrname opacity-70 text-sm text-[#e1e1e1]">
                  @makaybee
                </h6>
                <h6 className="timeposted text-sm opacity-70 text-[#e1e1e1]">
                  . 2h
                </h6>
              </div>
              <h4 className="postlink self-start text-sm font-light">
                Amen pic.twittwer.com/p2p61fdclm
              </h4>
            </div>

            <div>
              <div>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Ipsa, nulla? Explicabo odit deleniti, facilis quidem commodi
                </p>
                <p>#DAYO'2024</p>
                <p>#weddingsbells</p>
                <p>#IWD</p>
                <p className="text-sm mt-5 text-[#e1e1e1]">
                  <span className="opacity-50">Replying to</span>
                  <span className="username text-blue-600 opacity-100">
                    @makaybee
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 my-3 items-start">
          <div className="flex">
            {/* <img src={dp} className="w-[40px]" alt="" /> */}
          </div>

          <textarea
            name=""
            id=""
            className="bg-black outline-none border-none w-full"
            placeholder="Post your reply"
          ></textarea>
        </div>

        <div className="icons flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaRegImage className="text-blue-600 w-5" />
            <AiOutlineGif className="border-[1.5px] w-[16px] h-[12px] text-blue-600 border-blue-600" />
            <AiTwotoneCalendar className="text-blue-600 w-5" />
            <GrLocation className="text-blue-600 w-5" />
          </div>

          <div className="border w-5 h-5 rounded-full border-blue-600">
            {/* <input type="" className="border w-5 rounded-full bg-blue-600" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewComment;
