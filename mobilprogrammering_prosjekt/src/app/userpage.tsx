import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { styles } from "@/styles/styles";
import { useAuth } from "@/auth/context/AuthContext";

export default function UserPage() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Hello, {user?.email}!</Text>
      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
      <Link style={styles.dangerButton} href="/deleteaccountpage">
        <Text style={styles.buttonText}>Delete account</Text>
      </Link>
    </View>
  );
}
