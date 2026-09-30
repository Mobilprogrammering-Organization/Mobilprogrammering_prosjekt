import { Color } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";


// Oppdatert (funke på ordentlig no):
// Fungerer nå sånn at når man trykker på knappen, så vil antallet "like" eller "hype" øke med 1. 
// Hvis man trykker igjen, vil tallet gå ned med 1. 
// Bare å endre på den, blir ikke lei meg om den trengs å forandres.
// Også lagt til at bakgrunnen endres dersom den er like/hype er aktive. 

export default function LikeToggle() {
  const [count, setCount] = useState(Math.floor(Math.random() * 100));
  const [activeLike, setActiveLike] = useState(false);

  function toggleLike() {
    if (activeLike) {
      setCount(count - 1);
      setActiveLike(false);
    } else {
      setCount(count + 1);
      setActiveLike(true);
    }
  }
    return (
    <View style={styles.container}>
        <Pressable onPress={toggleLike}style={[styles.container, activeLike && styles.activeContainer,
  ]}>

            <Text style={styles.text}>🔥 {count}</Text>
      
        </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
        color: "black",
        borderRadius: 10,
        borderColor: "#b1b1b0",
        borderWidth: 0.7,
        width: 70,
        
    },
    activeContainer: {
        backgroundColor: "#ffe44c",
        borderColor: "black",
    },
    text: {
        fontSize: 20,
        textAlign: "center",
    }
    
});