import React from "react";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const AlertScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center px-6 pt-4">
          <View className="flex-row items-center">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=11" }}
              className="w-10 h-10 rounded-full bg-gray-300"
            />
            <Text className="ml-3 font-bold text-xl text-blue-600">MeetEase</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-100 shadow-sm">
            <Ionicons name="notifications" size={20} color="#1F2937" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View className="px-6 mt-8">
          <Text className="text-[36px] font-bold text-gray-900 leading-tight">
            Alerts
          </Text>
          <Text className="text-gray-500 mt-2 text-base leading-snug">
            Your temporal updates and schedule{"\n"}changes.
          </Text>
        </View>

        {/* TODAY Section */}
        <View className="px-6 mt-8">
          <Text className="text-xs font-bold tracking-widest text-gray-400 mb-4 uppercase">
            Today
          </Text>

          {/* Alert 1 - Actionable */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 mb-4">
            <View className="flex-row justify-between items-start">
              <View className="flex-row items-start flex-1">
                <View className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center mr-4">
                  <Ionicons name="calendar-outline" size={24} color="#2563EB" />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-bold text-gray-900">Meeting in 30 mins</Text>
                    <View className="bg-blue-100 px-2 py-1 rounded-md">
                      <Text className="text-blue-700 text-[9px] font-bold tracking-wider">NOW</Text>
                    </View>
                  </View>
                  <Text className="text-[13px] text-gray-500 mb-4 leading-tight">
                    Product Strategy Sync with the Design Team.
                  </Text>
                  <View className="flex-row gap-3">
                    <TouchableOpacity className="bg-blue-600 py-2.5 px-6 rounded-xl">
                      <Text className="text-white text-xs font-bold">Join Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-100 py-2.5 px-6 rounded-xl">
                      <Text className="text-gray-700 text-xs font-bold">Dismiss</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Alert 2 */}
          <View className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-start">
              <View className="flex-row items-start flex-1">
                <View className="w-12 h-12 rounded-full bg-purple-50 items-center justify-center mr-4">
                  <Ionicons name="calendar" size={24} color="#9333EA" />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-start justify-between mb-1">
                    <Text className="text-base font-bold text-gray-900 pr-2">New booking from Sarah</Text>
                    <Text className="text-[10px] font-bold text-gray-400 mt-1 whitespace-nowrap">12:45 PM</Text>
                  </View>
                  <Text className="text-[13px] text-gray-500 leading-tight">
                    1:1 Performance Review scheduled for Friday.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* YESTERDAY Section */}
        <View className="px-6 mt-8">
          <Text className="text-xs font-bold tracking-widest text-gray-400 mb-4 uppercase">
            Yesterday
          </Text>

          <View className="space-y-5 ml-2 border-l-2 border-gray-100 pl-6 relative">
            {/* Dot 1 */}
            <View className="absolute -left-[5px] top-4 w-2 h-2 rounded-full bg-gray-300" />
            <View className="mb-5">
              <View className="flex-row items-start">
                <View className="mt-1 mr-3">
                  <Ionicons name="time-outline" size={18} color="#9CA3AF" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-gray-900 mb-1">Schedule Updated</Text>
                  <Text className="text-xs text-gray-500">Design Sprint was moved to 10:00 AM.</Text>
                </View>
              </View>
            </View>

            {/* Dot 2 */}
            <View className="absolute -left-[5px] top-[76px] w-2 h-2 rounded-full bg-gray-300" />
            <View>
              <View className="flex-row items-start">
                <View className="mt-1 mr-3">
                  <Ionicons name="person-add-outline" size={18} color="#9CA3AF" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-gray-900 mb-1">New Team Invitation</Text>
                  <Text className="text-xs text-gray-500">Alex invited you to "Project Stellar".</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Promo Card */}
        <View className="px-6 mt-10">
          <View className="bg-blue-600 rounded-[28px] p-6 shadow-lg shadow-blue-600/30 overflow-hidden relative">
            {/* Background Decor */}
            <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/50 rounded-full blur-xl" />
            <View className="absolute right-4 bottom-4 opacity-20">
              <Ionicons name="pie-chart" size={100} color="white" />
            </View>

            <View className="relative z-10">
              <Text className="text-white text-[22px] font-bold mb-2">Master Your Time</Text>
              <Text className="text-blue-100 text-sm mb-6 w-2/3 leading-snug">
                Unlock advanced scheduling insights with MeetEase Pro.
              </Text>
              <TouchableOpacity className="bg-white self-start py-3 px-6 rounded-full">
                <Text className="text-blue-600 font-bold text-sm">Upgrade Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AlertScreen;
