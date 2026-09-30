import { View, Text } from "react-native";
import { Link } from "expo-router";
import { styles } from "@/styles/styles";

export default function Dummy() {
  return (
    <View>
      <Text style={styles.paragraphText}>Page not found</Text>
      <Text style={styles.paragraphText}>Game cards or something similar may be displayed here in the future.</Text>
      <Text style={styles.paragraphText}>Still under development.</Text>
    </View>
  );
}