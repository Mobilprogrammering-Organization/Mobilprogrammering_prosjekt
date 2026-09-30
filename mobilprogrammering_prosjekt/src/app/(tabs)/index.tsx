import { GameList } from "@/components/GameList";
import { Text, View } from "react-native";
import { styles } from "@/styles/styles";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
        <GameList /> 
    </View>
  );
}
