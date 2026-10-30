import { removeGame } from "@/utils/gameStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage", () => ({
    __esModule: true,
    default: {
        getItem: jest.fn(),
        setItem: jest.fn(),
    },
}));



test("removeGame should remove a game ID from AsyncStorage", async () => {
    const gameIdToRemove = 12345;
    const initialGameIds = [12345, 67890];

    jest.mocked(AsyncStorage.getItem).mockResolvedValue(JSON.stringify(initialGameIds));

    await removeGame(gameIdToRemove);

    // sjekk om den ble kalt med riktig nøkkel og at det bare en en gameID igjen
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("myGames", JSON.stringify([67890]));
    
    // sjekk om metodene blir kalt 1 gang hver
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);

    // sjekk om den ble kalt med riktig nøkkel
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("myGames");

});