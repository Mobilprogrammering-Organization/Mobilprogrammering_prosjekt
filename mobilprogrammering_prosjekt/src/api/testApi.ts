

const BASE_PATH = "https://api.mockapi.com";
const API_KEY = "658a6ba6211d45e19c5b6a070479dde0";

export async function getGames() {

    try {
        const response = await fetch(`${BASE_PATH}`, {
            headers: {
                'x-api-key': "658a6ba6211d45e19c5b6a070479dde0"
            }
        });

        const games = await response.json();
        console.log(games);
        return games;
        
    } catch (error) {
        console.log(error);
    }
}