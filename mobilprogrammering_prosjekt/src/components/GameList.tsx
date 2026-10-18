import CommentSection from "./CommentSection";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions
} from "react-native";
import { GameCard } from "./GameCard";
import { AddButton } from "./AddButton";
import LikeToggle from "./LikeToggle";
import { CLIENTID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import type { Game } from "@/types/game";
import { GAMES } from "@/data/games";
import React from "react";
import { getGames } from "@/api/testApi";
import { useQuery } from "@tanstack/react-query";
import { colors } from "@/styles/theme";

const gamesFromIGDB = `
fields name, cover.image_id, genres.name, rating, first_release_date, summary;
where rating > 80 & rating_count > 50;
sort rating desc;
limit 10;`;

export function GameList() {
  /* Innhenting fra IGDB
  const games: Partial<Game>[] = await getIGDBContent(
    "games",
    gamesFromIGDB,
    CLIENTID,
  );
  */

  /* Innhenting av data med useEffect
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    getGames().then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);
  */

  //Tanstack:
  const {data: games = [], isLoading, isError } = useQuery({
    queryKey: ['games'],
    queryFn: getGames
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color={colors["brand-black"]} />
      </View>
    )
  }

  if (isError) {
    return <Text>Noe gikk galt under henting av spill...</Text>
  }

  return (
   /* Render fra statiske data
    <ScrollView>
      {GAMES.map((game) => (
        <GameCard key={game.id} game={game}>
          <LikeToggle />
          <CommentSection />
          <AddButton />
        </GameCard>
      ))}
    </ScrollView>
    */

    /* Render med useEffect
    <ScrollView>
            {data.map((game:any) => (
        <GameCard key={game.id} game={game}>
          <LikeToggle />
          <CommentSection />
          <AddButton />
        </GameCard>
        ))}
    </ScrollView>
    */

    //Tanstack-return:
        <ScrollView>
            {games.map((game) => (
        <GameCard key={game.id} game={game}>
          <LikeToggle />
          <CommentSection />
          <AddButton />
        </GameCard>
        ))}
    </ScrollView>    


  );
}
