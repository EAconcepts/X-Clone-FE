"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const getRestLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || email.trim() !== "") {
      mutate();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axios.post(`${apiUrl}/auth/forgot-password`, { email: email }),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });
  return (
    <div>
      <main className="w-full h-screen text-white bg-black flex flex-col justify-center items-center">
        <Toaster />
        <div className="max-w-[95%] lg:max-w-[70%] w-[85%] lg:w-[50%] flex bg-black/80 border rounded-lg shadow-md shadow-slate-800 px-[8px] py-[16px] lg:p-[32px]">
          <form
            onSubmit={getRestLink}
            className=" w-full flex flex-col items-center text-white p-4 gap-y-[16px]"
          >
            <h2 className="text-[16px] lg:text-[20px] mb-[8px] lg:mb-[12px]  font-bold">
              Reset Your Password
            </h2>
            <input
              type="text"
              placeholder="Email or Username"
              name="email"
              className={`w-full lg:w-[50%] bg-transparent h-12 rounded-md border-[0.4px] placeholder-gray outline-none pl-4 `}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="mt-[18px] rounded-md border bg-transparent py-[4px] px-[24px]">
              {isPending ? "Sending..." : "Send"}
            </button>
            <div className="text-white flex gap-[2px] text-[14px]">
              <span>Remeber paswword?</span>
              <Link href={"/auth/signin"} className="text-blue-400 underline">
                Login up
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;
