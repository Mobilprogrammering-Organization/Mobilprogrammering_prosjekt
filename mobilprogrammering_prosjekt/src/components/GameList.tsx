/*Claude chat som forklarer bruk av igdb api-et: https://claude.ai/share/cbf3f386-cf06-47b9-810b-7f8b9e8884e2*/ 

import { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView, StyleSheet } from "react-native";
import { GAMES } from "@/data/games";
import { GameCard } from "./GameCard";
import { AddButton } from "./AddButton";
import LikeToggle from "./LikeToggle";

export function GameList() {
  /*
  const [apiData, setApiData] = useState("Loading games...");

  useEffect(() => {
    async function getAPIAccessToken(clientId: string, clientSecret: string) {
      try {
        const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
        const data = await response.json();
        const auth_access_token = data.access_token;
        return auth_access_token;
      }
      catch(err) {
        console.log(err);
      }
    }

    async function getAPIData(baseUrl: string, resource: string, query: string, clientId: string) {
      try {
        const response = await fetch(`${baseUrl}${resource}`, {
          method: "POST",
          headers: {
            "Client-ID": clientId,
            "Authorization": `Bearer ${getAPIAccessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET)}`,
            "Content-Type": "text/plain",
          },
          body: query
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setApiData(data);
      }
      catch(err) {
        console.log(err);
      }
      finally {
        console.log(getAPIAccessToken(process.env.CLIENT_ID, process.env.CLIENT_SECRET));
        console.log(process.env.EXPO_PUBLIC_BASE_URL);
        console.log(process.env.CLIENT_ID);
        console.log(process.env.AUTHORIZATION_ACCESS_TOKEN);
      }
    }
    getAPIData(process.env.EXPO_PUBLIC_BASE_URL, "/games", "fields name limit 10", process.env.CLIENT_ID);
  }, []);

  return (
    <View>
      <Text>{apiData}</Text>
    </View>
  )
  */
  return (
    <ScrollView>
      {GAMES.map((game) => 
      <GameCard key={game.id} game={game}>
        <LikeToggle />
        <AddButton />
      </GameCard>
      )}
    </ScrollView>
  )
}
