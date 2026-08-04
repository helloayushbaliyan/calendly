import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSelector } from "react-redux";
import { GetAvailability } from "../lib/services/availabilityService";

export default function AvailabilityScreen() {
  const router = useRouter();

  const user = useSelector((state) => state.auth.user)

  const [AvailabiltyData, setAvailabiltyData] = useState([])

  const FetchAvailabilty = async () => {
    const data = await GetAvailability(user.id)
    if (data) {

      setAvailabiltyData(data)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        FetchAvailabilty();
      }
    }, [user?.id])
  );

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
          {AvailabiltyData.map((item) => (
            <View key={item.id}
              className="bg-white rounded-[24px] p-5 mb-4 border border-gray-50 shadow-sm flex-row justify-between items-center">
              <TouchableOpacity
                onPress={() => router.push("/editSchedule")}
                activeOpacity={0.7}
                className="flex-1 pr-4"
              >
                <View className="flex-row items-center mb-1">
                  <Text className="text-gray-900 text-[18px] font-bold mr-2">{item.name}</Text>
                </View>
                <Text className="text-gray-500 text-[14px] font-semibold leading-snug">{item.availability_days.map((day) => day.day + " , ")}</Text>

              </TouchableOpacity>

              {/* Static Action Button */}
              <TouchableOpacity
                activeOpacity={0.7}
                className="w-8 h-8 rounded-full bg-gray-50 items-center justify-center border border-gray-100"
              >
                <Feather name="more-vertical" size={18} color="#4B5563" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Create New Schedule Button */}
          <TouchableOpacity
            onPress={() => router.push("/createSchedule")}
            activeOpacity={0.7}
            className="border-2 border-dashed border-gray-200 rounded-[24px] p-5 mb-4 items-center justify-center bg-transparent active:bg-gray-50"
          >
            <Text className="text-[#4F46E5] text-base font-bold">Create new schedule</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}
