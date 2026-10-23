import CommentSection from "./CommentSection";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { GameCard } from "./GameCard";
import { AddButton } from "./AddButton";
import LikeToggle from "./LikeToggle";
import { CLIENT_ID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import type { Game } from "@/types/game";
import { GAMES } from "@/data/games";
import React from "react";
import { getGames } from "@/api/testApi";
import { useQuery } from "@tanstack/react-query";
import { colors } from "@/styles/theme";

const gamesFromIGDB = `
fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary;
where rating > 80 & rating_count > 50;
sort rating desc;
limit 10;`;

export function GameList() {
  //Tanstack:
  const {
    data: games,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["games"],
    queryFn: () => getIGDBContent("games", gamesFromIGDB, CLIENT_ID ?? ""),
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color={colors["brand-black"]} />
      </View>
    );
  }

  if (isError) {
    return <Text>Noe gikk galt under henting av spill...</Text>;
  }

  return (
    <ScrollView>
      {games ? (
        games.map((game) => (
          <GameCard key={game.id} game={game}>
            <LikeToggle />
            <CommentSection />
            <AddButton />
          </GameCard>
        ))
      ) : (
        <Text>No games could be found.</Text>
      )}
    </ScrollView>
  );
}
