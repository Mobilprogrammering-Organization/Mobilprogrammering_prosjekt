import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { styles } from "@/styles/styles";

export default function UserPage() {
  const { username } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Hello, {username}!</Text>
      <Link style={styles.button} href="/changepasswordpage">
        <Text>Change password</Text>
      </Link>
      <Link style={styles.button} href="/deleteaccountpage">
        <Text>Delete account</Text>
      </Link>
    </View>
  );
}
