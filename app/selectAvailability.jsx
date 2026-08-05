import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * SelectAvailability Screen
 *
 * Allows the user to pick an availability schedule when creating an event.
 * Uses dummy data — all functionality will be wired by the user later.
 *
 * Theme matches the rest of the app:
 *   bg-[#F8FAFC], header bg-[#4F46E5], cards rounded-[24px], etc.
 */

// ─── Dummy data ──────────────────────────────────────────────────────────────
const DUMMY_SCHEDULES = [
  {
    id: "1",
    name: "Working hours",
    days: "Mon, Wed, Fri, 9 AM – 5 PM, +1 more time",
    dateSpecific: "0 instances of date-specific hours",
  },
  {
    id: "2",
    name: "Freelance",
    days: "Mon, Tue, Wed, Thu, Fri, Sat, Sun, 9 AM – 5 PM",
    dateSpecific: "0 instances of date-specific hours",
  },
  {
    id: "3",
    name: "Maths class",
    days: "Mon, Wed, 10 AM – 12 PM",
    dateSpecific: "2 instances of date-specific hours",
  },
];

export default function SelectAvailability() {
  const router = useRouter();

  // Which schedule is currently selected (default = first one)
  const [selectedId, setSelectedId] = useState("1");

  // Confirm & go back
  const handleConfirm = () => {
    // TODO: pass selectedId back to createEvent
    router.back();
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* ── Indigo Header ───────────────────────────────────────────────── */}
      <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8 mb-6 shadow-md shadow-indigo-500/20">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center mr-4"
          >
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-[28px] font-bold text-white">Schedules</Text>
        </View>
      </View>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text className="text-[26px] font-bold text-gray-900 mb-5">
          Availability
        </Text>

        {/* Date Range Card */}
        <View className="bg-white rounded-[24px] p-5 mb-6 shadow-sm border border-gray-50">
          <Text className="text-[16px] font-bold text-gray-900 mb-1">
            Date range
          </Text>
          <Text className="text-[14px] text-gray-500 leading-snug">
            60 rolling calendar days with at least 4 hours notice.
          </Text>
        </View>

        {/* Schedules Section Label */}
        <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-4 uppercase">
          SCHEDULES
        </Text>

        {/* Schedule Cards */}
        {DUMMY_SCHEDULES.map((schedule) => {
          const isSelected = selectedId === schedule.id;

          return (
            <TouchableOpacity
              key={schedule.id}
              activeOpacity={0.7}
              onPress={() => setSelectedId(schedule.id)}
              className={`bg-white rounded-[24px] p-5 mb-4 border shadow-sm ${
                isSelected
                  ? "border-[#4F46E5] shadow-indigo-100"
                  : "border-gray-50"
              }`}
            >
              {/* Top row: name + radio */}
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-[17px] font-bold text-gray-900 flex-1 mr-3">
                  {schedule.name}
                </Text>

                {/* Radio indicator */}
                <View
                  className={`w-[22px] h-[22px] rounded-full border-2 items-center justify-center ${
                    isSelected ? "border-[#4F46E5]" : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <View className="w-[12px] h-[12px] rounded-full bg-[#4F46E5]" />
                  )}
                </View>
              </View>

              {/* Days summary */}
              <Text className="text-[14px] text-gray-500 font-medium leading-snug mb-1">
                {schedule.days}
              </Text>

              {/* Date-specific info */}
              <Text className="text-[13px] text-gray-400 mb-3">
                {schedule.dateSpecific}
              </Text>

              {/* Review link */}
              <TouchableOpacity activeOpacity={0.6}>
                <Text className="text-[14px] font-semibold text-[#4F46E5]">
                  Review and edit {schedule.name}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Sticky Confirm Button ───────────────────────────────────────── */}
      <View className="px-6 pb-8 pt-4 bg-[#F8FAFC]">
        <TouchableOpacity
          onPress={handleConfirm}
          activeOpacity={0.8}
          className="bg-[#4F46E5] rounded-[20px] py-4 shadow-lg shadow-indigo-500/30 flex-row items-center justify-center gap-x-2"
        >
          <Text className="text-white font-bold text-[17px] tracking-wide">
            Confirm Schedule
          </Text>
          <Feather name="check" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
