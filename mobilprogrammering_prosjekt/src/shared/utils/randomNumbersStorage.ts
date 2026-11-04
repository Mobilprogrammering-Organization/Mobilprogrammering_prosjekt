import * as SecureStore from "expo-secure-store";

const RANDOM_NUMBERS_KEY = "randomNumbers";

export async function saveRandomNumbers(numbers: number[]) {
  await SecureStore.setItemAsync(RANDOM_NUMBERS_KEY, JSON.stringify(numbers));
}

export async function getRandomNumbers(): Promise<number[] | null> {
  const randomNumbers = await SecureStore.getItemAsync(RANDOM_NUMBERS_KEY);
  return randomNumbers ? JSON.parse(randomNumbers) : null;
}

export async function clearRandomNumbers() {
  await SecureStore.deleteItemAsync(RANDOM_NUMBERS_KEY);
}
