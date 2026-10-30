import AsyncStorage from "@react-native-async-storage/async-storage";
import { getSavedGames } from "../utils/gameStorage";



// Mocker AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
    __esModule: true,
    default: {
        getItem: jest.fn(),
        setItem: jest.fn(),
    },
}));

beforeEach(() => {
    jest.clearAllMocks();
});


