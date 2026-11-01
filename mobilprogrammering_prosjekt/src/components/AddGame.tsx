
import { useState, useEffect } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { saveGame, 
        removeGame, 
        isGameSaved } from "@/utils/gameStorage";

export function AddButton({ gameId }: { gameId: number }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isBusy, setIsBusy] = useState(true);

  // Sjekker om spillet allerede er lagret
  useEffect(() => {
    isGameSaved(gameId)
      .then(setIsAdded)
      .catch(console.error)
      .finally(() => setIsBusy(false));
  }, [gameId]);
    
}
