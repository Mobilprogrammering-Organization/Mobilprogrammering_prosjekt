import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { Game } from "@/types/game";
import { Link } from "expo-router";
import LikeCounter from "./LikeCounter";
import { colors } from "@/styles/theme";

export function GameCard({ game }: { game: Game }) {
  const { title, boxArtImageURL, genres, releaseDate } = game;

  const [isAdded, setIsAdded] = useState(false);

  return (
    <View style={gameStyles.game}>
      <Link href={{pathname: `/gamepage`, params: { id: game.id }}}><Image style={{ width: 300, height: 300 }} source={{ uri: boxArtImageURL }} /></Link>
      <View style={gameStyles.gameInfo}>
        <Link href={{pathname: `/gamepage`, params: { id: game.id }}}><Text style={gameStyles.gameInfoText}><Text style={gameStyles.infoText}>Title: </Text>{title}</Text></Link>
        <Text style={gameStyles.gameInfoText}><Text style={gameStyles.infoText}>Genres: </Text>{genres.join(", ")}</Text>
        <Text style={gameStyles.gameInfoText}><Text style={gameStyles.infoText}>Release Date: </Text>{releaseDate.toDateString()}</Text>
        <Text style={gameStyles.gameInfoText}><Text style={gameStyles.infoText}>Description: </Text>{game.description}</Text>
        <LikeCounter />
        <Pressable style={isAdded ? gameStyles.removeButton : gameStyles.addButton} onPress={() => setIsAdded(!isAdded)}>
          <Text style={gameStyles.addButtonText}>
            {isAdded ? "Remove game from game list." : "Add game to game list."}
          </Text>
        </Pressable>
      </View>
    </View>
  )
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
  },
  infoText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  gameInfoText: {
    fontSize: 20,
  },
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "black",
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "black",
  },
  addButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
})