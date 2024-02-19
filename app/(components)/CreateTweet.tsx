"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import avatarImg from "../(assets)/avatar.jpg";
import { CiImageOn, CiLocationOn } from "react-icons/ci";
import { MdOutlineEmojiEmotions, MdOutlineGifBox } from "react-icons/md";
import { TbCalendarTime, TbLayoutGridRemove } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import {
  ChangeEvent,
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
import Image from "next/image";
import { XIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PiUmbrellaSimpleThin } from "react-icons/pi";

const CreateTweet = ({
  newTweet,
  setNewTweet,
}: {
  newTweet: TweetProps;
  setNewTweet: Dispatch<SetStateAction<TweetProps>>;
}) => {
  const [tweet, setTweet] = useState<string>("");
  const [height, setHeight] = useState<string>();
  const [images, setImages] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const queryClient = useQueryClient();
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

  const handleTweet = useMutation({
    mutationFn: () => {
      console.log(newTweet.images);
      return axios.post(`${apiUrl}/post/create-post`, newTweet, { headers })
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
    },
  });
  const handleSubmitTweet = () => {
    handleTweet.mutate();
  };
  const onFIleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    const imageUrl: string | null = file && URL.createObjectURL(file);
    const newImages = [...images];
    imageUrl && newImages.push(imageUrl);
    setImages(newImages);

    const formData = new FormData();
    file && formData.append("image", file);
    console.log(file);
    if (file) {
      axios
        .post(`${apiUrl}/post/upload`, formData, { headers })
        .then((response) => {
          console.log(response.data.data);
        let url = response.data.data.url
        let urlList: string[] = []
        urlList.push(url)
        console.log(urlList)
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
      <div>
        <div className="flex flex-wrap">
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
        <div className="flex pl-[64px] pr-[16px] justify-between items-baseline mt-[12px]">
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
          <Button
            onClick={handleSubmitTweet}
            className="text-white w-fit md:text-[12px] xl:text-[14px] rounded-[16px] py-[2px] px-[18px]"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
