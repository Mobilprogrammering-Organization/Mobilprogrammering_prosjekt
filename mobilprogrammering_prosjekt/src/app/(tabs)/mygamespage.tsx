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
import { useAuth } from "@/auth/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { colors } from "@/styles/theme";

export default function MyGamesPage() {
  const { gameIDs } = useAuth();

  const gamesFromIGDB = `
  fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary;
  where id = (${gameIDs.join(",")});
  sort name desc;
  limit 10;`;

  const {
    data: userGames,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userGames", gameIDs],
    queryFn: () => getIGDBContent("games", gamesFromIGDB, CLIENT_ID ?? ""),
  });

  return gameIDs.length === 0 ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.mainText}>No games could be found.</Text>
    </View>
  ) : (
    <View style={styles.loading}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors["brand-black"]} />
      ) : isError ? (
        <Text style={styles.mainText}>
          Something went wrong when fetching games...
        </Text>
      ) : userGames ? (
        <React.Suspense
          fallback={
            <ActivityIndicator size="large" color={colors["brand-black"]} />
          }
        >
          <ScrollView>
            {userGames.map((game) => (
              <GameCard key={game.id} game={game}>
                <AddButton gameID={game.id} />
              </GameCard>
            ))}
          </ScrollView>
        </React.Suspense>
      ) : (
        <Text style={styles.mainText}>No games could be found.</Text>
      )}
    </View>
  );
}
