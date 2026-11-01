import { z } from "zod";
import { Platform } from "react-native";

export const ApiUserSchema = z.object({
  id: z.string(),
  username: z.string().optional(),
  email: z.string(),
  password: z.string(),
});

export type ApiUser = z.infer<typeof ApiUserSchema>;

//Følger oppsett fraundervisning:
const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const WEBAPP_BASE_URL = `http://${HOST}:5173/api/v1`;

export async function login(
  email: string,
  password: string,
): Promise<{ user: ApiUser }> {
  const response = await fetch(`${WEBAPP_BASE_URL}/auth/login`, {
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
    throw new Error("Wrong email or password.");
  }

  if (!response.ok || result?.ok === false) {
    throw new Error(
      result?.error?.message ?? `Could not log in (${response.status})`,
    );
  }

  //Returnerer som { ok, data, code }
  const payload = result?.data?.user ?? result?.data;
  const parsed = ApiUserSchema.safeParse(payload);

  if (!parsed.success) {
    throw new Error("Wrong email or password.");
  }

  return { user: parsed.data };
}
