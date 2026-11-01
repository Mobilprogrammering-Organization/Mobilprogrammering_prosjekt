import { View, Text } from "react-native";
import { Link } from "expo-router";
import { styles } from "@/styles/styles";

export default function RandomNumbersPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Random numbers: {"\n"}</Text>
      <Text style={styles.mainText}>{Math.floor(Math.random() * 100)}</Text>
    </View>
  );
}
