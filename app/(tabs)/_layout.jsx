import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Entypo } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import "../../global.css";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].background,
          paddingBottom: 16,
          height: 75,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calender"
        options={{
          title: "Calender",
          tabBarIcon: ({ color }) => (
            <Entypo name="calendar" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color }) => (
            <Entypo name="briefcase" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Entypo name="cog" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
