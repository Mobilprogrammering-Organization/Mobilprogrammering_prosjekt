import * as SecureStore from "expo-secure-store";
import { saveUser, getUser, clearUser } from "@/shared/utils/userStorage";

//Hermer litt av koden fra deg Jan Fredrik :).
jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

test("saveUser should save a user so that the user stays logged in after refresh", async () => {
  const mockUser = { id: "1", email: "test@example.com" };
  await saveUser(mockUser);
  expect(SecureStore.setItemAsync).toHaveBeenCalledTimes(1);
  expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
    "sessionUser",
    JSON.stringify(mockUser),
  );
});

test("getUser should return stored user", async () => {
  const mockUser = { id: "1", email: "test@example.com" };
  jest
    .mocked(SecureStore.getItemAsync)
    .mockResolvedValueOnce(JSON.stringify(mockUser));

  const savedUser = await getUser();
  expect(savedUser).toEqual(mockUser);
  expect(SecureStore.getItemAsync).toHaveBeenCalledTimes(1);
  expect(SecureStore.getItemAsync).toHaveBeenCalledWith("sessionUser");
});

test("clearUser should remove stored user", async () => {
  await clearUser();
  expect(SecureStore.deleteItemAsync).toHaveBeenCalledTimes(1);
  expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith("sessionUser");
});
