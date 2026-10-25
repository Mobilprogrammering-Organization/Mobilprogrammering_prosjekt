

import AsyncStorage from "@react-native-async-storage/async-storage"


const STORAGE_KEY = "myGames"

export async function getSavedGames(): Promise<number[]> {

    const data = await AsyncStorage.getItem(STORAGE_KEY)



}