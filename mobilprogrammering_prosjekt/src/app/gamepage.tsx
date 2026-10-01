import { View, Text, Image, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { GAMES } from "@/data/games";
import { Game } from "@/types/game";
import { styles } from "@/styles/styles";

export default function GamePage() {
  const { id } = useLocalSearchParams();
  const selectedGame = GAMES.find((game: Game) => game.id === id);

  const { title, boxArtImageURL, genres, releaseDate, description } = selectedGame || {};

  return (
    <View style={[styles.container, gameStyles.game]}>
      <Text style={styles.mainText}>Game Details</Text>
      {selectedGame ? (
        <View>
          <Image style={{ width: 300, height: 300 }} source={{ uri: boxArtImageURL}} />
          <View style={gameStyles.gameInfo}>
            <Text style={[gameStyles.infoText, gameStyles.gameTitle]}>{title}</Text>
            <Text style={gameStyles.infoText}>Genres: </Text>
            <Text style={gameStyles.gameInfoText}>{genres ? genres.join(", ") : "N/A"}</Text>
            <Text style={gameStyles.infoText}>Release Date: </Text>
            <Text style={gameStyles.gameInfoText}>{releaseDate?.toDateString()}</Text>
            <Text style={gameStyles.infoText}>Description: </Text>
            <Text style={gameStyles.gameInfoText}>{description}</Text>
          </View>
        </View>
      ) : (
        <Text>The game page could not be found.</Text>
      )}
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
  }
})