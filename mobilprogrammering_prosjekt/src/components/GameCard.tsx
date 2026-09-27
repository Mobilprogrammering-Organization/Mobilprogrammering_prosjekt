import { View, Text, Image, StyleSheet } from "react-native";

import { Game } from "@/types/game";
import LikeCounter from "./LikeCounter";

export function GameCard({ game }: { game: Game }) {
  const { title, boxArtImageURL, genres, releaseDate } = game;

  return (
    <View style={styles.game}>
      <Image style={{ width: 300, height: 300 }} source={{ uri: boxArtImageURL }} />
      <View style={styles.gameInfo}>
        <Text style={styles.gameInfoText}><Text style={styles.infoText}>Title: </Text>{title}</Text>
        <Text style={styles.gameInfoText}><Text style={styles.infoText}>Genres: </Text>{genres.join(", ")}</Text>
        <Text style={styles.gameInfoText}><Text style={styles.infoText}>Release Date: </Text>{releaseDate.toDateString()}</Text>
        <LikeCounter />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  infoText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  gameInfoText: {
    fontSize: 20,
  }
})