import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function AvailabilityScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Premium Indigo Header */}
      <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8 mb-6 shadow-md shadow-indigo-500/20">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center mr-4"
          >
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-[28px] font-bold text-white">Availability</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Schedules Section */}
        <View className="mb-6">
          <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-4 uppercase">
            SCHEDULES
          </Text>

          {/* Single Static Availability Card */}
          <View className="bg-white rounded-[24px] p-5 mb-4 border border-gray-50 shadow-sm flex-row justify-between items-center">
            <TouchableOpacity
              onPress={() => router.push("/createSchedule")}
              activeOpacity={0.7}
              className="flex-1 pr-4"
            >
              <View className="flex-row items-center mb-1">
                <Text className="text-gray-900 text-lg font-bold mr-2">Working hours</Text>
                <Feather name="star" size={16} color="#FBBF24" fill="#FBBF24" />
              </View>
              <Text className="text-gray-500 text-sm leading-snug">Mon, Tue, Wed, Thu, Fri, 9:00am - 5:00pm</Text>
            </TouchableOpacity>

            {/* Static Action Button */}
            <TouchableOpacity
              activeOpacity={0.7}
              className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
            >
              <Feather name="more-vertical" size={18} color="#4B5563" />
            </TouchableOpacity>
          </View>

          {/* Create New Schedule Button */}
          <TouchableOpacity
            onPress={() => router.push("/createSchedule")}
            activeOpacity={0.7}
            className="border-2 border-dashed border-gray-200 rounded-[24px] p-5 mb-4 items-center justify-center bg-transparent active:bg-gray-50"
          >
            <Text className="text-[#4F46E5] text-base font-bold">Create new schedule</Text>
          </TouchableOpacity>

          {/* Event Types Subtitle */}
          <Text className="text-[#4F46E5] text-sm font-semibold mb-6">
            2 event types use custom schedules
          </Text>
        </View>

        {/* Global Settings Section */}
        <View>
          <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-4 uppercase">
            GLOBAL SETTINGS
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-white rounded-[24px] p-5 border border-gray-50 shadow-sm"
          >
            <Text className="text-gray-900 text-lg font-bold mb-1">Holidays</Text>
            <Text className="text-gray-500 text-sm mb-3 leading-snug">
              Block your availability for national holidays across all your event types
            </Text>
            <Text className="text-gray-400 text-xs font-semibold">0 holidays</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
