import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { Game } from "@/types/game";
import { Link } from "expo-router";
import { styles } from "@/styles/styles";
import { colors } from "@/styles/theme";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";

export function GameCard({
  children,
  game,
}: {
  children?: React.ReactNode;
  game: Partial<Game>;
}) {
  const { id, name, cover, genres, rating, releaseDate, summary } = game;

  /*
  const franchises = `
    fields name, games;
    sort rating desc;
    where games = (${id});
    limit 10;
  `;

  const gameFranchise = await getIGDBContent(
    "franchises",
    franchises,
    CLIENTID,
  );
  */

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
        <Text style={gameStyles.infoText}>Franchise: </Text>
        <Text style={gameStyles.gameInfoText}>
          {/* {gameFranchise?.[0]?.name ?? "N/A"} */}
        </Text>
        <Text style={gameStyles.infoText}>Genres: </Text>
        <Text style={gameStyles.gameInfoText}>
          {genres?.map((genre) => genre.name).join(", ")}
        </Text>
        <Text style={gameStyles.infoText}>Release Date: </Text>
        <Text style={gameStyles.gameInfoText}>
          {releaseDate?.toLocaleDateString()}
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
