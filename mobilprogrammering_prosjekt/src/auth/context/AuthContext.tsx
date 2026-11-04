import { login as loginApi } from "@/api/auth";
import { useCreateUser, useDeleteUser } from "@/api/user-api";
import { createContext, useContext, useState } from "react";
import { saveUser, getUser, clearUser } from "@/shared/utils/userStorage";
import {
  getSavedGames,
  saveGame,
  removeGame,
  clearGames,
} from "@/shared/utils/gameStorage";
import {
  saveRandomNumbers,
  getRandomNumbers,
  clearRandomNumbers,
} from "@/shared/utils/randomNumbersStorage";
import { SessionUser } from "../auth-types";
import { router } from "expo-router";
import { useEffect } from "react";

type AuthContextData = {
  user: SessionUser | null;
  createUser: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  deleteUser: () => void;
  randomNumbers: number[] | [];
  addRandomNumber: (number: number) => void;
  isLoading: boolean;
  gameIDs: string[];
  addGameID: (id: string) => void;
  removeGameID: (id: string) => void;
};

const AuthContext = createContext<AuthContextData | null>(null);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [randomNumbers, setRandomNumbers] = useState<number[] | []>([]);
  const [gameIDs, setGameIDs] = useState<string[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);

  //Henter bruker og tallrekken hvis den fins.
  useEffect(() => {
    async function loadUser() {
      const storedUser = await getUser();
      if (storedUser) {
        setUser(storedUser);
      }
      setIsLoading(false);
    }
    async function loadRandomNumbers() {
      const storedNumbers = await getRandomNumbers();
      if (storedNumbers) {
        setRandomNumbers(storedNumbers);
      }
    }
    async function loadGameIDs() {
      const storedGameIDs = await getSavedGames();
      if (storedGameIDs) {
        setGameIDs(storedGameIDs);
      }
    }
    loadUser();
    loadRandomNumbers();
    loadGameIDs();
  }, []);

  async function login(email: string, password: string) {
    if (user) return;
    const result = await loginApi(email, password);
    setUser(result.user);
    //Setter bruker etter log in.
    await saveUser(result.user);
    router.push("./userpage");
  }

  async function createUser(email: string, password: string) {
    const result = await useCreateUser(email, password);
    setUser(result.user);
    //Setter bruker etter registrering.
    await saveUser(result.user);
    router.push("./userpage");
  }

  async function logout() {
    if (!user) return;
    setRandomNumbers([]);
    setUser(null);
    //Fjerner bruker etter log out.
    await clearUser();
    await clearRandomNumbers();
    await clearGames();
    router.push("./loginpage");
  }

  async function deleteUser() {
    if (!user) return;
    setRandomNumbers([]);
    await useDeleteUser(user.id);
    setUser(null);
    //Fjerner bruker etter sletting.
    await clearUser();
    await clearRandomNumbers();
    await clearGames();
    router.push("./loginpage");
  }

  async function addRandomNumber(num: number) {
    setRandomNumbers((prev) => (prev ? [...prev, num] : [num]));
    await saveRandomNumbers([...randomNumbers, num]);
  }

  async function addGameID(id: string) {
    setGameIDs((prev) => (prev ? [...prev, id] : [id]));
    await saveGame(id);
  }

  async function removeGameID(id: string) {
    setGameIDs((prev) => (prev ? prev.filter((gameId) => gameId !== id) : []));
    await removeGame(id);
  }

  const value = {
    user: user,
    createUser,
    login,
    logout,
    deleteUser,
    randomNumbers: randomNumbers,
    addRandomNumber,
    isLoading,
    gameIDs: gameIDs,
    addGameID,
    removeGameID,
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
