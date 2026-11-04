import CommentSection from "./CommentSection";
import { useEffect, useState } from "react";
import Search from "./Search";import {
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { GameCard } from "./GameCard";
import { AddButton } from "./AddButton";
import LikeToggle from "./LikeToggle";
import { CLIENT_ID } from "@/constants/env_values";
import { getIGDBContent } from "@/api/igdb";
import type { Game } from "@/types/game";
import { GAMES } from "@/data/games";
import React from "react";
import { getGames } from "@/api/testApi";
import { useQuery } from "@tanstack/react-query";
import { colors } from "@/styles/theme";
import { styles } from "@/styles/styles";
import Filter from "./Filter";
import Sort from "./Sort";

const gamesFromIGDB = `
fields name, cover.image_id, genres.name, platforms.name, rating, release_dates.human, first_release_date, summary;
where rating > 80 & rating_count > 50 
& name != "Grand Theft Auto V: Special Edition" 
& name != "The Witcher 3: Wild Hunt - Game of the Year Edition";
sort rating desc;
limit 10;`;

export function GameList() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Partial<Game>[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  
   const {
    data: games,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["games", "withReleaseDate"],
    queryFn: () => getIGDBContent("games", gamesFromIGDB, CLIENT_ID ?? ""),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!games) {
        setSearchResults([]);
    
      } else {
        const filteredGames = games.filter((game) => {
          const nameMatch = game.name?.toLowerCase().includes(search.toLowerCase());
          const genreMatch = game.genres?.some((genre) => genre.name?.toLowerCase().includes(search.toLowerCase()));

          const filterMatch = selectedFilter === "All" || game.name === selectedFilter || game.genres?.some((genre) => genre.name === selectedFilter);
return (nameMatch || genreMatch) && filterMatch;        });
        const sortedGames = filteredGames.sort((a, b) => {
          if (sortBy === "rating") {
            return (b.rating ?? 0) - (a.rating ?? 0);
          }
          else if (sortBy === "name") {
            return (a.name ?? "").localeCompare(b.name ?? "");
          }
           else if (sortBy === "release_dates") {
            return (b.first_release_date ?? 0) - (a.first_release_date ?? 0);
          }
          return 0;
        });
        setSearchResults(sortedGames);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, games, selectedFilter, sortBy]);
  //Tanstack:
 

  return (
    <ScrollView>
      <Search search={search} onSearch={setSearch} />
      <Filter selectedFilter={selectedFilter} onselectFilter={setSelectedFilter} />
  <Sort sortBy={sortBy} onSortChange={setSortBy} />
      {isLoading ? (
        <ActivityIndicator size="large" color={colors["brand-black"]} />
      ) : isError ? (
        <Text>Something went wrong when fetching games...</Text>
      ) : games ? (
        searchResults.map((game) => (          <GameCard key={game.id} game={game}>
            <LikeToggle />
            <CommentSection />
            <AddButton />
          </GameCard>
        ))
      ) : (
        <Text>No games could be found.</Text>
      )}
    </ScrollView>
  );
}
