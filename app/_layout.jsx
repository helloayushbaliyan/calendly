import { useColorScheme } from "@/hooks/use-color-scheme";

import { Stack } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Provider } from "react-redux";
import "../global.css";
import store from "../store/store";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="createEvent" />
            <Stack.Screen name="createContact" />
            <Stack.Screen name="events" />
            <Stack.Screen name="meetingDetails" />
            <Stack.Screen name="contactDetails" />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}