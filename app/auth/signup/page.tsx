"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { Interface } from "readline";
import { Toaster, toast } from "sonner";

interface UserProps {
  name?: string;
  email: string;
  password: string;
  username?: string;
}
const Signup = () => {
  const [user, setUser] = useState<UserProps>({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prevVals) => ({ ...prevVals, [name]: value }));
  };

  const { data, mutate, isPending } = useMutation({
    mutationFn: () => axios.post(`${apiUrl}/auth/signup`, user),
    onSuccess: (data) => {
      console.log(data);
      toast(data?.data?.message || data?.data?.message);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response?.data?.message || error?.message);
    },
  });
  const handleSignup = (e: any) => {
    e.preventDefault();
    if (user.username && !/^\w+$/.test(user?.username)) {
      toast.warning("Username should not contain spaces or special characters");
    } else {
      mutate();
    }
  };
  return (
    <main className="w-full h-screen bg-black flex flex-col justify-center items-center">
      <Toaster />
      <div className="max-w-[90%] lg:max-w-[70%] w-[85%] lg:w-[50%] border rounded-lg  flex bg-black px-[8px] py-[16px] lg:p-[32px] shadow-md shadow-slate-900">
        <form
          onSubmit={handleSignup}
          className=" w-full flex flex-col items-center text-white p-4 gap-y-[16px] "
        >
          <h2 className=" mb-[8px] lg:mb-[12px] text-[18px] lg:text-[20px] font-bold">
            Create an account
          </h2>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className={`w-full lg:w-[60%] bg-transparent h-12 rounded-md border-[0.4px] placeholder-gray outline-none pl-4 `}
            value={user.name}
            onChange={handleOnChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className={`w-full lg:w-[60%] bg-transparent h-12 rounded-md border-[0.4px] placeholder-gray outline-none pl-4 `}
            value={user.email}
            onChange={handleOnChange}
            required
          />
          <input
            type="text"
            placeholder="username"
            name="username"
            maxLength={16}
            className={`w-full lg:w-[60%] bg-transparent h-12 rounded-md border-[0.4px] placeholder-gray outline-none pl-4 `}
            value={user.username}
            onChange={handleOnChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength={4}
            maxLength={16}
            className={`w-full lg:w-[60%] bg-transparent h-12 rounded-md border-[0.4px] placeholder-gray outline-none pl-4 `}
            value={user.password}
            onChange={handleOnChange}
            required
          />
          <button className="mt-[18px] border rounded-lg bg-transparent py-[4px] px-[28px]">
            {isPending ? "Signing up..." : "Sign up"}
          </button>
          <div className="text-white flex gap-x-[2px] text-[14px]">
            <span>Already have an account?</span>
            <Link href={"/auth/signin"} className="text-blue-400 underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
