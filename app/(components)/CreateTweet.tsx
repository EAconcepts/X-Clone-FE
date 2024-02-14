"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import avatarImg from "../(assets)/avatar.jpg";
import { CiImageOn, CiLocationOn } from "react-icons/ci";
import { MdOutlineEmojiEmotions, MdOutlineGifBox } from "react-icons/md";
import { TbCalendarTime, TbLayoutGridRemove } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { TweetProps } from "../page";
import axios from "axios";
import { useAuth } from "../(helpers)/authContext";
import { toast } from "sonner";

const CreateTweet = ({
  newTweet,
  setNewTweet,
}: {
  newTweet: TweetProps;
  setNewTweet: Dispatch<SetStateAction<TweetProps>>;
}) => {
  const [tweet, setTweet] = useState<string>("");
  const [height, setHeight] = useState<string>();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const { token } = useAuth();
  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let h = e.target.scrollHeight;
    console.log(h);
    // setTweet(e.target.value);
    setNewTweet((prevVals) => ({ ...prevVals, [name]: value }));
    setHeight("30px");
    setHeight(`${e.target.scrollHeight < 30 ? 30 : e.target.scrollHeight}px`);
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handleCreateTweet = () => {
    console.log(newTweet);
    axios
      .post(`${apiUrl}/post/create-post`, newTweet, { headers })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-x-[8px] mt-[12px]">
        <Avatar className="w-[28px] h-[28px]">
          <AvatarImage src={avatarImg.src} className="object-cover" />
        </Avatar>
        <textarea
          onChange={onTextAreaChange}
          name="content"
          style={{ height: height }}
          className={`w-full bg-transparent md:text-[12px] xl:text-[14px] text-white focus-within:outline-none pr-[16px]`}
          value={newTweet.content}
          placeholder="What is happening?!"
        />
      </div>
      <div className="flex pl-[64px] pr-[16px] justify-between items-baseline mt-[12px]">
        <div className="flex gap-x-[14px] text-lightBlue items-center">
          <CiImageOn />
          <MdOutlineGifBox />
          <TbLayoutGridRemove />
          <MdOutlineEmojiEmotions />
          <TbCalendarTime />
          <CiLocationOn />
        </div>
        <Button
          onClick={handleCreateTweet}
          className="text-white w-fit md:text-[12px] xl:text-[14px] rounded-[16px] py-[2px] px-[18px]"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CreateTweet;
