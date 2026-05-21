import { useColorScheme } from "@/hooks/use-color-scheme";

import { Stack } from "expo-router";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import "../global.css";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}