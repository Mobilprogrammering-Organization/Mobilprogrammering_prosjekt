import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Activity, useEffect, useState } from "react";
import { GAMES } from "@/data/games";
import { Game } from "@/types/game";
import { styles } from "@/styles/styles";
import { CLIENT_ID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import { useQuery } from "@tanstack/react-query";
import { colors } from "@/styles/theme";

export default function GamePage() {
  const { id } = useLocalSearchParams();

  const gameWithID = `
  fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, summary, 
  age_ratings.rating_category.rating, storyline, websites.url;
  where id = (${id});
  sort rating desc;
  limit 10;`;

  //Tanstack:
  const {
    data: game,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["games"],
    queryFn: () => getIGDBContent("games", gameWithID, CLIENT_ID ?? ""),
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color={colors["brand-black"]} />
      </View>
    );
  }

  if (isError) {
    return <Text>Noe gikk galt under henting av spillet...</Text>;
  }

  const {
    name,
    cover,
    platforms,
    genres,
    rating,
    release_dates,
    summary,
    age_ratings,
    storyline,
    websites,
  } = game?.[0] ?? {};

  return (
    <View style={styles.loading}>
      <React.Suspense fallback={<ActivityIndicator />}>
        <ScrollView>
          <View style={[styles.container, gameStyles.game]}>
            <Text style={styles.mainText}>Game Details</Text>
            {game ? (
              <View>
                <Image
                  style={{ width: 300, height: 300 }}
                  source={{ uri: cover?.image_id }}
                />
                <View style={gameStyles.gameInfo}>
                  <Text style={[gameStyles.infoText, gameStyles.gameTitle]}>
                    {name}
                  </Text>
                  <View>
                    <Text style={gameStyles.infoText}>Genres: </Text>
                    <Text style={gameStyles.gameInfoText}>
                      {genres?.map((genre) => genre.name).join(", ")}
                    </Text>
                  </View>
                  <View>
                    <Text style={gameStyles.infoText}>Platforms: </Text>
                    <Text style={gameStyles.gameInfoText}>
                      {platforms?.map((platform) => platform.name).join(", ")}
                    </Text>
                  </View>
                  <View>
                    <Text style={gameStyles.infoText}>Rating: </Text>
                    <Text style={gameStyles.gameInfoText}>
                      {rating ? `${Math.round(rating)}/100` : "N/A"}
                    </Text>
                  </View>
                  <View>
                    <Text style={gameStyles.infoText}>Release Date: </Text>
                    <Text style={gameStyles.gameInfoText}>
                      {release_dates
                        ?.map((releaseDate) => releaseDate.human)
                        .join(", ")
                        .slice(0, 12)}
                    </Text>
                  </View>
                  <View>
                    <Text style={gameStyles.infoText}>Description: </Text>
                    <Text style={gameStyles.gameInfoText}>{summary}</Text>
                  </View>
                  <View>
                    <Text style={gameStyles.infoText}>Age Ratings: </Text>
                    <Text style={gameStyles.gameInfoText}>
                      {age_ratings
                        ?.map(
                          (age_rating) => age_rating?.rating_category?.rating,
                        )
                        .join(", ") ?? "N/A"}
                    </Text>
                  </View>
                  <View>
                    <Text style={gameStyles.infoText}>Storyline: </Text>
                    <Text style={gameStyles.gameInfoText}>
                      {storyline ?? "N/A"}
                    </Text>
                  </View>
                  <View>
                    <Text style={gameStyles.infoText}>Related sources: </Text>
                    <Text style={gameStyles.gameInfoText}>
                      {websites?.map((website) => website.url).join(", ") ??
                        "N/A"}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <Text>The game page could not be found.</Text>
            )}
          </View>
        </ScrollView>
      </React.Suspense>
    </View>
  );
}

const gameStyles = StyleSheet.create({
  game: {
    padding: 10,
    marginBottom: 30,
  },
  gameInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#d7d7d7",
    padding: 10,
    textAlign: "center",
    gap: 5,
  },
  infoText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  gameInfoText: {
    fontSize: 20,
    textAlign: "center",
  },
  gameTitle: {
    fontSize: 24,
  },
});
