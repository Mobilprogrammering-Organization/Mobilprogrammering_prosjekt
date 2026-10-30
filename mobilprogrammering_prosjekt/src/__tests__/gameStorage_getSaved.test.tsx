

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSavedGames } from "../utils/gameStorage";


jest.mock("@react-native-async-storage/async-storage", () => ({
    
    __esModule: true,
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

    // faktisk kontroll om noe er lagra
    expect(savedGames).toEqual(gameIds);
});