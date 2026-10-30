

import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSavedGames } from "../utils/gameStorage";

    // erstatter AsyncStorage med en mock som har getItem()
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

        // func som skal testes
    const savedGames = await getSavedGames();

    // faktiske kontrollen at funksjonen returnere de lagrede gameID-an
    expect(savedGames).toEqual(gameIds);

    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);

     // sjekk om nøkkelen blir brukt
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("myGames");

});