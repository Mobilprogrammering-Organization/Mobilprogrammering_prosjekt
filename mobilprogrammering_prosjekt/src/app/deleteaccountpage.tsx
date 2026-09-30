import { View, Text, Pressable } from "react-native";
import { styles } from "@/styles/styles";
import { Link } from "expo-router";

export default function DeleteAccountPage() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "red", ...styles.mainText }}>Are you sure you want to delete your account?</Text>
      <Link href="/" style={styles.button}>
        <Text>Delete Account</Text>
      </Link>
    </View>
  );
}