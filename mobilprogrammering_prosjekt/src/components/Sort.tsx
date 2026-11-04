import { View, Text,  Pressable } from "react-native";

type SortProps = {
    sortBy: string;
    onSortChange: (sort: string) => void;
};

export default function Sort({ sortBy, onSortChange }: SortProps) {
    const options = {
        labels: ["Rating", "Release Date", "Name"],
        values: ["rating", "release_dates", "name"],
    };

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10 }}>
            {options.labels.map((label, index) => (
                <Pressable
                    key={label}
                    onPress={() => onSortChange(options.values[index])}
                    style={{
                        padding: 10,
                        backgroundColor: sortBy === options.values[index] ? "#00e5d0" : "#f0f0f0",
                        borderRadius: 5,
                    }}
                >
                    <Text style={{ color: sortBy === options.values[index] ? "#fff" : "#000" }}>
                        {label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );

    }