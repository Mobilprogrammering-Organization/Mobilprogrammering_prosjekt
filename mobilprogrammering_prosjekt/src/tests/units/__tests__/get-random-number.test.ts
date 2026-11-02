import { getRandomNumber } from "@/shared/utils/get-random-number";

describe("getRandomNumber", () => {
  test("should return a number within the specified range", () => {
    const min = 0;
    const max = 100;
    const result = getRandomNumber(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});
