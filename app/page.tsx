"use client";

import Image from "next/image";
import TopNav from "./(components)/TopNav";
import CreateTweet from "./(components)/CreateTweet";
import Tweet from "./(components)/Tweet";
import { useEffect, useState } from "react";
import image1 from "./(assets)/chicken.jpg";
import image2 from "./(assets)/images2.jpeg";
import image3 from "./(assets)/images3.jpeg";
import image4 from "./(assets)/images2.jpeg";
import { useAuth } from "./(helpers)/authContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface TweetProps {
  _id: string;
  tweetTime?: string;
  user: user;
  content: string;
  images?: string[] | undefined;
  likedBy?: string[];
}
export type user = {
  _id: string;
  name: string;
  email?: string;
  __v?: number;
  username?: string;
};
export const images: string[] = [
  image1.src,
  image2.src,
  image3.src,
  image4.src,
];
export default function Home() {
  const [tweets, setTweets] = useState<TweetProps[]>([]);
  const { token, user } = useAuth();
  const [newTweet, setNewTweet] = useState<TweetProps>({
    _id: "",
    tweetTime: new Date().toUTCString(),
    user: user && user,
    content: "",
    images: [],
  });
  const router = useRouter();
  useEffect(() => {
    if (!token) {
      router.push("/auth/signin");
    }
    // getAllPosts();
  }, []);
  const getAllPosts = () => {
    axios
      .get(`http://localhost:7000/api/post`)
      .then((response) => {
        console.log(response);
        let data = response.data.data;
        setTweets(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data, error, isFetching } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => axios.get(`${apiUrl}/post`),
  });

  if (isFetching) {
    return (
      <p className="fixed top-[50%] left-[50%] m-auto">
        loading<span className="animate-pulse">...</span>
      </p>
    );
  }
  if (error) {
    console.log(error);
    return (
      <p className="fixed top-[50%] left-[50%] m-auto">Error fetching posts!</p>
    );
  }
  return (
    <main className="w-full flex h-screen  items-center justify-between ">
      <main className="w-full h-full border-r-[1px] border-r-border border-l-[1px] border-l-border overflow-y-scroll">
        <TopNav />
        <CreateTweet newTweet={newTweet} setNewTweet={setNewTweet} />
        <div className="w-full flex flex-col">
          {data?.data?.data?.map((tweet: TweetProps, index: number) => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </div>
      </main>
      <aside className=" w-[70%] h-full flex flex-col overflow-hidden overflow-y-scroll"></aside>
    </main>
  );
}
