import { useColorScheme } from "@/hooks/use-color-scheme";
import { Stack } from "expo-router";
import "../global.css";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
