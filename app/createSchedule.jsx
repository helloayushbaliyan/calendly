import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { scheduleSchema } from "../utils/scheduleSchema";
import TimePickerSheet from "../components/TimePickerSheet";

export default function CreateScheduleScreen() {
  const router = useRouter();
  const timePickerSheetRef = useRef(null);
  const [errors, setErrors] = useState({});

  // Static weekday config
  const weekdays = [
    { key: "sunday", label: "Sun" },
    { key: "monday", label: "Mon" },
    { key: "tuesday", label: "Tue" },
    { key: "wednesday", label: "Wed" },
    { key: "thursday", label: "Thu" },
    { key: "friday", label: "Fri" },
    { key: "saturday", label: "Sat" },
  ];

  const [availability, setAvailability] = useState({
    name: "",
    days: {
      monday: [{ start: "9:00 am", end: "5:00 Pm" }],
      tuesday: [{ start: "9:00 am", end: "5:00 Pm" }],
      wednesday: [{ start: "9:00 am", end: "5:00 Pm" }],
      thursday: [{ start: "9:00 am", end: "5:00 Pm" }],
      friday: [{ start: "9:00 am", end: "5:00 Pm" }],
    },
  });



  const toggleday = (dayidx) => {
    setAvailability((prev) => {
      const newDays = { ...prev.days };
      if (newDays[dayidx]) {
        delete newDays[dayidx];
      } else {
        newDays[dayidx] = [{ start: "9:00 am", end: "5:00 Pm" }];
      }
      return { ...prev, days: newDays };
    });

  };


  const [selectDay, setSelectDay] = useState(null);


  const handleSave = (startTime, endTime) => {
    if (!selectDay) return

    setAvailability((prev) => ({
      ...prev, days: {
        ...prev.days,

        [selectDay]: [{ start: startTime, end: endTime }]
      }
    }))
    timePickerSheetRef.current?.dismiss()
    setSelectDay(null)
  }

  const handleSubmit = () => {
    const result = scheduleSchema.safeParse(availability);
    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }
    setErrors({});
    console.log(availability);
    router.back();
  }


  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
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
            <Text className="text-[28px] font-bold text-white">New Schedule</Text>
          </View>
        </View>

        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Card 1: Schedule Name Details */}
          <View className="bg-white rounded-[24px] p-5 mb-4 shadow-sm border border-gray-50">
            <Text className="text-[17px] font-bold text-gray-900 mb-4">
              Schedule Profile
            </Text>

            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">
              SCHEDULE NAME
            </Text>
            <TextInput
              placeholder="e.g. Working hours"
              placeholderTextColor="#94a3b8"
              value={availability.name}
              onChangeText={(text) => setAvailability({ ...availability, name: text })}
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 text-[15px] text-gray-800 mb-2 font-medium"
            />
            {errors.name && (
              <Text className="text-red-500 text-xs mt-1 ml-1">{errors.name}</Text>
            )}
          </View>

          {/* Card 2: Weekday Chip Selection */}
          <View className="bg-white rounded-[24px] p-5 mb-4 shadow-sm border border-gray-50">
            <Text className="text-[17px] font-bold text-gray-900 mb-4">
              Active Days
            </Text>

            <View className="flex-row justify-between mb-2">
              {weekdays.map((day, idx) => {
                const isActive = availability.days[day.key] !== undefined

                return (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.8}
                    onPress={() => toggleday(day.key)}
                    className={`w-10 h-10 rounded-full items-center justify-center ${isActive ? "bg-[#4F46E5]" : "bg-gray-100"
                      }`}
                  >
                    <Text
                      className={`text-[12px] font-bold ${isActive ? "text-white" : "text-gray-500"
                        }`}
                    >
                      {day.label}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            {errors.days && (
              <Text className="text-red-500 text-xs mt-1 ml-1">{errors.days}</Text>
            )}
          </View>

          {/* Card 3: Sync hours switch */}
          {/* <View className="flex-row justify-between items-center bg-white p-5 rounded-[24px] mb-4 border border-gray-50 shadow-sm">
            <View className="flex-1 pr-4">
              <Text className="text-gray-900 text-sm font-bold mb-0.5">
                Sync hours across days
              </Text>
              <Text className="text-[11px] text-gray-500">
                Apply single time block settings to all selected days
              </Text>
            </View>
            <Switch
              value={false}
              disabled={false}
              trackColor={{ false: "#E5E7EB", false: "#4F46E5" }}
              thumbColor="#ffffff"
            />
          </View> */}


          {/* Daily Schedule List */}

          <View className="mb-6">
            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-4 uppercase">
              DAILY SCHEDULE
            </Text>
            {weekdays
              .filter((day) => availability.days[day.key] !== undefined)
              .map((day) => {
                const timeSlots = availability.days[day.key];
                const capitalizedDay = day.key.charAt(0).toUpperCase() + day.key.slice(1);
                return (
                  <View key={day.key} className="flex-row items-center justify-between mb-4">
                    {/* Day name */}
                    <Text className="text-gray-900 text-[18px] font-semibold ">
                      {capitalizedDay}
                    </Text>

                    {/* Time block (compact width, not flex-1) */}
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        setSelectDay(day.key)
                        timePickerSheetRef.current?.present()
                      }}
                      className="bg-white border border-gray-100 rounded-[12px] px-4 py-3  flex-row justify-between items-center shadow-sm"
                    >
                      <Text className="text-gray-800 text-[16px] font-semibold">
                        {timeSlots[0].start} - {timeSlots[0].end}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}

          </View>
        </ScrollView>

        {/* Footer Actions */}
        <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex-row justify-between shadow-lg shadow-gray-100">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 bg-gray-100 py-4 rounded-full items-center justify-center mr-3 active:bg-gray-200"
          >
            <Text className="text-gray-700 text-sm font-bold">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit}
            className="flex-1 bg-[#4F46E5] py-4 rounded-full items-center justify-center active:bg-indigo-700"
          >
            <Text className="text-white text-sm font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <TimePickerSheet ref={timePickerSheetRef} onSave={handleSave} />
    </View>
  );

}
