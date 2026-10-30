
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

    // sjekk om den ble kalt med riktig nøkkel og verdi
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("myGames", JSON.stringify([gameId]));
    
    // at metodene blir kalt 1 gang hver
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);

    // sjekk om den ble kalt med riktig nøkkel
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("myGames");

    
    
    
});