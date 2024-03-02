"use client";

import { useAuth } from "@/app/(helpers)/authContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";

interface UserProps {
  name?: string;
  email: string;
  password: string;
}
const Signin = () => {
  const [userData, setUserData] = useState<UserProps>({
    email: "",
    password: "",
  });
  const { token, setToken, setUser } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevVals) => ({ ...prevVals, [name]: value }));
  };

  const { isPending, mutate } = useMutation({
    mutationFn: () => axios.post(`${apiUrl}/auth/signin`, userData),
    onSuccess: (data) => {
      console.log(data);
      if (data.status === 200) {
        let token = data?.data?.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
          setToken(token);
          localStorage.setItem("user", JSON.stringify(data.data.data));
        }
        setUser(data?.data?.data);
        toast(data?.data?.message || data?.data?.message, {});
        setTimeout(() => {
          router.push("/", { scroll: false });
        }, 1000);
      }
      if (data.status === 300) {
        toast.warning(data?.data?.message);
      }
    },
    onError: (error: any, variables, context) => {
      toast.error(error.response?.data?.message || error?.message);
    },
  });
  const handleSignin = (e: any) => {
    e.preventDefault();
    mutate();
  };
  return (
    <main className="w-full h-screen text-white bg-black flex flex-col justify-center items-center">
      <Toaster />
      <div className="max-w-[95%] lg:max-w-[70%] w-[85%] lg:w-[50%] flex bg-black/80 border rounded-lg shadow-md shadow-slate-800 px-[8px] py-[16px] lg:p-[32px]">
        <form
          onSubmit={handleSignin}
          className=" w-full flex flex-col items-center text-white p-4 gap-y-[16px]"
        >
          <h2 className="text-[16px] lg:text-[20px] mb-[8px] lg:mb-[12px]  font-bold">
            Login to your acoount
          </h2>
          <input
            type="text"
            placeholder="Email or Username"
            name="email"
            className={`w-full lg:w-[50%] bg-transparent h-12 rounded-md border-[0.4px] placeholder-gray outline-none pl-4 `}
            value={userData.email}
            onChange={handleOnChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className={`w-full lg:w-[50%] bg-transparent h-12 rounded-md border-[0.4px] placeholder-gray outline-none pl-4 `}
            value={userData.password}
            onChange={handleOnChange}
            required
          />
          <Link
            href={"/auth/forgot-password"}
            className="text-[12px] text-end mt-[-8px] w-full"
          >
            Forgot Password
          </Link>
          <button className="mt-[18px] rounded-md border bg-transparent py-[4px] px-[24px]">
            {isPending ? "Signing in..." : "Sign in"}
          </button>
          <div className="text-white flex gap-[2px] text-[14px]">
            <span>Don&apos;t have an account?</span>
            <Link href={"/auth/signup"} className="text-blue-400 underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signin;
