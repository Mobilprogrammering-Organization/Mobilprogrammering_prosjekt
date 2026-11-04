import { useEffect, useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useAuth } from "@/auth/context/AuthContext";
import { styles } from "@/styles/styles";

type AddButtonProps = {
  gameID: string | undefined;
};

export function AddButton({ gameID }: AddButtonProps) {
  const { user, gameIDs, addGameID, removeGameID } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [hasGameInLibrary, setHasGameInLibrary] = useState(false);

  useEffect(() => {
    const hasGame = () => {
      if (!gameID) return false;
      return gameIDs.includes(gameID);
    };
    setHasGameInLibrary(hasGame());
  }, [gameID, gameIDs, addGameID, removeGameID]);

  return user ? (
    <Pressable
      style={hasGameInLibrary ? styles.successButton : styles.removeButton}
      onPress={() => {
        setIsSaving(true);
        if (user && gameID) {
          if (hasGameInLibrary) {
            removeGameID(gameID);
          } else if (!gameIDs.includes(gameID)) {
            addGameID(gameID);
          }
        }
        setIsSaving(false);
      }}
    >
      <Text style={styles.buttonText}>
        {isSaving
          ? "Saving..."
          : hasGameInLibrary
            ? "In library"
            : "Add to your game library"}
      </Text>
    </Pressable>
  ) : null;
}
