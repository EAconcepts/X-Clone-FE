"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../(helpers)/authContext";
import { useRouter } from "next/navigation";

export interface BlogProps {
  _id: string;
  title: string;
  content: string;
  file?: string;
}
const Blog = () => {
  const [blogs, setBlogs] = useState<BlogProps[] | null>(null);
  const [updatePost, setUpdatePost] = useState<boolean>(false)
  const { token } = useAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const getAllPosts = () => {
    axios
      .get("http://localhost:7000/api/post/", { headers })
      .then((response) => {
        console.log(response);
        setBlogs(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const router = useRouter()
  useEffect(() => {
    if(!token || token===''){
      router.replace('/auth/signin')
    }
    getAllPosts();
  }, [updatePost]);
  const handleDeletePost=(postId:string)=>{
    axios
      .delete(`http://localhost:7000/api/post/delete-post/${postId}`, { headers })
      .then((response) => {
        console.log(response);
        setUpdatePost(true)
      
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <main className="w-full flex flex-col gap-y-[16px]">
      {blogs?.map((post) => (
        <div key={post._id} className="flex flex-col">
          <h2>{post?.title}</h2>
          <pre>{post?.content}</pre>
          <button className="bg-slate-300 p-[8px] w-fit" onClick={()=>router.push(`/blogs/${post?._id}`)}>Edit post</button>
        <button className="bg-slate-300 p-[8px] w-fit" onClick={()=>handleDeletePost(post?._id)}>Delete post</button>
        </div>
      ))}
    </main>
  );
};

export default Blog;
