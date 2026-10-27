import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "@/styles/styles";
import { useState } from "react";

const API_USERS_URL = "http://10.0.0.2:5173/api/v1/users";

export default function users() {
  const [users, setUsers] = useState("Loading...");

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(API_USERS_URL);
        const data = await response.json();
        setUsers(JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
      }
    }
    getUsers();
  }, []);

  return (
    <View style={styles.loading}>
      <React.Suspense fallback={<ActivityIndicator />}>
        <Text style={styles.mainText}>{users}</Text>
      </React.Suspense>
    </View>
  );
}
