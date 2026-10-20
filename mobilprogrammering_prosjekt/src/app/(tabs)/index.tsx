import { GameList } from "@/components/GameList";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "@/styles/styles";
import { Link } from "expo-router";
import { CLIENT_ID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import { type Game } from "@/types/game";

export default function Index() {
  const gamesFromIGDB = `
  fields name, cover.image_id, genres.name, rating, release_dates.human, summary;
  where rating > 80 & rating_count > 50;
  sort rating desc;
  limit 10;`;

  const [games, setGames] = useState<Partial<Game>[]>([]);

  useEffect(() => {
    getIGDBContent("games", gamesFromIGDB, CLIENT_ID ?? "").then((data) =>
      setGames(data),
    );
  }, [games]);

  return (
    <React.Suspense fallback={<ActivityIndicator />}>
      <View style={styles.container}>
        <GameList games={games} />
      </View>
    </React.Suspense>
  );
}
