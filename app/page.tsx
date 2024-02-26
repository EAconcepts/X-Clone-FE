"use client";

import Image from "next/image";
import TopNav from "./(components)/TopNav";
import CreateTweet from "./(components)/CreateTweet";
import Tweet from "./(components)/(tweets)/Tweet";
import { LegacyRef, useEffect, useRef, useState } from "react";
import image1 from "./(assets)/chicken.jpg";
import image2 from "./(assets)/images2.jpeg";
import image3 from "./(assets)/images3.jpeg";
import image4 from "./(assets)/images2.jpeg";
import { useAuth } from "./(helpers)/authContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import Footer from "./(components)/Footer";
import FloatingButton from "./(components)/FloatingButton";
import ViewImages from "./(components)/(tweets)/ViewImages";

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

export default function Home() {
  const { token, user } = useAuth();

  const [newTweet, setNewTweet] = useState<TweetProps>({
    _id: "",
    tweetTime: new Date().toUTCString(),
    user: user && user,
    content: "",
    images: [],
  });
  const [scrollPos, setScrollPos] = useState<string>("");
  const [scrollTopPos, setScrollTopPos] = useState<boolean>(true);
  const mainRef: LegacyRef<HTMLElement> = useRef(null);
  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  let lastScrollPos = mainRef.current && mainRef.current.scrollTop;


  // useEffect(() => {
  //   if (!token) {
  //   console.log(token)
  //     router.push("/auth/signin");
  //   }
  // }, []);

  
  // Fetch tweets
  const { data, error, isFetching, isSuccess } = useQuery({
    queryKey: ["allPosts"],
    queryFn: () => axios.get(`${apiUrl}/post`),
    refetchInterval: 100000,
    refetchOnReconnect: "always",
  });

  // DO NOT DELETE
  // const { data, error, isFetching, isSuccess } = useInfiniteQuery({
  //   queryKey: ["allPosts"],
  //   queryFn: async ({ pageParam }) =>
  //     axios.get(`http://localhost:7000/api/post?page=${pageParam}&limit=10`),
  //   // queryFn: () => axios.get(`${apiUrl}/post`),
  //   initialPageParam: 1,
  //   getNextPageParam: (lastPage) => null,
  //   // refetchInterval: 100000,
  //   // refetchOnReconnect: "always",
  // });

  //Monitor scroll behaviour
  
  useEffect(() => {
    mainRef.current && mainRef.current.addEventListener("scroll", onScroll);

    return () => {
      mainRef.current &&
        mainRef.current.removeEventListener("scroll", onScroll);
    };
  }, []);
 
  
  if (error) {
    console.log(error);
    return (
      <p className="fixed top-[50%] text-center left-[50%] m-auto">
        Error fetching posts!
      </p>
    );
  }

// Determine if scroll direction is up or down
  const onScroll = () => {
    const currentPos = mainRef.current && mainRef.current?.scrollTop;
    if (currentPos && lastScrollPos && currentPos > lastScrollPos)
      setScrollPos("up");
    if (currentPos && lastScrollPos && currentPos < lastScrollPos)
      setScrollPos("down");
    if (currentPos && currentPos <= 10) setScrollTopPos(true);
    else if (currentPos && currentPos > 10) setScrollTopPos(false);
    lastScrollPos = currentPos;
  };

  return (
    <main className="w-full flex h-screen  items-center justify-between ">
      <main
        ref={mainRef}
        className="w-full h-full border-r-[1px] border-r-border border-l-[1px] border-l-border overflow-y-scroll max-lg:px-[16px]"
      >
        <TopNav scrollTopPos={scrollTopPos} />
        <div className="lg:block hidden mb-[8px]">
          <CreateTweet newTweet={newTweet} setNewTweet={setNewTweet} />
        </div>
        <div className="w-full flex flex-col ">
          {data?.data?.data?.map((tweet: TweetProps, index: number) => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </div>
      </main>
      <FloatingButton />
      <Footer scrollPos={scrollPos} />
      {/* Last column on Desktop view */}
      <aside className=" w-[70%] hidden h-full lg:flex flex-col overflow-hidden overflow-y-scroll"></aside>
    </main>
  );
}
