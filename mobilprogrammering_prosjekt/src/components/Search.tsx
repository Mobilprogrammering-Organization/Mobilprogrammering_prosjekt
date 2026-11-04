import { View, TextInput, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  function submitSearch() {
    router.push({
      pathname: "/searchpage",
      params: { query: searchQuery.replace(/["\\]/g, "").trim() },
    });
  }

  return (
    <View style={styles.searchContainer}>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={submitSearch}
        returnKeyType="search"
        placeholder="Search for games..."
        style={styles.searchInput}
      />
      <Button title="Search" onPress={submitSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
