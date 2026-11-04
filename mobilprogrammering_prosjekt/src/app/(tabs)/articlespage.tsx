import { View, Text } from "react-native";
import { Articles } from "@/components/Articles";
import { styles } from "@/styles/styles";

export default function ArticlesPage() {
  return (
    <View style={styles.container}>
      <Articles />
    </View>
  );
}