import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";

const CalenderScreen = () => {
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [selected, setSelected] = useState(formattedToday);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const scheduleData = [
    {
      date: "Tuesday, May 19",
      isToday: true,
      data: [],
    },
    {
      date: "Thursday, May 21",
      data: [
        {
          id: 1,
          title: "Strategy Consultation",
          subtitle: "Alexander Vance & Team",
          time: "10:00 AM - 11:30 AM",
          color: "#5B4CF0",
          platform: "Zoom",
        },
      ],
    },
    {
      date: "Friday, May 22",
      data: [
        {
          id: 2,
          title: "Portfolio Review",
          subtitle: "Elena Rodriguez",
          time: "02:30 PM - 03:30 PM",
          color: "#F59E0B",
          platform: "Meet",
        },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Premium Header */}
      <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8 mb-6 shadow-md shadow-indigo-500/20">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setIsCalendarVisible(!isCalendarVisible)}
            activeOpacity={0.7}
          >
            <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
              <Feather name="calendar" size={18} color="white" />
            </View>
            <Text className="text-[26px] font-bold text-white mr-2">
              May 2026
            </Text>
            <Feather
              name={isCalendarVisible ? "chevron-up" : "chevron-down"}
              size={22}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity className="w-10 h-10 bg-white/10 rounded-full items-center justify-center relative">
            <Feather name="bell" size={20} color="white" />
            <View className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border border-[#5B4CF0]" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View className="px-6 mb-6">
        <View className="flex-row bg-white rounded-full p-1 shadow-sm border border-gray-100">
          {["All", "Upcoming", "Completed"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 items-center py-2.5 rounded-full ${
                activeTab === tab ? "bg-[#4F46E5]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-[14px] font-bold ${
                  activeTab === tab ? "text-white" : "text-gray-500"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Calendar Dropdown */}
        {isCalendarVisible && (
          <View className="px-6 mb-8">
            <View className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-50 overflow-hidden">
              <Calendar
                current={selected}
                onDayPress={(day) => setSelected(day.dateString)}
                theme={{
                  backgroundColor: "#ffffff",
                  calendarBackground: "#ffffff",
                  textSectionTitleColor: "#9CA3AF",
                  selectedDayBackgroundColor: "#5B4CF0",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#5B4CF0",
                  dayTextColor: "#1F2937",
                  textDisabledColor: "#D1D5DB",
                  dotColor: "#5B4CF0",
                  selectedDotColor: "#ffffff",
                  arrowColor: "#4B5563",
                  monthTextColor: "#1F2937",
                  textDayFontWeight: "600",
                  textMonthFontWeight: "bold",
                  textDayHeaderFontWeight: "600",
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
                  "2026-05-21": { marked: true, dotColor: "#5B4CF0" },
                  "2026-05-22": { marked: true, dotColor: "#F59E0B" },
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    marked: true,
                    dotColor: "white",
                  },
                }}
                renderArrow={(direction) => (
                  <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center">
                    <Feather
                      name={
                        direction === "left" ? "chevron-left" : "chevron-right"
                      }
                      size={16}
                      color="#4B5563"
                    />
                  </View>
                )}
              />
            </View>
          </View>
        )}

        {/* Schedule List */}
        <View className="flex-1">
          {scheduleData.map((group, index) => (
            <View key={index} className="mb-6">
              {/* Date Header */}
              <View className="px-6 mb-4">
                <View className="flex-row items-center mb-2">
                  <Text className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">
                    {group.date}
                  </Text>
                  {group.isToday && (
                    <View className="bg-indigo-50 px-2 py-0.5 rounded ml-2">
                      <Text className="text-[11px] font-bold text-[#5B4CF0] uppercase">
                        Today
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Meetings */}
              {group.data.length === 0 ? (
                <View className="px-6 mb-2">
                  <View className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50 items-center justify-center">
                    <Feather
                      name="coffee"
                      size={24}
                      color="#D1D5DB"
                      className="mb-3"
                    />
                    <Text className="text-[15px] text-gray-500 font-medium">
                      No meetings scheduled today.
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="px-6 gap-y-4">
                  {group.data.map((meeting) => (
                    <View
                      key={meeting.id}
                      className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-50 border-l-[4px]"
                      style={{ borderLeftColor: meeting.color }}
                    >
                      <View className="flex-row justify-between items-start mb-1">
                        <Text className="text-[18px] font-bold text-gray-900 flex-1">
                          {meeting.title}
                        </Text>
                        {meeting.platform && (
                          <View className="bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                            <Text className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                              {meeting.platform}
                            </Text>
                          </View>
                        )}
                      </View>

                      <View className="flex-row items-center mb-4 mt-1">
                        <View className="w-6 h-6 rounded-full bg-indigo-50 items-center justify-center mr-2">
                          <Feather name="user" size={12} color="#5B4CF0" />
                        </View>
                        <Text className="text-[14px] text-gray-600 font-medium">
                          {meeting.subtitle}
                        </Text>
                      </View>

                      <View className="flex-row items-center bg-gray-50 self-start px-3 py-1.5 rounded-lg">
                        <Feather name="clock" size={12} color="#6B7280" />
                        <Text className="text-[12px] font-bold text-gray-600 ml-1.5">
                          {meeting.time}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

          <View className="px-6 mt-2 mb-10 items-center">
            <Text className="text-[13px] text-gray-400 font-medium">
              End of scheduled meetings
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity className="w-[64px] h-[64px] bg-[#5B4CF0] rounded-[24px] items-center justify-center shadow-lg shadow-indigo-500/40 border border-white/20">
          <Feather name="plus" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CalenderScreen;
