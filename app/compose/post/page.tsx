"use client";

import { useAuth } from "@/app/(helpers)/authContext";
import { TweetProps } from "@/app/page";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Globe, XIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { CiImageOn, CiLocationOn } from "react-icons/ci";
import { IoArrowBackOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions, MdOutlineGifBox } from "react-icons/md";
import { TbCalendarTime, TbLayoutGridRemove, TbWorld } from "react-icons/tb";
import { toast } from "sonner";
import avatarImg from "../../(assets)/avatar.jpg";
import { FaGlobeAmericas } from "react-icons/fa";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

const Post = () => {
  const { token, user } = useAuth();
  const [newTweet, setNewTweet] = useState<TweetProps>({
    _id: "",
    tweetTime: new Date().toUTCString(),
    user: user && user,
    content: "",
    images: [],
  });
  const router = useRouter()
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [height, setHeight] = useState<string>();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const queryClient = useQueryClient();
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

  const handleTweet = useMutation({
    mutationFn: () => {
      console.log(newTweet.images);
      return axios.post(`${apiUrl}/post/create-post`, newTweet, { headers });
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(error.message);
    },

    onSuccess: async (data, variables, context) => {
      console.log(data);
      toast.success(data?.data?.message);
      await queryClient.invalidateQueries({ queryKey: ["allPosts"] });
      setNewTweet((prevVals) => ({
        ...prevVals,
        content: "",
        images: undefined,
      }));
      setImages([]);
        router.push('/')
    },
  });
  const handleSubmitTweet = () => {
    handleTweet.mutate();
  };
  const onFIleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files;
    if (!file) {
      return;
    }
    const fileList = Array.from(file);
    const imageUrl: string[] | null = fileList.map(
      (image) => file && URL.createObjectURL(image)
    );
    const newImages = [...images];
    imageUrl && newImages.push(...imageUrl);
    setImages(newImages);

    const formData = new FormData();
    fileList && fileList.forEach((file) => formData.append("image", file));
    console.log(file);
    if (file) {
      axios
        .post(`${apiUrl}/post/upload`, formData, { headers })
        .then((response) => {
          console.log(response.data);
          let url = response.data.data;
          let urlList: string[] = [];
          urlList.push(...url);
          console.log("urlList", urlList);
          setNewTweet((prevVals) => ({
            ...prevVals,
            images: urlList,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleFileUpload = () => {
    fileRef.current && fileRef.current.click();
  };
  const handleRemoveImage = (index: number) => {
    const img = [...images];
    img.splice(index, 1);
    setImages(img);
  };
  return (
    <section className="w-full">
      {/* header */}
      <nav className="w-full py-[12px] px-[16px] flex justify-between items-center">
        <IoArrowBackOutline size={18} onClick={()=>router.back()} />
        <div className="flex gap-x-[24px] text-[14px]">
          <button className=" text-lightBlue">Drafts</button>
          <Button
          disabled={handleTweet.isPending}
            onClick={handleSubmitTweet}
            className="text-white rounded-[24px] text-[14px] py-[2px] px-[18px]"
          >
            Post
          </Button>
        </div>
      </nav>
      <main>
        <div className="flex flex-col">
          <div className="flex gap-x-[8px] mt-[12px]">
            <Avatar className="w-[28px] h-[28px]">
              <AvatarImage src={avatarImg.src} className="object-cover" />
            </Avatar>
            {/* Input Area */}
            <textarea
              onChange={onTextAreaChange}
              name="content"
              style={{ height: height }}
              className={`w-full bg-transparent md:text-[12px] xl:text-[14px] text-white focus-within:outline-none pr-[16px]`}
              value={newTweet?.content}
              placeholder="What is happening?!"
            />
          </div>
          <div>
            {/* Tweet Images */}
            <div className="flex flex-wrap px-[8px] justify-center">
              {images &&
                images.map((image, index) => (
                  <div key={index} className="relative">
                    <div className="absolute top-[4px] px-[4px] left-0 flex justify-between w-full">
                      <button className="bg-slate-700/60 text-white px-[6px] py-[2px] rounded-[6px] text-[12px]">
                        Edit
                      </button>
                      <button
                        className="bg-slate-700/60 text-white p-[4px] rounded-full"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <XIcon size={16} />
                      </button>
                    </div>
                    <Image
                      src={image}
                      width={200}
                      height={200}
                      alt="image"
                      className="rounded-[8px]"
                    />
                  </div>
                ))}
            </div>
            <div className="flex flex-col mt-[48px] gap-y-[8px] px-[8px]">
              <div className="flex items-center gap-x-[8px] px-[16px]">
                <FaGlobeAmericas />
                <span className="text-lightBlue text-[14px]">
                  Everyone can reply
                </span>
              </div>
              <div className="border-t-[1px] border-border w-full"></div>
              {/* Icons */}
              <div className="flex  pr-[16px] justify-between items-baseline mt-[12px]">
                <div className="flex gap-x-[14px] text-lightBlue items-center">
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    onChange={onFIleChange}
                    hidden
                  />
                  <CiImageOn onClick={handleFileUpload} />
                  <MdOutlineGifBox />
                  <TbLayoutGridRemove />
                  <MdOutlineEmojiEmotions />
                  <TbCalendarTime />
                  <CiLocationOn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Post;
