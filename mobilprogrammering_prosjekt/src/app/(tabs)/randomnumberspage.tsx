import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { styles } from "@/styles/styles";
import { useAuth } from "@/auth/context/AuthContext";
import { getRandomNumber } from "@/shared/utils/get-random-number";

export default function RandomNumbersPage() {
  const { randomNumbers, addRandomNumber } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>
        Random numbers: {"\n"}
        {randomNumbers.join(", ")}
      </Text>
      <Pressable
        style={styles.button}
        onPress={() => addRandomNumber(getRandomNumber(1, 100))}
      >
        <Text style={styles.mainText}>Add Random Number</Text>
      </Pressable>
    </View>
  );
}
