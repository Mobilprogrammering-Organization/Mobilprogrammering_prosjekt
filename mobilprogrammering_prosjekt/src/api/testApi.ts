import z from "zod";

// Innhente data fra eksternt API ved bruk av fetch:
const BASE_PATH = "https://api.mockapi.com";
const API_KEY = "658a6ba6211d45e19c5b6a070479dde0";


export const GameTestSchema = z.object({
  id: z.string().min(1, { message: "Id: is required " }),
  name: z.string().min(1, { message: "Title: is required " }),
  cover: z.object({
    id: z.string().min(1, { message: "Cover ID: is required " }),
    image_id: z.string().min(1, { message: "Cover Image ID: is required " }),
  }),
  genres: z.array(
    z.object({
      id: z.string().min(1, { message: "Genre ID: is required " }),
      name: z.string().min(1, { message: "Genre name: is required " }),
    })).optional(),
  rating: z.number().min(1, { message: "Rating: is required " }).optional(),
  releaseDate: z.date({ message: "Date: is required " }).optional(),
  summary: z.string().min(1, { message: "Description: is required " }),
});
export const GamesArraySchema = z.array(GameTestSchema);

export async function getGames() {

    try {
        const response = await fetch(`${BASE_PATH}/api/v1/games`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const games = await response.json();

        if(!response.ok) {
            console.log(games);
        }
        return GamesArraySchema.parse(games.data);
        
    } catch (error) {
        console.log(error);
    }
}


