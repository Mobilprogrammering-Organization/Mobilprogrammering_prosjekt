
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveGame } from "../utils/gameStorage";


jest.mock("@react-native-async-storage/async-storage", () => ({
    
    __esModule: true,
    default: {
        getItem: jest.fn(),
        setItem: jest.fn(),
    },
    
}));

test("saveGame should save a game ID to AsyncStorage", async () => {
    const gameId = 12345;

    await saveGame(gameId);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("myGames", JSON.stringify([gameId]));
});