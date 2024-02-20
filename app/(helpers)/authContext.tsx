"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { user } from "../page";

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let userString = localStorage.getItem("user");
      let token = localStorage.getItem("token");
      setToken(token);
      setUser(userString !== null && JSON.parse(userString));
    }
  }, );
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
