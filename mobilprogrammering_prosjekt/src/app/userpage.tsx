import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { styles } from "@/styles/styles";

export default function UserPage() {
  const { email } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Hello, {email}!</Text>
      <Link style={styles.button} href="/">
        <Text>Log out</Text>
      </Link>
      <Link style={styles.button} href="/deleteaccountpage">
        <Text>Delete account</Text>
      </Link>
    </View>
  );
}
