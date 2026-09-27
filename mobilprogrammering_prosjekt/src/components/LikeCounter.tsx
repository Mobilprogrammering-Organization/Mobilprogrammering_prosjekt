import { Color } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";




export default function LikeCounter() {
  const [count, setCount] = useState(Math.floor(Math.random() * 100));
    return (
    <View style={styles.container}>
        <Pressable
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.text}>(klikkbar) 🔥 {count}</Text>
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
        backgroundColor: "#ffe44c",
        color: "black",
        borderRadius: 10,
        borderColor: "black",
        borderWidth: 0.7,
        width: 150,
        
    },
    text: {
        fontSize: 20,
        textAlign: "center",
    }
    
});