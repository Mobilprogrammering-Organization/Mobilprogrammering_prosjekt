import { login as loginApi } from "@/api/auth";
import { useCreateUser, useDeleteUser } from "@/api/user-api";
import { createContext, useContext, useState } from "react";
import { SessionUser } from "../auth-types";
import { router } from "expo-router";

type AuthContextData = {
  user: SessionUser | null;
  createUser: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  deleteUser: () => void;
  randomNumbers: number[] | [];
  addRandomNumber: (number: number) => void;
};

const AuthContext = createContext<AuthContextData | null>(null);

type AuthProviderProps = {
  randomNumbers: number[] | [];
  children: React.ReactNode;
};

export function AuthProvider({
  randomNumbers: initialRandomNumbers,
  children,
}: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [randomNumbers, setRandomNumbers] = useState<number[] | []>(
    initialRandomNumbers ?? [],
  );

  async function login(email: string, password: string) {
    if (user) return;
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
    if (!user) return;
    setRandomNumbers([]);
    setUser(null);
    router.push("./loginpage");
  }

  async function deleteUser() {
    if (!user) return;
    setRandomNumbers([]);
    await useDeleteUser(user.id);
    setUser(null);
    router.push("./loginpage");
  }

  async function addRandomNumber(num: number) {
    setRandomNumbers((prev) => (prev ? [...prev, num] : [num]));
  }

  const value = {
    user: user,
    createUser,
    login,
    logout,
    deleteUser,
    randomNumbers: randomNumbers,
    addRandomNumber,
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
