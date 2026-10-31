import { createContext, useContext } from "react";
import { SessionUser } from "../auth-types";

type AuthContextData = {
  user: SessionUser | null;
};

const AuthContext = createContext<AuthContextData | null>(null);

type AuthProviderProps = {
  user: SessionUser | null;
  children: React.ReactNode;
};

export function AuthProvider({ user, children }: AuthProviderProps) {
  const value = {
    user: user,
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
