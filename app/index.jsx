import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/launch-screen-logo.png";
import splashImage from "../assets/images/splash-screen-image.png";

const IndexScreen = () => {
  const router = useRouter();
  const { height } = useWindowDimensions();

  // Responsive scaling based on device height (e.g. mini devices like iPhone SE vs Pro Max)
  const isSmallDevice = height < 700;

  const logoSpacing = isSmallDevice ? "my-4" : "my-10";
  const splashHeight = isSmallDevice ? 180 : 280;
  const splashMargin = isSmallDevice ? "my-3 mx-4" : "my-6 mx-8";
  
  const titleSize = isSmallDevice ? "text-[26px]" : "text-[34px]";
  const descSize = isSmallDevice ? "text-[14px]" : "text-[16px]";
  const descLineHeight = isSmallDevice ? "leading-5" : "leading-6";
  const buttonPadding = isSmallDevice ? "py-4" : "py-5";

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-between px-6 pb-6">
          {/* Logo Section */}
          <View className={`items-center ${logoSpacing}`}>
            <Image 
              className="w-[45%] h-[40px]" 
              source={logo} 
              resizeMode="contain"
            />
          </View>

          {/* Onboarding Visual */}
          <View className={`items-center justify-center rounded-3xl ${splashMargin}`}>
            <Image
              source={splashImage}
              style={{ width: "100%", height: splashHeight }}
              resizeMode="contain"
            />
          </View>

          {/* Bottom Onboarding Copy & CTA */}
          <View className="flex-1 justify-end items-center mt-2">
            <View className="w-full mb-6">
              <Text className={`${titleSize} font-extrabold text-slate-800 text-center tracking-tight`}>
                Easy Scheduling
              </Text>
              <Text className={`${descSize} ${descLineHeight} text-center font-medium text-slate-400 mt-3 px-2`}>
                The Temporal Architect of your workday. Organize your meetings
                with a curated editorial flow that breathes life into your
                calendar.
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              className={`bg-[#4F46E5] rounded-[24px] ${buttonPadding} px-6 w-full flex-row justify-center items-center shadow-lg shadow-indigo-500/30 mb-2`}
              onPress={() => router.push("/signin")}
            >
              <Text className="text-white font-bold text-[17px] tracking-wide">
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexScreen;
