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
        headerShown: false,
        tabBarActiveTintColor: "#1D4ED8",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarItemStyle: {
          marginVertical: 16,
          borderRadius: 17,
          overflow: "hidden",
        },
        tabBarActiveBackgroundColor: "#eee7fc",
        tabBarStyle: {
          backgroundColor:
            colorScheme === "dark" ? Colors[colorScheme].background : "#F8FAFC",
          height: 100,
          borderRadius: 17,
          paddingHorizontal: 12,
          paddingBottom: 6,
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
          title: "Calendar",
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
        name="alert"
        options={{
          title: "Alerts",
          tabBarIcon: ({ color }) => (
            <Entypo name="bell" size={24} color={color} />
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
