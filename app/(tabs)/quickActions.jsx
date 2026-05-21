import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * QuickActions Screen Placeholder
 * 
 * Expo Router requires a physical file in the app/(tabs) directory with a default export
 * in order to register and render the "Bookings" tab in your Tab Navigator.
 * 
 * Since our layout file customizes the "+" tab button to open our premium Bottom Sheet
 * and cancels the default tab navigation click, this screen is never actually opened.
 * However, we must keep this clean placeholder here to satisfy Expo Router's file routing.
 */
const QuickActions = () => {
  return (
    <SafeAreaView className="flex-1 bg-white justify-center items-center">
      <Text className="text-gray-500 font-medium">Quick Actions Tab Screen</Text>
    </SafeAreaView>
  );
};

export default QuickActions;
