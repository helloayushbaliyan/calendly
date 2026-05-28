import { useColorScheme } from "@/hooks/use-color-scheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import "../global.css";
import { getCurrentSession } from "../lib/services/authService";
import { login, logout } from "../store/authSlice";
import store from "../store/store";

function AppLayoutInner() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const segments = useSegments();
  const router = useRouter();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const session = await getCurrentSession();
      if (session) {
        dispatch(login({ session, user: session.user }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      console.log("Error getting current user: ", error);
      dispatch(logout());
    }
  };

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isLandingPage = segments.length === 0 || segments[0] === "index" || segments[0] === "";

    if (isAuthenticated) {
      if (inAuthGroup || isLandingPage) {
        router.replace("/home");
      }
    } else {
      if (!inAuthGroup && !isLandingPage) {
        router.replace("/signin");
      }
    }
  }, [isAuthenticated, segments, isLoading]);

  console.log("Auth state => ", isAuthenticated, "Loading => ", isLoading);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5F7FB" }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="createEvent" />
          <Stack.Screen name="createContact" />
          <Stack.Screen name="events" />
          <Stack.Screen name="meetingDetails" />
          <Stack.Screen name="contactDetails" />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default function TabLayout() {
  return (
    <Provider store={store}>
      <AppLayoutInner />
    </Provider>
  );
}