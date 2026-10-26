

import AsyncStorage from "@react-native-async-storage/async-storage"



// dokumentasjon: https://react-native-async-storage.github.io/2.0/Usage/


const STORAGE_KEY = "myGames"     // "Nøkkeln" som brukes for å lagre spillene i AsyncStorage




export async function getSavedGames(): Promise<number[]> {
    
    // Henter data fra lagringa
    const data = await AsyncStorage.getItem(STORAGE_KEY)


    if (data) {
        return JSON.parse(data);

    } else {

        return [];
    } 
        
}

export async function saveGame(gameId: number): Promise<void> {
    // Henter spill som man har
    const savedGames = await getSavedGames();
    
    
    if (!savedGames.includes(gameId)) { // Hvis spillet finnes, sååå
        
        savedGames.push(gameId);
        
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedGames) // Lagrer spillene i listen under en nøkkel i JSON-format
        );
    }
}



export async function removeGame(gameId: number): Promise<void> {
    const savedGames = await getSavedGames();

    const updatedGames = savedGames.filter((id) => id !== gameId); // Fjerner spillet fra listen

    await AsyncStorage.setItem(
        STORAGE_KEY, 
        JSON.stringify(updatedGames)); // Lagrer den oppdaterte listen

}




