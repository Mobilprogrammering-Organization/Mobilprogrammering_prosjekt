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
import { CLIENT_ID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import type { Game } from "@/types/game";
import { GAMES } from "@/data/games";
import React from "react";

export function GameList({ games }: { games: Partial<Game>[] }) {
  return (
    <ScrollView>
      {games.map((game) => (
        <GameCard key={game.id} game={game}>
          <LikeToggle />
          <CommentSection />
          <AddButton />
        </GameCard>
      ))}
    </ScrollView>
  );
}
