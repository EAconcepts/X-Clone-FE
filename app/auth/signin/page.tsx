"use client";

import { useAuth } from "@/app/(helpers)/authContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Interface } from "readline";
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

  const router = useRouter()
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevVals) => ({ ...prevVals, [name]: value }));
  };
  const handleSignin = (e: any) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/auth/signin`, userData)
      .then((response) => {
        console.log(response);
        if(response.status===200){
          let token = response?.data?.token
          localStorage.setItem('token', token)
          setToken(token)
          localStorage.setItem('user', JSON.stringify(response.data.data))
          setUser(response?.data?.data)
        toast(response?.data?.message || response?.data?.message, {
        });
        setTimeout(() => {
          router.push('/')
        }, 2000);
      }

      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || err?.message);
      });

    console.log(userData);
  };
  return (
    <main className="w-full h-screen bg-slate-100 flex flex-col justify-center items-center">
      <Toaster />
      <div className="max-w-[70%] w-[50%] flex bg-white p-[32px]">
        <form
          onSubmit={handleSignin}
          className=" w-full flex flex-col items-center text-black p-4 gap-y-[16px]"
        >
          <h2 className="text-[18px] mb-[12px]">Sign in to your acoount</h2>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className={`w-[50%] h-12 rounded-md border-[0.4px] placeholder-gray outline-none pl-4 `}
            value={userData.email}
            onChange={handleOnChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className={`w-[50%] h-12 rounded-md border-[0.4px] placeholder-gray outline-none pl-4 `}
            value={userData.password}
            onChange={handleOnChange}
            required
          />
          <button className="mt-[18px] bg-blue-400 py-[4px] px-[24px]">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signin;
