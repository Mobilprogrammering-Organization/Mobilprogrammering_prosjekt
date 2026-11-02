import { UserIcon } from "@/components/UserIcon";
import { QueryClientProvider } from "@/auth/context/QueryProvider";
import { styles } from "@/styles/styles";
import { colors } from "@/styles/theme";
import { Stack, useRouter } from "expo-router";
import { ActivityIndicator, Image, Text } from "react-native";
import { AuthProvider, useAuth } from "@/auth/context/AuthContext";

export default function LayoutWithProviders() {
  return (
    <AuthProvider randomNumbers={[]}>
      <QueryClientProvider>
        <RootLayout />
      </QueryClientProvider>
    </AuthProvider>
  );
}

function RootLayout() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const validUser = user !== null && user !== undefined;

  //Viser loading ikon hvis bruker fra SecureStore ikke er lastet inn enda.
  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={colors["brand-black"]}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors["brand-grey"],
        },
        headerTintColor: colors["brand-white"],
        headerRight: () => <UserIcon />,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="gamepage"
        options={{
          title: "Game page",
        }}
      />
      <Stack.Screen
        name="articlepage"
        options={{
          title: "Article page",
        }}
      />

      <Stack.Protected guard={!validUser}>
        <Stack.Screen
          name="loginpage"
          options={{
            title: "Login",
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!validUser}>
        <Stack.Screen
          name="createaccountpage"
          options={{
            title: "Create user",
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={validUser}>
        <Stack.Screen
          name="userpage"
          options={{
            title: "User page",
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={validUser}>
        <Stack.Screen
          name="changepasswordpage"
          options={{
            title: "Change password",
          }}
        />
      </Stack.Protected>
      <Stack.Protected guard={validUser}>
        <Stack.Screen
          name="deleteaccountpage"
          options={{
            title: "Delete account",
          }}
        />
      </Stack.Protected>
    </Stack>
  );
}
