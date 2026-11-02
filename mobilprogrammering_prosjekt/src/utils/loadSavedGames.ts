
import { getSavedGames } from "@/utils/gameStorage";
import { getIGDBContent } from "@/api/igdb";
import { CLIENT_ID } from "@/constants/env_values";
import type { Game } from "@/types/game";

export async function loadSavedGames(): Promise<Partial<Game>[]> {
  
  const savedIds = await getSavedGames();

  if (savedIds.length === 0) {
    return [];
  }

  
  const query = `
    fields name, cover.image_id, genres.name,
    platforms.name, rating, release_dates.human, summary;
    where id = (${savedIds.join(",")});
    limit ${savedIds.length};
  `;

  
  const games = await getIGDBContent("games", query, CLIENT_ID ?? "");

  return games;
}
