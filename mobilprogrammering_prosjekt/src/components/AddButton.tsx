import { useState, useEffect } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { saveGame, removeGame, isGameSaved } from "@/utils/gameStorage";

export function AddButton({ gameId }: { gameId: number }) {
  
  const [isAdded, setIsAdded] = useState(false);
  const [isBusy, setIsBusy] = useState(true);

  // Sjekke om spillet allerede er lagret
  useEffect(() => {
    isGameSaved(gameId)
      .then(setIsAdded)
      .catch(console.error)
      .finally(() => setIsBusy(false));
  }, [gameId]);

  // Legger til eller fjerner spillet
  const handlePress = async () => {
    setIsBusy(true);

    try {
      const saved = await isGameSaved(gameId);

      if (saved) {
        await removeGame(gameId);
        setIsAdded(false);
      } else {
        await saveGame(gameId);
        setIsAdded(true);
      }
    } catch (error) {
      console.error("Kunne ikke oppdatere spill-listen:", error);
    } finally {
      setIsBusy(false);
    }
  };


  return (
    <Pressable style={isAdded ? styles.removeButton : styles.addButton} onPress={(handlePress)} disabled={isBusy}>
      <Text style={styles.buttonText}>
        {isAdded ? "Remove game from game list." : "Add game to game list."}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#00E5D0",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "black",
  },
  removeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    borderWidth: 3,
    borderColor: "black",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
})