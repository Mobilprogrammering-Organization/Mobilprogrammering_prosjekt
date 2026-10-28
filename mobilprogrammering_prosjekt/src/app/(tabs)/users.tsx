import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Platform,
  FlatList,
} from "react-native";
import { styles } from "@/styles/styles";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { colors } from "@/styles/theme";
import type { Result } from "@/shared/result";

const HOST = Platform.OS === "android" ? "10.0.2.2" : "localhost";
export const API_USERS_URL = `http://${HOST}:5173/api/v1/users`;

async function getUsers(): Promise<User[]> {
  const response = await fetch(API_USERS_URL);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export default function Users() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[] | Error>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <View style={styles.loading}>
      {isLoading ? (
        <ActivityIndicator size="large" color={colors["brand-black"]} />
      ) : isError ? (
        <Text style={styles.mainText}>Failed to load users...</Text>
      ) : (
        <>
          <Text style={styles.mainText}>Users:</Text>
          <FlatList
            data={users as User[]}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Text style={styles.listText}>{item.email}</Text>
            )}
          />
        </>
      )}
    </View>
  );
}
