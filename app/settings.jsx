import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity, Image, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const [googleSync, setGoogleSync] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
        <View className="px-6 mt-8 mb-8">
          <Text className="text-[36px] font-bold text-gray-900 leading-tight">
            Settings
          </Text>
          <Text className="text-gray-500 mt-2 text-[13px] pr-8">
            Manage your temporal architecture and workspace preferences.
          </Text>
        </View>

        {/* ACCOUNT */}
        <View className="px-6 mb-8">
          <Text className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">
            Account
          </Text>
          <View className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            {/* Profile */}
            <TouchableOpacity className="flex-row items-center p-4 border-b border-gray-50">
              <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-4">
                <Ionicons name="person" size={18} color="#2563EB" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-gray-900 mb-0.5">Profile</Text>
                <Text className="text-[11px] text-gray-500">Personal info and contact details</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Availability */}
            <TouchableOpacity className="flex-row items-center p-4">
              <View className="w-10 h-10 rounded-full bg-purple-50 items-center justify-center mr-4">
                <Ionicons name="time" size={18} color="#9333EA" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-gray-900 mb-0.5">Availability</Text>
                <Text className="text-[11px] text-gray-500">Set your working hours and buffers</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* INTEGRATIONS */}
        <View className="px-6 mb-8">
          <Text className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">
            Integrations
          </Text>
          <View className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            <View className="flex-row items-center p-4">
              <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mr-4">
                <MaterialCommunityIcons name="google" size={18} color="#EA4335" />
              </View>
              <View className="flex-1 pr-4">
                <Text className="text-sm font-bold text-gray-900 mb-0.5">Google Calendar</Text>
                <Text className="text-[11px] text-gray-500">Sync events and check conflicts</Text>
              </View>
              <Switch
                value={googleSync}
                onValueChange={setGoogleSync}
                trackColor={{ false: "#E5E7EB", true: "#2563EB" }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* PREFERENCES */}
        <View className="px-6 mb-8">
          <Text className="text-[10px] font-bold tracking-widest text-gray-400 mb-4 uppercase">
            Preferences
          </Text>
          <View className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            {/* Dark Mode */}
            <View className="flex-row items-center p-4 border-b border-gray-50">
              <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-4">
                <Ionicons name="moon" size={18} color="#4B5563" />
              </View>
              <View className="flex-1 pr-4">
                <Text className="text-sm font-bold text-gray-900 mb-0.5">Dark Mode</Text>
                <Text className="text-[11px] text-gray-500">Reduce eye strain in low light</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#E5E7EB", true: "#2563EB" }}
                thumbColor="#FFFFFF"
              />
            </View>

            {/* Notifications */}
            <TouchableOpacity className="flex-row items-center p-4">
              <View className="w-10 h-10 rounded-full bg-teal-50 items-center justify-center mr-4">
                <Ionicons name="notifications" size={18} color="#0D9488" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-gray-900 mb-0.5">Notifications</Text>
                <Text className="text-[11px] text-gray-500">Email, Push and SMS alerts</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <View className="px-6 mb-8">
          <TouchableOpacity className="bg-red-50 rounded-[20px] p-4 flex-row items-center justify-center border border-red-100">
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text className="text-red-600 font-bold ml-2">Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Promo Card */}
        <View className="px-6 mb-6">
          <View className="bg-[#4338CA] rounded-[28px] p-6 shadow-lg shadow-indigo-600/30 overflow-hidden relative">
            <View className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/50 rounded-bl-[100px] blur-2xl" />
            
            <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-4">
              <Text className="text-white text-[9px] font-bold tracking-widest uppercase">Premium Elite</Text>
            </View>
            <Text className="text-white text-xl font-bold mb-2">Architect Your Time</Text>
            <Text className="text-indigo-100 text-[13px] mb-6 w-3/4 leading-snug">
              Unlock priority scheduling and AI-driven conflict resolution.
            </Text>
            <TouchableOpacity className="bg-white self-start py-3 px-6 rounded-full shadow-sm">
              <Text className="text-indigo-600 font-bold text-xs tracking-wide">Upgrade Now</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
