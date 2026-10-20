import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Game } from "@/types/game";
import { Link } from "expo-router";
import { styles } from "@/styles/styles";
import { colors } from "@/styles/theme";
import { CLIENT_ID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";

export function GameCard({
  children,
  game,
}: {
  children?: React.ReactNode;
  game: Partial<Game>;
}) {
  const { name, cover, genres, rating, release_dates, summary } = game;

  return (
    <View style={gameStyles.game}>
      <Link href={{ pathname: `/gamepage`, params: { id: game.id } }}>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: cover?.image_id }}
        />
      </Link>
      <View style={gameStyles.gameInfo}>
        <Link href={{ pathname: `/gamepage`, params: { id: game.id } }}>
          <Text style={[gameStyles.infoText, gameStyles.gameTitle]}>
            {name}
          </Text>
        </Link>
        <Text style={gameStyles.infoText}>Genres: </Text>
        <Text style={gameStyles.gameInfoText}>
          {genres?.map((genre) => genre.name).join(", ")}
        </Text>
        <Text style={gameStyles.infoText}>Rating: </Text>
        <Text style={gameStyles.gameInfoText}>{rating}</Text>
        <Text style={gameStyles.infoText}>Release Date: </Text>
        <Text style={gameStyles.gameInfoText}>
          {release_dates
            ?.map((releaseDate) => releaseDate.human)
            .join(", ")
            .slice(0, 12)}
        </Text>
        <Text style={gameStyles.infoText}>Description: </Text>
        <Text style={gameStyles.gameInfoText}>{summary}</Text>
        {children}
      </View>
    </View>
  );
}

const gameStyles = StyleSheet.create({
  game: {
    padding: 10,
    marginBottom: 30,
  },
  gameInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#d7d7d7",
    padding: 10,
    textAlign: "center",
  },
  infoText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  gameInfoText: {
    fontSize: 20,
    textAlign: "center",
  },
  gameTitle: {
    fontSize: 24,
  },
});
