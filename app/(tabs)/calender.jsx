import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

const CalenderScreen = () => {
  const [selected, setSelected] = useState("2023-09-13"); // based on screenshot

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
          </View>
          <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center border border-gray-100 shadow-sm">
            <Ionicons name="notifications-outline" size={20} color="#1F2937" />
            <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </TouchableOpacity>
        </View>

        {/* Greeting/Title */}
        <View className="px-6 mt-8">
          <Text className="text-[40px] font-bold text-gray-900 leading-tight">
            September
          </Text>
          <Text className="text-gray-500 mt-2 text-base">
            You have 4 meetings scheduled for today.
          </Text>
        </View>

        {/* Calendar Card */}
        <View className="px-6 mt-8">
          <View className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-100 overflow-hidden">
            <Calendar
              current={selected}
              onDayPress={(day) => {
                setSelected(day.dateString);
              }}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#9CA3AF",
                selectedDayBackgroundColor: "#2563EB",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#2563EB",
                dayTextColor: "#1F2937",
                textDisabledColor: "#D1D5DB",
                dotColor: "#2563EB",
                selectedDotColor: "#ffffff",
                arrowColor: "#4B5563",
                monthTextColor: "#1F2937",
                textDayFontWeight: "600",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "600",
                textDayFontSize: 15,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 12,
                "stylesheet.calendar.header": {
                  header: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20,
                  },
                  monthText: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#1F2937",
                    marginLeft: 10,
                  },
                },
              }}
              markedDates={{
                "2023-09-01": { marked: true, dotColor: "#EF4444" },
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                  marked: true,
                  dotColor: "white",
                },
              }}
              renderArrow={(direction) => (
                <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center">
                  <Ionicons
                    name={
                      direction === "left" ? "chevron-back" : "chevron-forward"
                    }
                    size={16}
                    color="#4B5563"
                  />
                </View>
              )}
            />
          </View>
        </View>

        {/* Availability Flow */}
        <View className="px-6 mt-6">
          <View className="bg-gray-50 rounded-[28px] p-6 border border-gray-100">
            <Text className="text-gray-900 font-bold text-base mb-4">
              Availability Flow
            </Text>
            {/* The bar */}
            <View className="flex-row h-2 rounded-full overflow-hidden mb-5">
              <View className="bg-emerald-400 w-1/6 mr-1 rounded-full" />
              <View className="bg-red-500 w-1/4 mr-1 rounded-full" />
              <View className="bg-emerald-400 w-[15%] mr-1 rounded-full" />
              <View className="bg-emerald-400 w-[5%] mr-1 rounded-full" />
              <View className="bg-red-600 w-1/3 mr-1 rounded-full" />
              <View className="bg-emerald-400 flex-1 rounded-full" />
            </View>
            {/* Legend */}
            <View className="flex-row items-center">
              <View className="flex-row items-center mr-6">
                <View className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                <Text className="text-[10px] font-bold text-gray-500 tracking-wider">
                  AVAILABLE
                </Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-red-600 mr-2" />
                <Text className="text-[10px] font-bold text-gray-500 tracking-wider">
                  BOOKED
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Today's Focus */}
        <View className="px-6 mt-8">
          <View className="flex-row justify-between items-end mb-5">
            <Text className="text-[22px] font-bold text-gray-900">
              Today's Focus
            </Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-bold text-sm mb-1">
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4">
            {/* Item 1 */}
            <View className="flex-row items-start mt-2">
              <View className="w-[52px] items-center pt-2">
                <Text className="text-base font-bold text-gray-900">09</Text>
                <Text className="text-[10px] text-gray-500 font-bold mt-0.5">
                  AM
                </Text>
              </View>
              <View className="flex-1 bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 ml-3">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-base font-bold text-gray-900 mb-2">
                      Product Sync: Q4 Strategy
                    </Text>
                    <View className="flex-row items-center mb-3">
                      <Ionicons name="time-outline" size={14} color="#6B7280" />
                      <Text className="text-xs font-bold text-gray-500 ml-1.5">
                        09:00 - 10:00 AM
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <View className="flex-row">
                        <Image
                          source={{ uri: "https://i.pravatar.cc/150?img=5" }}
                          className="w-6 h-6 rounded-full border-[2px] border-white z-20"
                        />
                        <Image
                          source={{ uri: "https://i.pravatar.cc/150?img=8" }}
                          className="w-6 h-6 rounded-full border-[2px] border-white -ml-2 z-10"
                        />
                      </View>
                      <Text className="text-xs font-bold text-gray-400 ml-2">
                        +3
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={18}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Item 2 - Happening Now */}
            <View className="flex-row items-start mt-5">
              <View className="w-[52px] items-center pt-2">
                <Text className="text-base font-bold text-blue-600">11</Text>
                <Text className="text-[10px] text-blue-600 font-bold mt-0.5">
                  AM
                </Text>
              </View>
              <View className="flex-1 bg-blue-600 rounded-[28px] p-5 shadow-md shadow-blue-600/30 ml-3">
                <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-3">
                  <Text className="text-white text-[10px] font-bold tracking-wider">
                    HAPPENING NOW
                  </Text>
                </View>
                <Text className="text-lg font-bold text-white mb-2">
                  Design Critique: UI Kit
                </Text>
                <View className="flex-row items-center mb-5">
                  <Ionicons name="videocam" size={14} color="#E0E7FF" />
                  <Text className="text-blue-100 text-xs font-medium ml-1.5">
                    meet.google.com/xyz-abc
                  </Text>
                </View>
                <TouchableOpacity className="bg-white rounded-[14px] py-3 items-center">
                  <Text className="text-blue-600 font-bold text-sm">
                    Join Call
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Item 3 */}
            <View className="flex-row items-start mt-5">
              <View className="w-[52px] items-center pt-2">
                <Text className="text-base font-bold text-gray-900">02</Text>
                <Text className="text-[10px] text-gray-500 font-bold mt-0.5">
                  PM
                </Text>
              </View>
              <View className="flex-1 bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 ml-3">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    <Text className="text-base font-bold text-gray-900 mb-2">
                      Interview: Senior Dev Role
                    </Text>
                    <View className="flex-row items-center">
                      <Ionicons
                        name="location-outline"
                        size={14}
                        color="#6B7280"
                      />
                      <Text className="text-xs font-bold text-gray-500 ml-1.5">
                        Conference Room B
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Ionicons
                      name="ellipsis-vertical"
                      size={18}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Add Slot */}
            <View className="flex-row items-start mt-5">
              <View className="w-[52px]" />
              <View className="flex-1 bg-gray-50 rounded-[20px] py-5 border border-dashed border-gray-200 ml-3 flex-row items-center justify-center">
                <Ionicons name="add-circle" size={18} color="#9CA3AF" />
                <Text className="text-sm font-bold text-gray-400 ml-2">
                  Add Afternoon Slot
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-4 right-4">
        <TouchableOpacity className="w-[60px] h-[60px] bg-[#6366F1] rounded-[22px] items-center justify-center shadow-lg shadow-indigo-600/40">
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CalenderScreen;
