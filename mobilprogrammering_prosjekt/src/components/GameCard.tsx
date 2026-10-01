import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useState } from "react";
import { Game } from "@/types/game";
import { Link } from "expo-router";
import { styles } from "@/styles/styles";
import { colors } from "@/styles/theme";


export function GameCard({ children, game }: { children?: React.ReactNode; game: Game }) {
  const { title, boxArtImageURL, genres, releaseDate } = game;

  return (
    <View style={gameStyles.game}>
      <Link href={{pathname: `/gamepage`, params: { id: game.id }}}><Image style={{ width: 300, height: 300 }} source={{ uri: boxArtImageURL }} /></Link>
      <View style={gameStyles.gameInfo}>
        <Link href={{pathname: `/gamepage`, params: { id: game.id }}}><Text style={[gameStyles.infoText, gameStyles.gameTitle]}>{title}</Text></Link>
        <Text style={gameStyles.infoText}>Genres: </Text>
        <Text style={gameStyles.gameInfoText}>{genres.join(", ")}</Text>
        <Text style={gameStyles.infoText}>Release Date: </Text>
        <Text style={gameStyles.gameInfoText}>{releaseDate.toDateString()}</Text>
        <Text style={gameStyles.infoText}>Description: </Text>
        <Text style={gameStyles.gameInfoText}>{game.description}</Text>
        { children }
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
  }
})