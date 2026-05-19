import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const route = useRouter();

  return (
    <View className="flex-1 bg-[#F5F7FB]">
      {/* Purple Header */}
      <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8">
        {/* User & Bell */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Image
              source={{ uri: "https://i.pravatar.cc/150?img=11" }}
              className="w-12 h-12 rounded-full border-2 border-white/20"
            />
            <View className="ml-3">
              <Text className="text-indigo-100 text-[13px] font-medium">
                Good morning,
              </Text>
              <Text className="text-white text-[18px] font-bold">
                Sarah Jenkins
              </Text>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-white/10 rounded-full items-center justify-center">
            <Feather name="bell" size={20} color="#FFFFFF" />
            <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#4F46E5]" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View className="flex-row mt-8 gap-4">
          {/* Today */}
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Feather name="calendar" size={14} color="#6366F1" />
              <Text className="ml-1.5 text-gray-500 text-[11px] font-bold tracking-wider">
                TODAY
              </Text>
            </View>
            <View className="flex-row items-end">
              <Text className="text-[28px] font-bold text-gray-900 leading-none">
                4
              </Text>
              <Text className="text-gray-400 text-[13px] font-medium ml-2 mb-1">
                Meetings
              </Text>
            </View>
          </View>

          {/* Total */}
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Feather name="bar-chart-2" size={14} color="#6366F1" />
              <Text className="ml-1.5 text-gray-500 text-[11px] font-bold tracking-wider">
                TOTAL
              </Text>
            </View>
            <View className="flex-row items-end">
              <Text className="text-[28px] font-bold text-gray-900 leading-none">
                28
              </Text>
              <Text className="text-gray-400 text-[13px] font-medium ml-2 mb-1">
                Bookings
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Upcoming Today */}
        <View className="px-6 mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[18px] font-bold text-gray-900">
              Upcoming Today
            </Text>
            <TouchableOpacity>
              <Text className="text-[#4F46E5] text-[13px] font-medium">
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <View className="grid grid-cols-1 gap-4">
            {/* Card 1 */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border-l-[4px] border-l-[#4F46E5]">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-[#4F46E5] text-[12px] font-bold">
                  10:00 AM - 10:30 AM
                </Text>
                <View className="bg-indigo-50 px-2.5 py-1 rounded-full">
                  <Text className="text-[#4F46E5] text-[11px] font-medium">
                    Google Meet
                  </Text>
                </View>
              </View>
              <Text className="text-[16px] font-bold text-gray-900 mb-4">
                Product Demo Call
              </Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                    className="w-8 h-8 rounded-full bg-gray-200"
                  />
                  <View className="ml-3">
                    <Text className="text-gray-900 text-[13px] font-bold">
                      Alex Thompson
                    </Text>
                    <Text className="text-gray-400 text-[11px]">Acme Corp</Text>
                  </View>
                </View>
                <TouchableOpacity className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center">
                  <Feather name="more-horizontal" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Card 2 */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border-l-[4px] border-l-gray-400">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-500 text-[12px] font-bold">
                  1:00 PM - 2:00 PM
                </Text>
                <View className="bg-gray-100 px-2.5 py-1 rounded-full">
                  <Text className="text-gray-600 text-[11px] font-medium">
                    Zoom
                  </Text>
                </View>
              </View>
              <Text className="text-[16px] font-bold text-gray-900 mb-4">
                Quarterly Review
              </Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=33" }}
                    className="w-8 h-8 rounded-full bg-gray-200"
                  />
                  <View className="ml-3">
                    <Text className="text-gray-900 text-[13px] font-bold">
                      David Chen
                    </Text>
                    <Text className="text-gray-400 text-[11px]">TechFlow</Text>
                  </View>
                </View>
                <TouchableOpacity className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center">
                  <Feather name="more-horizontal" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Card 3 */}
            <View className="bg-white rounded-3xl p-5 shadow-sm border-l-[4px] border-l-gray-400">
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-500 text-[12px] font-bold">
                  3:30 PM - 4:00 PM
                </Text>
                <View className="bg-gray-100 px-2.5 py-1 rounded-full">
                  <Text className="text-gray-600 text-[11px] font-medium">
                    Teams
                  </Text>
                </View>
              </View>
              <Text className="text-[16px] font-bold text-gray-900 mb-4">
                Sync with Design Team
              </Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=44" }}
                    className="w-8 h-8 rounded-full bg-gray-200 z-20 border-2 border-white"
                  />
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=45" }}
                    className="w-8 h-8 rounded-full bg-gray-200 -ml-3 z-10 border-2 border-white"
                  />
                  <View className="w-8 h-8 rounded-full bg-gray-100 -ml-3 z-0 border-2 border-white items-center justify-center">
                    <Text className="text-[10px] font-bold text-gray-500">
                      +2
                    </Text>
                  </View>
                </View>
                <TouchableOpacity className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center">
                  <Feather name="more-horizontal" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mt-8 mb-8">
          <Text className="text-[18px] font-bold text-gray-900 mb-4">
            Quick Actions
          </Text>
          <View className="flex-row gap-4">
            <TouchableOpacity className="flex-1 bg-white rounded-3xl py-6 items-center shadow-sm">
              <View className="w-12 h-12 bg-indigo-50 rounded-full items-center justify-center mb-3">
                <Feather name="link" size={20} color="#4F46E5" />
              </View>
              <Text className="text-[14px] font-bold text-gray-900">
                Copy Link
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-white rounded-3xl py-6 items-center shadow-sm">
              <View className="w-12 h-12 bg-indigo-50 rounded-full items-center justify-center mb-3">
                <Feather name="calendar" size={20} color="#4F46E5" />
              </View>
              <Text className="text-[14px] font-bold text-gray-900">
                Availability
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
