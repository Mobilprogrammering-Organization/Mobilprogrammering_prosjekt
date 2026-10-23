import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { Suspense } from "react";
import { useEffect, useState } from "react";
import { styles } from "@/styles/styles";
import { GAMES } from "@/data/games";
import { GameCard } from "@/components/GameCard";
import { AddButton } from "@/components/AddButton";
import { CLIENT_ID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import { Game } from "@/types/game";
import { GameList } from "@/components/GameList";

const gamesFromIGDB = `
    fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary;
    where rating > 80 & rating_count > 50;
    sort rating desc;
    limit 10;`;

export default function MyGamesPage() {
  const [games, setGames] = useState<Partial<Game>[]>([]);

  useEffect(() => {
    getIGDBContent("games", gamesFromIGDB, CLIENT_ID ?? "").then((data) =>
      setGames(data),
    );
  }, [games]);

  return (
    <React.Suspense fallback={<ActivityIndicator />}>
      <View style={styles.container}>
        <GameList />
      </View>
    </React.Suspense>
  );
}
