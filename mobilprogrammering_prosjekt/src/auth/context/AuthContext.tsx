import { login as loginApi } from "@/api/auth";
import { useCreateUser } from "@/api/user-api";
import { createContext, useContext, useState } from "react";
import { SessionUser } from "../auth-types";
import { router } from "expo-router";

type AuthContextData = {
  user: SessionUser | null;
  createUser: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(null);

  async function login(email: string, password: string) {
    const result = await loginApi(email, password);
    setUser(result.user);
    router.push("./userpage");
  }

  async function createUser(email: string, password: string) {
    const result = await useCreateUser(email, password);
    setUser(result.user);
    router.push("./userpage");
  }

  function logout() {
    setUser(null);
    router.push("./loginpage");
  }

  const value = {
    user: user,
    createUser,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
