"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "../(helpers)/authContext";
import Link from "next/link";

const Dashboard = () => {
  const [allUsers, setAllUsers] = useState<[] | null>(null);
  const { token, setToken } = useAuth();
  console.log(token);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const getAllUsers = () => {
    axios
      .get("http://localhost:7000/api/auth/users", { headers })
      .then((response) => {
        console.log(response);
        setAllUsers(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <main>
      <h2>All users</h2>
      {allUsers &&
        allUsers.map((user: any) => (
          <div key={user._id}>
            <p>{user._id}</p>
            <p>{user.email}</p>
            <p>{user.name}</p>
          </div>
        ))}
      <Link href={"/blogs/create-post"}>Create a post</Link>
    </main>
  );
};

export default Dashboard;
