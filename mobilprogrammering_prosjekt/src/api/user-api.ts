import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Platform } from "react-native";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  email: z.string(),
  password: z.string(),
});
export type User = z.infer<typeof UserSchema>;

//Følger oppsett fraundervisning:
const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const WEBAPP_BASE_URL = `http://${HOST}:5173/api/v1`;

//Flyttet listUsers her for å samle relatert kode et sted
export async function listUsers() {
  const LIST_USERS_URL = `${WEBAPP_BASE_URL}/users`;

  const response = await fetch(LIST_USERS_URL);
  if (!response.ok) {
    throw new Error("Could not fetch users");
  }
  const result = await response.json();
  return result.data;
}

export function useCreateUser() {
  const CREATE_USER_URL = `${WEBAPP_BASE_URL}/users`;

  return useMutation({
    mutationFn: async (value: User) => {
      const response = await fetch(CREATE_USER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        throw new Error("Could not create user");
      }

      return response.json();
    },
    onSuccess: (response) => {
      router.replace({
        pathname: "/userpage",
        params: {
          id: response.data.id,
          email: response.data.email,
          username: response.data?.username,
        },
      });
    },
  });
}

/*
export function useLogin() {
  const LOGIN_URL = `${WEBAPP_BASE_URL}/login`;

  return useMutation({
    mutationFn: async (value: {
      email: string;
      username?: string;
      password: string;
    }) => {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(value),
      });

      if (!response.ok) {
        throw new Error(response.status + " " + response.statusText);
      }

      return response.json();
    },
    onSuccess: (response) => {
      router.replace({
        pathname: "/userpage",
        params: {
          id: response.data.id,
          email: response.data.email,
          username: response.data?.username,
        },
      });
    },
  });
}
*/
