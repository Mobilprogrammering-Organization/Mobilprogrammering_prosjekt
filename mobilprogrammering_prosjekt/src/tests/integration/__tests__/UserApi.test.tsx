import { login } from "@/api/auth";
import { Platform } from "react-native";

const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
const WEBAPP_BASE_URL = `http://${HOST}:5173/api/v1`;

test("User API should return user data on successful login", async () => {
  const email = "test@example.com";
  const password = "password123";

  const result = await login(email, password);

  expect(result).toHaveProperty("user");
  expect(result.user).toHaveProperty("id");
  expect(result.user).toHaveProperty("email", email);
});
