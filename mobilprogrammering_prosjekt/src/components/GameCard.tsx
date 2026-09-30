import { View, Text, Image, StyleSheet } from "react-native";

import { Game } from "@/types/game";
import { Link } from "expo-router";
import LikeCounter from "./LikeCounter";

export function GameCard({ game }: { game: Game }) {
  const { title, boxArtImageURL, genres, releaseDate } = game;

  return (
    <View style={styles.game}>
      <Link href={`/`}><Image style={{ width: 300, height: 300 }} source={{ uri: boxArtImageURL }} /></Link>
      <View style={styles.gameInfo}>
        <Link href={`/`}><Text style={styles.gameInfoText}><Text style={styles.infoText}>Title: </Text>{title}</Text></Link>
        <Text style={styles.gameInfoText}><Text style={styles.infoText}>Genres: </Text>{genres.join(", ")}</Text>
        <Text style={styles.gameInfoText}><Text style={styles.infoText}>Release Date: </Text>{releaseDate.toDateString()}</Text>
        <Text style={styles.gameInfoText}><Text style={styles.infoText}>Description: </Text>{game.description}</Text>
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