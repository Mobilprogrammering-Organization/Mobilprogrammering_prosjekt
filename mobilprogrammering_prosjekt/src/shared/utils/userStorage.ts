/**
VSG Agents prompt and chatlog:
I want to implement SecureStore to save and retrieve users. How do you reccomend implementing this in the application?

1. Add a small storage module, for example src/utils/userStorage.ts. It follows the same pattern as gameStorage.ts but uses SecureStore:
import * as SecureStore from "expo-secure-store";
import { SessionUser } from "@/auth/auth-types";

const KEY = "sessionUser";

export async function saveUser(user: SessionUser) {
  await SecureStore.setItemAsync(KEY, JSON.stringify(user));
}
export async function getUser(): Promise<SessionUser | null> {
  const raw = await SecureStore.getItemAsync(KEY);
  return raw ? JSON.parse(raw) : null;
}
export async function clearUser() {
  await SecureStore.deleteItemAsync(KEY);
}

2. Wire it into AuthProvider:

Add an isLoading state, which starts as true.
In a useEffect on mount, call getUser(), then setUser(...) and setIsLoading(false).
In login and createUser, call saveUser(result.user) after setUser.
In logout and deleteUser, call clearUser().
Expose isLoading in the context.
3. Gate the UI on isLoading. In app/_layout.tsx, show a splash screen or nothing until isLoading is false. Then redirect to userpage if a user exists, or to loginpage if not. Otherwise the login screen flashes on startup.

4. Choices to make:

What to store: keep only the minimum, such as the user id, email and a token. Never store the password. If the backend issues a token, store that and re-fetch the user on startup.
Size: SecureStore values are limited to about 2KB on some platforms, so a small user object is fine.
Keys: use only alphanumerics, ., - and _.
Web: SecureStore doesn't work on web. If you target web, fall back to AsyncStorage or localStorage with Platform.OS === "web".
Tests: mock expo-secure-store in Jest, as you probably do for AsyncStorage.
Multiple users: if "save users" means several accounts on a device (you have selectuser.tsx), store an array of users under one key, plus an activeUserId.
Do you want me to implement this? If so, tell me whether you need one saved session or several accounts.
*/

import * as SecureStore from "expo-secure-store";
import { SessionUser } from "@/auth/auth-types";

const SESSION_KEY = "sessionUser";

export async function saveUser(user: SessionUser) {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(user));
}

export async function getUser(): Promise<SessionUser | null> {
  const user = await SecureStore.getItemAsync(SESSION_KEY);
  return user ? JSON.parse(user) : null;
}

export async function clearUser() {
  await SecureStore.deleteItemAsync(SESSION_KEY);
}
