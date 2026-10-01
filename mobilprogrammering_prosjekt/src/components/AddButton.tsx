import { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export function AddButton() {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <Pressable style={isAdded ? styles.removeButton : styles.addButton} onPress={() => setIsAdded(!isAdded)}>
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
    backgroundColor: "green",
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