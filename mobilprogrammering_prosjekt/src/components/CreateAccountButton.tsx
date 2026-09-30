import { Text, View } from "react-native";
import { styles } from "@/styles/styles";
import { Link, useRouter } from 'expo-router';

export function CreateAccountButton() {
  const router = useRouter();

  return (
    <View>
      <Link href="/createaccountpage" style={styles.headerButton}>
        <Text>Create account</Text>
      </Link>
    </View>
  );
}
