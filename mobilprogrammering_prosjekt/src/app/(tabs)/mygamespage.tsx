import { View, Text, ScrollView } from "react-native";
import { styles } from "@/styles/styles";
import { GAMES } from "@/data/games";
import { GameCard } from "@/components/GameCard";
import { AddButton } from "@/components/AddButton";

export default function MyGamesPage() {
  return (
    <View style={styles.container}>
      <ScrollView>
        {GAMES
          .filter((game) => Number(game.id) === 2 || Number(game.id) === 5)
          .map((game) => 
          <GameCard key={game.id} game={game}>
            <AddButton />
          </GameCard>)}
      </ScrollView>
    </View>
  );
}