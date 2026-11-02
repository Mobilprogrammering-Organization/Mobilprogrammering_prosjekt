import { login } from "@/api/auth";

test("login should return a user", async () => {
  const result = await login("test@test.com", "password123");
  expect(result.user).toMatchObject({ id: "1", email: "test@test.com" });
});

test("login should fail if they provide with wrong login information", async () => {
  const result = login("x@x.no", "wrong");
  await expect(result).rejects.toThrow();
});
