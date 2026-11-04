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
  const { name, cover, genres, platforms, rating, release_dates, summary } =
    game;

  return (
    <View style={gameStyles.game}>
      <Link href={{ pathname: `/gamepage`, params: { id: game.id } }} asChild>
        <Pressable>
          <Image
            style={{ width: 264, height: 374, alignSelf: "center" }}
            source={{
              uri: cover?.image_id
                ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover?.image_id}.jpg`
                : undefined,
            }}
          />
        </Pressable>
      </Link>
      <View style={gameStyles.gameInfo}>
        <Link href={{ pathname: `/gamepage`, params: { id: game.id } }}>
          <Text style={[gameStyles.infoText, gameStyles.gameTitle]}>
            {name}
          </Text>
        </Link>
        <View>
          <Text style={gameStyles.infoText}>Genres: </Text>
          <Text style={gameStyles.gameInfoText}>
            {genres?.map((genre) => genre.name).join(", ")}
          </Text>
        </View>
        <View>
          <Text style={gameStyles.infoText}>Platforms: </Text>
          <Text style={gameStyles.gameInfoText}>
            {platforms?.map((platform) => platform.name).join(", ")}
          </Text>
        </View>
        <View>
          <Text style={gameStyles.infoText}>Rating: </Text>
          <Text style={gameStyles.gameInfoText}>
            {rating ? `${Math.round(rating)}/100` : "N/A"}
          </Text>
        </View>
        <View>
          <Text style={gameStyles.infoText}>Release Date: </Text>
          <Text style={gameStyles.gameInfoText}>
            {release_dates
              ?.map((releaseDate) => releaseDate.human)
              .join(", ")
              .slice(0, 12)}
          </Text>
        </View>
        <View>
          <Text style={gameStyles.infoText}>Description: </Text>
          <Text style={gameStyles.gameInfoText}>{summary}</Text>
        </View>
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
    gap: 5,
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
