import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function CreateScheduleScreen() {
  const router = useRouter();

  // Static weekday config
  const weekdays = [
    { label: "Sun", active: true },
    { label: "Mon", active: true },
    { label: "Tue", active: true },
    { label: "Wed", active: true },
    { label: "Thu", active: true },
    { label: "Fri", active: true },
    { label: "Sat", active: false }
  ];

  // Static daily schedule list
  const activeDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
              value="Working hours"
              editable={false}
              placeholder="e.g. Working hours"
              placeholderTextColor="#94a3b8"
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 text-[15px] text-gray-800 mb-2 font-medium"
            />
          </View>

          {/* Card 2: Weekday Chip Selection */}
          <View className="bg-white rounded-[24px] p-5 mb-4 shadow-sm border border-gray-50">
            <Text className="text-[17px] font-bold text-gray-900 mb-4">
              Active Days
            </Text>

            <View className="flex-row justify-between mb-2">
              {weekdays.map((day, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.8}
                  className={`w-10 h-10 rounded-full items-center justify-center ${day.active ? "bg-[#4F46E5]" : "bg-gray-100"
                    }`}
                >
                  <Text
                    className={`text-[12px] font-bold ${day.active ? "text-white" : "text-gray-500"
                      }`}
                  >
                    {day.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Card 3: Sync hours switch */}
          <View className="flex-row justify-between items-center bg-white p-5 rounded-[24px] mb-4 border border-gray-50 shadow-sm">
            <View className="flex-1 pr-4">
              <Text className="text-gray-900 text-sm font-bold mb-0.5">
                Sync hours across days
              </Text>
              <Text className="text-[11px] text-gray-500">
                Apply single time block settings to all selected days
              </Text>
            </View>
            <Switch
              value={true}
              disabled={true}
              trackColor={{ false: "#E5E7EB", true: "#4F46E5" }}
              thumbColor="#ffffff"
            />
          </View>


          {/* Daily Schedule List */}
          <View className="mb-6">
            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-4 uppercase">
              DAILY SCHEDULE
            </Text>

            {activeDays.map((day) => (
              <View key={day} className="flex-row items-center justify-between mb-4">
                {/* Day name */}
                <Text className="text-gray-900 text-[18px] font-semibold ">
                  {day}
                </Text>

                {/* Time block (compact width, not flex-1) */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-white border border-gray-100 rounded-[12px] px-4 py-3  flex-row justify-between items-center shadow-sm"
                >
                  <Text className="text-gray-800 text-[16px] font-semibold">
                    9:00am - 5:00pm
                  </Text>
                </TouchableOpacity>


              </View>
            ))}
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
            onPress={() => router.back()}
            className="flex-1 bg-[#4F46E5] py-4 rounded-full items-center justify-center active:bg-indigo-700"
          >
            <Text className="text-white text-sm font-bold">Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
