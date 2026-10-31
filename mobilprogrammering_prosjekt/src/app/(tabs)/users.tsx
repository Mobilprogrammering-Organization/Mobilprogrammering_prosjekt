//Claude chatlog explaining how to extract data from local API responses
//https://claude.ai/share/f407f04f-7e44-411d-9697-0560aad4c596

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
import { listUsers } from "@/api/user-api";

export default function Users() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery<User[] | Error>({
    queryKey: ["users"],
    queryFn: listUsers,
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
