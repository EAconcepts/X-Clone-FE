"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { CiSettings } from "react-icons/ci";
import avatarImg from "../(assets)/avatar.jpg";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "../(helpers)/authContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios, { AxiosResponse } from "axios";
import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { user } from "../page";

const TopNav = ({ scrollTopPos }: { scrollTopPos: boolean }) => {
  const [activeTab, setActiveTab] = useState<string>("for you");
  const handleForYouTab = () => {
    setActiveTab("for you");
  };
  const {
    token,
    setToken,
    user,
    setUser,
  }: {
    token: string | null;
    setToken: Dispatch<SetStateAction<string | null>>;
    user: user;
    setUser: Dispatch<SetStateAction<string | null>>;
  } = useAuth();

  const fileRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const queryClient = useQueryClient();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleFollowingTab = () => {
    setActiveTab("following");
  };
  const signOut = () => {
    router.push("/auth/signin");
    localStorage.clear();
    setToken(null);
    toast.success("Logout successful");
  };

  const handleFileUpload = () => {
    fileRef.current && fileRef.current.click();
  };

  const onFIleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    uploadAvatar.mutate(formData);
  };
  const queryAvatar = () => {
    axios
      .get(`http://localhost:7000/api/auth/me`, { headers })
      .then((response) => {
        console.log(response);
        let newUser = response.data?.data;
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        console.log(newUser);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const uploadAvatarUrl = useMutation({
    mutationFn: (url) =>
      axios.post(
        `http://localhost:7000/api/profile/avatar-upload`,
        { avatar: url },
        { headers }
      ),
    onSuccess(data, variables, context) {
      console.log(data);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      queryAvatar();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const uploadAvatar = useMutation({
    mutationFn: (formData: FormData) =>
      axios.post(`http://localhost:7000/api/file/upload`, formData, {
        headers,
      }),
    onSuccess(data, variables, context) {
      console.log(data);
      let url = data.data.data[0];
      uploadAvatarUrl.mutate(url);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <nav
      className={`w-full sticky top-0 z-10 bg-transparent pt-[4px] px-[24px] lg:px-[24px] h-[80px] lg:h-[40px] border-b border-b-border flex flex-col lg:flex-row  lg:items-center justify-between lg:pl-[32px] max-lg:bg-gradient-to-b from-black to-slate-500/10 max-lg:mb-[8px] transition-all duration-700 ${
        !scrollTopPos && "max-lg:translate-y-[-100px]"
      }`}
    >
      <div className="w-full z-10 flex lg:hidden justify-between mb-[18px]">
        <input ref={fileRef} type="file" onChange={onFIleChange} hidden />
        <Avatar className="w-[32px] h-[32px]" onClick={handleFileUpload}>
          <AvatarImage
            src={user?.avatar ? user?.avatar : avatarImg.src}
            className="object-cover"
          />
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
