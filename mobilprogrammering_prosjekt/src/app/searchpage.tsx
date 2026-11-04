import React from "react";
import { View, Text, ScrollView } from "react-native";
import { GameCard } from "@/components/GameCard";
import LikeToggle from "@/components/LikeToggle";
import CommentSection from "@/components/CommentSection";
import { AddButton } from "@/components/AddButton";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getIGDBContent } from "@/api/igdb";
import { CLIENT_ID } from "@/constants/env_values";
import { ActivityIndicator } from "react-native";
import { colors } from "@/styles/theme";
import { styles } from "@/styles/styles";

export default function SearchResults() {
  const { query } = useLocalSearchParams<{ query?: string }>();

  const gamesMatchingQuery = `
  search "${query}";
  fields name, cover.image_id, platforms.name, genres.name, rating, release_dates.human, summary;
  where cover != null & version_parent = null;
  limit 10;`;

  const {
    data: searchedGames,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["gamesearch", query],
    queryFn: () => getIGDBContent("games", gamesMatchingQuery, CLIENT_ID ?? ""),
  });

  return query ? (
    <View style={styles.loading}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors["brand-black"]} />
      ) : isError ? (
        <Text style={styles.mainText}>
          Something went wrong when fetching games...
        </Text>
      ) : (searchedGames?.length ?? 0) > 0 ? (
        <React.Suspense
          fallback={
            <ActivityIndicator size="large" color={colors["brand-black"]} />
          }
        >
          <ScrollView>
            {searchedGames?.map((game) => (
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
  ) : (
    <View style={styles.loading}>
      <Text style={styles.mainText}>No search query provided.</Text>
    </View>
  );
}
