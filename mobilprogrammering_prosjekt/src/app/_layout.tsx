import { CreateAccountButton } from "@/components/CreateAccountButton";
import { styles } from "@/styles/styles";
import { colors } from "@/styles/theme";
import { Stack, useRouter } from "expo-router";
import { Image, Text } from "react-native";
//import checkpoint from "../../assets/images/checkpoint/checkpoint.png";

function CheckpointLogo() {
  //return <Image style={{ width: 50, height: 50 }} source={checkpoint} />;
}

export default function RootLayout() {
  const router = useRouter(); 

  return <Stack
    screenOptions={{
      headerTitle: () => <Text >CheckPoint</Text>,
    }}
  >
    <Stack.Screen 
      name="(tabs)" 
      options={{ headerShown: false }} 
    /> 
    <Stack.Screen 
      name="userpage"
      options = {{
        title: "User page",
      }}
    />
    <Stack.Screen 
      name="createaccountpage"
      options = {{
        title: "Create user"
      }}
    />
    <Stack.Screen 
      name="changepasswordpage"
      options = {{
        title: "Change password"
      }}
    />
    <Stack.Screen 
      name="selectuser"
      options = {{
        title: "Select user"
      }}
    />
  </Stack>;
}
