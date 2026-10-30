

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSavedGames } from "../utils/gameStorage";

    // Henter EN funksjon fra AS
jest.mock("@react-native-async-storage/async-storage", () => ({
    
    __esModule: true,  // erstatter default export med en mock
    default: {
        getItem: jest.fn(),
    
    },
}));

test("getSavedGames should return saved games", async () => {
    const gameIds = [12345, 54321];


    jest.mocked(AsyncStorage.getItem).mockResolvedValue(
        JSON.stringify(gameIds)
    );


    const savedGames = await getSavedGames();

    // den faktiske kontrollen om noe er lagra
    expect(savedGames).toEqual(gameIds);
});