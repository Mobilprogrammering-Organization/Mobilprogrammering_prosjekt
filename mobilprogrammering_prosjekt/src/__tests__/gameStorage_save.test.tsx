
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveGame } from "../utils/gameStorage";


jest.mock("@react-native-async-storage/async-storage", () => ({
    
    __esModule: true,
    default: {
        getItem: jest.fn(),          // Mocker getItem og setItem
        setItem: jest.fn(),          // for å simulere lagring i AS
    },
    
}));

test("saveGame should save a game ID to AsyncStorage", async () => {
    const gameId = 12345;


    jest.mocked(AsyncStorage.getItem).mockResolvedValue(null);

    await saveGame(gameId);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith("myGames", JSON.stringify([gameId]));

    
});