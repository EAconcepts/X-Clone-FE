"use client";

import { useAuth } from "@/app/(helpers)/authContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BlogProps } from "../page";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const EditPost = () => {
  const [post, setPost] = useState<BlogProps>({
    _id: "",
    title: "",
    content: "",
    file: "",
  });
  const postId = useParams().id;
  const { token } = useAuth();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getPost = () => {
    axios
      .get(`http://localhost:7000/api/post/${postId}`, { headers })
      .then((response) => {
        console.log(response);
        setPost(response?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const router = useRouter();
  useEffect(() => {
    getPost();
  }, []);

  const onInputChange = (e: any) => {
    const { name, value } = e.target;
    setPost((prevVals: any) => ({ ...prevVals, [name]: value }));
  };
  const handleEditPost = (e: any) => {
    e.preventDefault();
    axios
      .put(`http://localhost:7000/api/post/edit-post/${postId}`, post, {
        headers,
      })
      .then((response) => {
        console.log(response);
        toast.success(response.data.message || "Post edited successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("couldn't create post!");
      });
  };
  return (
    <main className="w-full bg-slate-200 min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={handleEditPost} className="w-[70%] bg-white p-[16px]">
        <h3 className="text-center">Edit post</h3>
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
            <input type="file" className="" />
          </div>
        </div>
        <button className="w-fit p-[8px] bg-slate-500 text-white rounded-[4px]">
          Save
        </button>
      </form>
      <Link href={"/blogs"}>View posts</Link>
    </main>
  );
};

export default EditPost;
