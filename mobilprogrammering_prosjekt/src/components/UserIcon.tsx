import { View } from "react-native";
import { styles } from "@/styles/styles";
import { Link, useRouter } from 'expo-router';
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";

export function UserIcon() {
  const router = useRouter();

  return (
    <View>
      <Link href="/createaccountpage" style={styles.headerButton}>
        <FontAwesomeFreeSolid name="user" color="white" size={24} />
      </Link>
    </View>
  );
}
