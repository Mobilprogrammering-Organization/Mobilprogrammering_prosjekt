import { Tabs } from "expo-router";
import { UserIcon } from "@/components/UserIcon";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { colors } from "@/styles/theme";
import { Text } from "react-native";
import { useAuth } from "@/auth/context/AuthContext";

export default function TabLayout() {
  const { user } = useAuth();
  const validUser = user !== null && user !== undefined;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors["brand-cyan"],
        tabBarInactiveTintColor: colors["brand-white"],
        tabBarStyle: {
          backgroundColor: colors["brand-grey"],
        },
        headerStyle: {
          backgroundColor: colors["brand-grey"],
        },
        headerTintColor: colors["brand-white"],
        headerRight: () => <UserIcon />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "CheckPoint",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeFreeSolid name="house" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Protected guard={validUser}>
        <Tabs.Screen
          name="mygamespage"
          options={{
            title: "My Games",
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeFreeSolid name="gamepad" color={color} size={size} />
            ),
          }}
        />
      </Tabs.Protected>

      <Tabs.Screen
        name="articlespage"
        options={{
          title: "Articles",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeFreeSolid name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeFreeSolid name="user" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="dummy"
        options={{
          title: "Dummy page",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeFreeSolid name="question" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
