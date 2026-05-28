import { useColorScheme } from "@/hooks/use-color-scheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import "../global.css";
import { getCurrentSession } from "../lib/services/authService";
import { login, logout } from "../store/authSlice";
import store from "../store/store";

function AppLayoutInner() {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser()
  }, [])


  const getCurrentUser = async () => {
    const { data, error } = await getCurrentSession()
    if (data?.session) {
      dispatch(login({ session: data.session, user: data.session.user }))
    }
    else {
      dispatch(logout())
    }

  }


  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  console.log("Auth state => ", isAuthenticated);

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