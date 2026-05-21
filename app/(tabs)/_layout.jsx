import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Entypo } from "@expo/vector-icons";
// 1. Change this to a wildcard import as recommended by Expo
import * as NavigationBar from "expo-navigation-bar";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react"; // Add this hook

import QuickActionsSheet from "../../components/QuickActionsSheet";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";
import "../../global.css";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const visibility = NavigationBar.useVisibility();
  const bottomSheetRef = useRef(null);


  // 2. Set the navigation bar styling imperatively instead of using JSX
  useEffect(() => {
    // Sets the navigation bar icons to dark or light manually
    NavigationBar.setStyle("dark");
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  }

  return (

    <>
      <StatusBar style="light" />
      {/* 3. REMOVED: <NavigationBar style="dark" /> is gone from here */}

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
              colorScheme === "dark"
                ? Colors[colorScheme].background
                : "#F8FAFC",
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
              <Entypo name="briefcase" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="quickActions"
          options={{
            title: "Bookings",
            tabBarButton: (props) => (
              <TouchableOpacity
                {...props}
                onPress={openBottomSheet}
                style={[props.style, { justifyContent: "center", alignItems: "center" }]}
              >
                <Entypo
                  name="plus"
                  size={28}
                  color={props.accessibilityState?.selected ? "#1D4ED8" : "#94A3B8"}
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Tabs.Screen
          name="contacts"
          options={{
            title: "=Contacts",
            tabBarIcon: ({ color }) => (
              <Entypo name="users" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="alert"
          options={{
            title: "Alert",
            tabBarIcon: ({ color }) => (
              <Entypo name="bell" size={24} color={color} />
            ),
          }}
        />
      </Tabs>

      <QuickActionsSheet ref={bottomSheetRef} />
    </>
  );
}
