import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import { Platform } from "react-native";
import { z } from "zod";
import { ApiUser, ApiUserSchema } from "./auth";

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

export async function useCreateUser(
  email: string,
  password: string,
): Promise<{ user: ApiUser }> {
  const response = await fetch(`${WEBAPP_BASE_URL}/users`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  });

  const result = await response.json().catch(() => null);

  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 404
  ) {
    throw new Error(
      "Email and password fields cannot be empty." + ` (${response.status})`,
    );
  }

  if (response.status === 409) {
    throw new Error(
      "A user with this email already exists." + ` (${response.status})`,
    );
  }

  if (!response.ok || result?.ok === false) {
    throw new Error(
      result?.error?.message ?? `Could not register (${response.status})`,
    );
  }

  //Returnerer som { ok, data, code }
  const payload = result?.data?.user ?? result?.data;
  const parsed = ApiUserSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error("Failed to parse created user.");
  }

  return { user: parsed.data };
}

export async function useDeleteUser(userId: string): Promise<void> {
  const response = await fetch(`${WEBAPP_BASE_URL}/users/${userId}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  });

  const result = await response.json();

  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 404
  ) {
    throw new Error(
      "User not found or invalid request." + ` (${response.status})`,
    );
  }

  if (!response.ok) {
    throw new Error(`Could not delete user (${response.status})`);
  }

  return result;
}
