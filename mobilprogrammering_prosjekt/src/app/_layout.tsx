import { UserIcon } from "@/components/UserIcon";
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
      headerStyle: {
          backgroundColor: colors["brand-grey"],
      },
      headerTintColor: colors["brand-white"],
      headerRight: () => <UserIcon />,
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
      name="deleteaccountpage"
      options = {{
        title: "Delete account"
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
