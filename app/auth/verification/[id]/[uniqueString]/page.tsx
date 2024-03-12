"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const EmailVerification = () => {
  const [Verification, setVerification] = useState();
  const { id, uniqueString } = useParams();
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const verify = useMutation({
    mutationFn: () =>
      axios.post(`${apiUrl}/auth/user/verify/${id}/${uniqueString}`),
    onSuccess: (data) => {
      console.log(data);
      if (
        data.data.message.includes("User verification successful") ||
        data.data.message.includes(
          "User already verified! Please login to continue"
        )
      ) {
        toast.success(data.data.message);
        setTimeout(() => {
          router.replace("/auth/signin");
        }, 2000);
      }
    },
    onError(error, variables, context) {
      console.log(error);
      toast.error(error.message);
    },
  });
  useEffect(() => {
    verify.mutate();
  }, []);
  return (
    <div className="p-[16px]">
      <h2 className="text-[18px]">Email Verification</h2>
      <p>
        {verify.isPending
          ? " loading..."
          : verify.data && verify.data?.data.message}
      </p>
    </div>
  );
};

export default EmailVerification;
