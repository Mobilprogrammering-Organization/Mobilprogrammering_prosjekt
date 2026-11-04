import { Text, Pressable, View, StyleSheet } from "react-native";

type FilterProps = {
    selectedFilter: string;
    onselectFilter: (filter: string) => void;

};

export default function Filter({ selectedFilter, onselectFilter }: FilterProps) {
    const filters = ["All", "Action", "Adventure", "RPG", "Strategy", "Sports", "Simulation", "Puzzle", "Shooter", "Fighting", "Platformer", "Racing", "Horror", "MMO"];

    return (
        <View style={styles.container}>
            {filters.map((filter) => (
                <Pressable
                    key={filter}
                    onPress={() => onselectFilter(filter)}
                    style={[
                        styles.filterButton,
                        selectedFilter === filter && styles.selectedFilterButton
                    ]}
                >
                    <Text style={[
                        styles.filterText,
                        selectedFilter === filter && styles.selectedFilterText
                    ]}>
                        {filter}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    
  },
  filterButton: {},
  selectedFilterButton: {},
  filterText: {},
  selectedFilterText: {},
});
