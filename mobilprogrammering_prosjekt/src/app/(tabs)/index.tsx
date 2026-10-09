import { GameList } from "@/components/GameList";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "@/styles/styles";
import { Link } from "expo-router";

export default function Index() {
  return (
    <React.Suspense fallback={<ActivityIndicator />}>
      <View style={styles.container}>
        <GameList />
      </View>
    </React.Suspense>
  );
}
