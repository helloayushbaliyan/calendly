import React from "react";
import { ScrollView, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const BookingsScreen = () => {
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
            <Ionicons name="notifications-outline" size={20} color="#1F2937" />
            <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View className="px-6 mt-8 mb-6">
          <Text className="text-[36px] font-bold text-gray-900 leading-tight">
            Bookings
          </Text>
          <Text className="text-gray-500 mt-2 text-[13px] pr-8">
            Managing your professional temporal landscape.
          </Text>
        </View>

        {/* Segmented Control */}
        <View className="px-6 mb-8">
          <View className="flex-row items-center bg-gray-100/50 rounded-full p-1.5">
            <TouchableOpacity className="flex-1 bg-blue-600 py-2.5 rounded-full items-center shadow-sm shadow-blue-600/30">
              <Text className="text-white text-xs font-bold">All</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 py-2.5 rounded-full items-center">
              <Text className="text-gray-500 text-xs font-bold">Upcoming</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 py-2.5 rounded-full items-center">
              <Text className="text-gray-500 text-xs font-bold">Completed</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* UPCOMING JOURNEY */}
        <View className="px-6 mb-8">
          <Text className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">
            Upcoming Journey
          </Text>

          <View className="space-y-4">
            {/* Booking 1 */}
            <View className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
              <View className="flex-row items-start mb-4">
                <View className="w-12 h-12 rounded-2xl bg-blue-50 items-center justify-center mr-4">
                  <Ionicons name="calendar-outline" size={22} color="#2563EB" />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-bold text-gray-900">Alexander Vance</Text>
                    <View className="bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                      <Text className="text-blue-600 text-[9px] font-bold tracking-wider">UPCOMING</Text>
                    </View>
                  </View>
                  <Text className="text-xs text-gray-500">Strategy Consultation</Text>
                </View>
              </View>
              <View className="flex-row items-center pt-4 border-t border-gray-50">
                <View className="flex-row items-center flex-1">
                  <Ionicons name="calendar" size={14} color="#9CA3AF" />
                  <Text className="text-xs font-bold text-gray-700 ml-2">Oct 24, 2023</Text>
                </View>
                <View className="flex-row items-center flex-1">
                  <Ionicons name="time-outline" size={16} color="#9CA3AF" />
                  <Text className="text-xs font-bold text-gray-700 ml-2">10:00 AM - 11:30 AM</Text>
                </View>
              </View>
            </View>

            {/* Booking 2 */}
            <View className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100">
              <View className="flex-row items-start mb-4">
                <View className="w-12 h-12 rounded-2xl bg-purple-50 items-center justify-center mr-4">
                  <Ionicons name="videocam-outline" size={24} color="#9333EA" />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-bold text-gray-900">Elena Rodriguez</Text>
                    <View className="bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                      <Text className="text-blue-600 text-[9px] font-bold tracking-wider">UPCOMING</Text>
                    </View>
                  </View>
                  <Text className="text-xs text-gray-500">Portfolio Review</Text>
                </View>
              </View>
              <View className="flex-row items-center pt-4 border-t border-gray-50">
                <View className="flex-row items-center flex-1">
                  <Ionicons name="calendar" size={14} color="#9CA3AF" />
                  <Text className="text-xs font-bold text-gray-700 ml-2">Oct 25, 2023</Text>
                </View>
                <View className="flex-row items-center flex-1">
                  <Ionicons name="time-outline" size={16} color="#9CA3AF" />
                  <Text className="text-xs font-bold text-gray-700 ml-2">02:30 PM - 03:30 PM</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ARCHIVED MOMENTS */}
        <View className="px-6 mb-8">
          <Text className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">
            Archived Moments
          </Text>

          <View className="space-y-4">
            {/* Booking 3 */}
            <View className="bg-gray-50 rounded-[24px] p-5 border border-gray-100">
              <View className="flex-row items-start mb-4">
                <View className="w-12 h-12 rounded-2xl bg-gray-200 items-center justify-center mr-4">
                  <Ionicons name="checkmark-circle" size={24} color="#6B7280" />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-bold text-gray-600">Marcus Thorne</Text>
                    <View className="bg-gray-200 px-2 py-1 rounded-md">
                      <Text className="text-gray-500 text-[9px] font-bold tracking-wider">COMPLETED</Text>
                    </View>
                  </View>
                  <Text className="text-xs text-gray-400">Discovery Session</Text>
                </View>
              </View>
              <View className="flex-row items-center pt-4 border-t border-gray-200">
                <View className="flex-row items-center flex-1">
                  <Ionicons name="calendar" size={14} color="#9CA3AF" />
                  <Text className="text-xs font-bold text-gray-500 ml-2">Oct 20, 2023</Text>
                </View>
                <View className="flex-row items-center flex-1">
                  <Ionicons name="time-outline" size={16} color="#9CA3AF" />
                  <Text className="text-xs font-bold text-gray-500 ml-2">09:00 AM</Text>
                </View>
              </View>
            </View>

            {/* Booking 4 */}
            <View className="bg-gray-50 rounded-[24px] p-5 border border-gray-100">
              <View className="flex-row items-start mb-4">
                <View className="w-12 h-12 rounded-2xl bg-gray-200 items-center justify-center mr-4">
                  <Ionicons name="checkmark-circle" size={24} color="#6B7280" />
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-base font-bold text-gray-600">Sarah Jenkins</Text>
                    <View className="bg-gray-200 px-2 py-1 rounded-md">
                      <Text className="text-gray-500 text-[9px] font-bold tracking-wider">COMPLETED</Text>
                    </View>
                  </View>
                  <Text className="text-xs text-gray-400">Monthly Retrospective</Text>
                </View>
              </View>
              <View className="flex-row items-center pt-4 border-t border-gray-200">
                <View className="flex-row items-center flex-1">
                  <Ionicons name="calendar" size={14} color="#9CA3AF" />
                  <Text className="text-xs font-bold text-gray-500 ml-2">Oct 19, 2023</Text>
                </View>
                <View className="flex-row items-center flex-1">
                  <Ionicons name="time-outline" size={16} color="#9CA3AF" />
                  <Text className="text-xs font-bold text-gray-500 ml-2">04:00 PM</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default BookingsScreen;
