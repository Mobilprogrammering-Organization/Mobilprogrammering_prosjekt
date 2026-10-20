import React from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Activity, useEffect, useState } from "react";
import { GAMES } from "@/data/games";
import { Game } from "@/types/game";
import { styles } from "@/styles/styles";
import { CLIENT_ID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";

export default function GamePage() {
  const { id } = useLocalSearchParams();

  const gameWithID = `
  fields name, cover.image_id, genres.name, rating, release_dates.human, summary;
  where id = (${id});
  sort rating desc;
  limit 10;`;

  const [game, setGame] = useState<Partial<Game>>({});

  useEffect(() => {
    getIGDBContent("games", gameWithID, CLIENT_ID ?? "").then((data) =>
      setGame(data?.[0]),
    );
  }, [id, game]);

  const { name, cover, genres, rating, release_dates, summary } = game;

  return (
    <React.Suspense fallback={<ActivityIndicator />}>
      <View style={[styles.container, gameStyles.game]}>
        <Text style={styles.mainText}>Game Details</Text>
        {game ? (
          <View>
            <Image
              style={{ width: 300, height: 300 }}
              source={{ uri: cover?.image_id }}
            />
            <View style={gameStyles.gameInfo}>
              <Text style={[gameStyles.infoText, gameStyles.gameTitle]}>
                {name}
              </Text>
              <Text style={gameStyles.infoText}>Genres: </Text>
              <Text style={gameStyles.gameInfoText}>
                {genres?.map((genre) => genre.name).join(", ") ?? "N/A"}
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
            </View>
          </View>
        ) : (
          <Text>The game page could not be found.</Text>
        )}
      </View>
    </React.Suspense>
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
