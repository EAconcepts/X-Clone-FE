"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/app/(helpers)/authContext";
import { BlogProps } from "../page";
import Link from "next/link";

const CreatePost = () => {
  const [post, setPost] = useState<BlogProps>({
    _id: "",
    title: "",
    content: "",
    file: "",
  });
  const { token } = useAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setPost((prevVals: any) => ({ ...prevVals, [name]: value }));
  };
  const handleCreatePost = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:7000/api/post/create-post", post, { headers })
      .then((response) => {
        console.log(response);
        toast.success("Post created successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("couldn't create post!");
      });
  };
  const handleFileUpload = (e: any) => {
    const img = e.target.files[0];
    const file = new FormData();
    if (img) {
      file.append("image", img);
    }

    axios
      .post("http://localhost:7000/api/post/upload", file, { headers })
      .then((response) => {
        console.log(response);
        toast.success("File uploaded successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("couldn't upload file!");
      });
  };
  return (
    <main className="w-full bg-slate-200 min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleCreatePost} className="w-[70%] bg-white p-[16px]">
        <h3 className="text-center">Create a post</h3>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={onInputChange}
            className="w-[350px] h-[32px] border border-slate-600 rond"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="title">Content</label>
          <div className="flex">
            <textarea
              name="content"
              value={post.content}
              onChange={onInputChange}
              className="w-full border min-h-[100px]"
            />
            <input type="file" className="" onChange={handleFileUpload} />
          </div>
        </div>
        <button className="w-fit p-[8px] bg-slate-500 text-white rounded-[4px]">
          Create
        </button>
      </form>
      <Link href={"/blogs"}>View posts</Link>
    </main>
  );
};

export default CreatePost;
