import { Tabs } from 'expo-router';
import { CreateAccountButton } from '@/components/CreateAccountButton';
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
    }}>
      <Tabs.Screen
        name="index"
        options = {{
          title: "Home",
          headerRight: () => <CreateAccountButton />,
          tabBarIcon: ({ color, size }) => <FontAwesomeFreeSolid name="house" color={color} size={size} />,
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
