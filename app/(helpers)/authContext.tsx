"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { user } from "../page";

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const userString = localStorage.getItem('user')
  const [user, setUser] = useState<user |  null>(userString !==null && JSON.parse(userString) || null);
  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
