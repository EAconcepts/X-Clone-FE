"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { Toaster, toast } from "sonner";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState({
    password: "",
    confirmPassword: "",
  });

  const { id, uniqueString } = useParams();
  const router = useRouter()
  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword.password === newPassword.confirmPassword) {
      mutate();
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPassword((prevVals) => ({ ...prevVals, [name]: value }));
  };

  const { isPending, mutate } = useMutation({
    mutationFn: () =>
      axios.post(
        `http://localhost:7000/api/auth/password-reset/${id}/${uniqueString}`,
        { password: newPassword.password }
      ),
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.data.message);
      router.push('/auth/signin')
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
            onSubmit={handleReset}
            className=" w-full flex flex-col items-center text-white p-4 gap-y-[16px]"
          >
            <h2 className="text-[16px] lg:text-[20px] mb-[8px] lg:mb-[12px]  font-bold capitalize">
              Reset your password
            </h2>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className={`w-full lg:w-[50%] bg-transparent h-12 rounded-md border-[0.4px] placeholder-gray outline-none pl-4 `}
              value={newPassword.password}
              onChange={handleOnChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="confirmPassword"
              className={`w-full lg:w-[50%] bg-transparent h-12 rounded-md border-[0.4px] placeholder-gray outline-none pl-4 `}
              value={newPassword.confirmPassword}
              onChange={handleOnChange}
              required
            />
            <button className="mt-[18px] rounded-md border bg-transparent py-[4px] px-[24px]">
              {isPending ? "Reseting..." : "Reset Password"}
            </button>
            <div className="text-white flex gap-[2px] text-[14px]">
              <span>Already have an account?</span>
              <Link href={"/auth/sigin"} className="text-blue-400 underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ResetPassword;
