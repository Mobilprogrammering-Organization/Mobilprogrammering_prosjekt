import { View, Text, Pressable } from "react-native";
import { styles } from "@/styles/styles";

export default function DeleteAccountPage() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "red", ...styles.mainText }}>Are you sure you want to delete your account?</Text>
      <Pressable style={styles.button} onPress={() => { /* handle delete account */ }}>
        <Text>Delete Account</Text>
      </Pressable>
    </View>
  );
}