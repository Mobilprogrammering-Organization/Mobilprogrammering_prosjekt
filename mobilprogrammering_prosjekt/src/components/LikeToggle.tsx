import { Color } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable, useWindowDimensions } from "react-native";


// Oppdatert (funker på ordentlig nå):
// Fungerer nå sånn at når man trykker på knappen, så vil antallet "like" eller "hype" øke med 1. 
// Hvis man trykker igjen, vil tallet gå ned med 1. 
// Bare å endre på den, blir ikke lei meg om den trengs å forandres.
// Også lagt til at bakgrunnen endres dersom den er like/hype er aktive. 

export default function LikeToggle() {
  const {width} = useWindowDimensions();
  const [count, setCount] = useState(Math.floor(Math.random() * 100));
  const [activeLike, setActiveLike] = useState(false);


  // Sjekk om det er tlf eller tablet mtp. skjerm-orientering.
  const isTablet = width > 550; 



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
        <Pressable onPress={toggleLike}style={[styles.container, 
                                                activeLike && styles.activeContainer, 
                                                activeLike && isTablet && styles.activeContainer_tablet,
  ]}>

            <Text style={[styles.text, isTablet && styles.text_tablet]}>🔥 {count}</Text>
      
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
    
    // Telefon CSS - Like aktivert (altså setActiveLike = true)
    activeContainer: {
        backgroundColor: "#ffe44c",
        borderColor: "black",
    },
    
    
    // Tablet CSS - Like aktivert (altså setActiveLike = true)
    activeContainer_tablet: {
        backgroundColor: "#c80d9c",
        borderColor: "black",
    },

    // Telefon tekst CSS 
    text: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "Arial",
    },
    
    // Tablet tekst CSS
    text_tablet:{
      fontSize: 24,
        textAlign: "center",
        fontFamily: "Lucida Console ",
    }
});