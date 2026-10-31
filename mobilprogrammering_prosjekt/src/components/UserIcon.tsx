import { View } from "react-native";
import { useAuth } from "@/auth/context/AuthContext";
import { styles } from "@/styles/styles";
import { Link, useRouter } from "expo-router";
import FontAwesomeFreeSolid from "@react-native-vector-icons/fontawesome-free-solid";

export function UserIcon() {
  const { user } = useAuth();

  return (
    <View>
      {user ? (
        <Link href="/userpage" style={styles.headerButton}>
          <FontAwesomeFreeSolid name="user" color="white" size={24} />
        </Link>
      ) : (
        <Link href="/loginpage" style={styles.headerButton}>
          <FontAwesomeFreeSolid name="tree" color="white" size={24} />
        </Link>
      )}
    </View>
  );
}
