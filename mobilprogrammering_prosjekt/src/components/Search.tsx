import { TextInput, StyleSheet} from "react-native";

type serchProps = {
  search: string;
  onSearch: (text: string) => void;

};

export default function Search({ search, onSearch }: serchProps) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search for a game"
      value={search}
      autoCorrect={false}      autoCapitalize="none"
      onChangeText={onSearch}
    />
  );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});
