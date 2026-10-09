import CommentSection from "./CommentSection";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { GameCard } from "./GameCard";
import { AddButton } from "./AddButton";
import LikeToggle from "./LikeToggle";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import type { Game } from "@/types/game";
import { GAMES } from "@/data/games";
import React from "react";

const gamesFromIGDB = `
fields name, cover.image_id, genres.name, rating, first_release_date, summary;
where rating > 80 & rating_count > 50;
sort rating desc;
limit 10;`;

export function GameList() {
  /*
  const games: Partial<Game>[] = await getIGDBContent(
    "games",
    gamesFromIGDB,
    CLIENTID,
  );
  */

  return (
    <ScrollView>
      {GAMES.map((game) => (
        <GameCard key={game.id} game={game}>
          <LikeToggle />
          <CommentSection />
          <AddButton />
        </GameCard>
      ))}
    </ScrollView>
  );
}
