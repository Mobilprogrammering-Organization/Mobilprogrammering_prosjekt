import { Tabs } from 'expo-router';
import { CreateAccountButton } from '@/components/CreateAccountButton';
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { colors } from '@/styles/theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: colors["brand-cyan"],
      tabBarInactiveTintColor: colors["brand-white"],
      tabBarStyle: {
        backgroundColor: colors["brand-grey"],
      },
      headerStyle: {
        backgroundColor: colors["brand-grey"],
      },
      headerTintColor: colors["brand-white"]
    }}>
      <Tabs.Screen
        name="index"
        options = {{
          title: "CheckPoint",
          headerRight: () => <CreateAccountButton />,
          tabBarIcon: ({ color, size }) => <FontAwesomeFreeSolid name="house" color={color} size={size} />,
        }}
      />
      <Tabs.Screen 
        name="mygames"
        options={{
          title: 'My Games',
          tabBarIcon: ({ color, size }) => <FontAwesomeFreeSolid name="gamepad" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="dummy"
        options={{
          title: 'Dummy page',
          tabBarIcon: ({ color, size }) => <FontAwesomeFreeSolid name="question" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
