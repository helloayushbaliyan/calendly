import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import { GetBookings } from "../../lib/services/bookingServices";

const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hourString, minute] = timeString.split(':');
  const hour = parseInt(hourString, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  const paddedHour = formattedHour < 10 ? `0${formattedHour}` : formattedHour;
  return `${paddedHour}:${minute} ${ampm}`;
};

const formatDateHeader = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day);
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options).toUpperCase();
};

const CalenderScreen = () => {
  const router = useRouter();
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [selected, setSelected] = useState(formattedToday);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);



  const user = useSelector((state) => state.auth.user)
  const [booking, setBooking] = useState([])
  console.log("booking", booking);

  const getBookings = async () => {
    const data = await GetBookings(user?.id)
    if (data) {
      setBooking(data)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        getBookings()
      }
    }, [user?.id])
  )
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


        {/* booing card comne here */}
        <View className="px-3">
          {booking.map((item, index) => {
            const showDateHeader = index === 0 || item.booking_date !== booking[index - 1].booking_date;

            return (
              <View key={item.id} className="mb-2">
                {showDateHeader && (
                  <Text className="text-[12px] font-bold text-slate-500 tracking-widest mb-3 ml-2 mt-2">
                    {formatDateHeader(item.booking_date)}
                  </Text>
                )}

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push({
                    pathname: "/bookingDetails",
                    params: { bookingData: JSON.stringify(item) }
                  })}
                  className="bg-white rounded-[24px] shadow-sm overflow-hidden mb-5 pl-6 pr-5 py-5 border border-slate-50 relative"
                >
                  {/* Left colored bar */}
                  <View className={`absolute top-0 bottom-0 left-0 w-2 ${index % 2 === 0 ? 'bg-[#F59E0B]' : 'bg-[#10B981]'}`} />

                  {/* Name + Status (Avatar removed) */}
                  <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-1 pr-2">
                      <Text className="text-[18px] font-bold text-slate-800">{item.guest_name}</Text>
                      <View className="flex-row items-center mt-1.5">
                        <View className={`w-2 h-2 rounded-full ${index % 2 === 0 ? 'bg-[#F59E0B]' : 'bg-[#10B981]'} mr-2`} />
                        <Text className="text-[14px] text-slate-500 flex-1" numberOfLines={1}>{item.notes || 'Meeting'}</Text>
                      </View>
                    </View>
                    <View className="bg-[#ECFDF5] px-3 py-1.5 rounded-lg">
                      <Text className="text-[10px] font-bold text-[#059669] uppercase tracking-wider">{item.status || 'CONFIRMED'}</Text>
                    </View>
                  </View>

                  {/* Time and Platform Details */}
                  <View className="bg-[#F8FAFC] rounded-[20px] p-4">
                    <View className="flex-row items-center mb-3.5">
                      <Feather name="clock" size={16} color={index % 2 === 0 ? '#F59E0B' : '#10B981'} />
                      <Text className="text-[14px] font-semibold text-slate-700 ml-3">
                        {formatTime(item.start_time)} - {formatTime(item.end_time)}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Feather name="video" size={16} color={index % 2 === 0 ? '#F59E0B' : '#10B981'} />
                      <Text className="text-[14px] font-semibold text-slate-700 ml-3">
                        Video Call
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {/* boobing card end here */}


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
