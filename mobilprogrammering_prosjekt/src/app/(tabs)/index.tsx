import { GameList } from "@/components/GameList";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "@/styles/styles";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import { CLIENT_ID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import { type Game } from "@/types/game";

export default function Index() {
  return (
    <View style={styles.loading}>
      <React.Suspense fallback={<ActivityIndicator />}>
        <View style={styles.container}>
          <GameList />
        </View>
      </React.Suspense>
    </View>
  );
}
