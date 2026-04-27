import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const route = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8FAFC]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
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

        {/* Greeting */}
        <View className="px-6 mt-8">
          <Text className="text-[40px] font-bold text-gray-900 leading-tight">
            Good Morning,{"\n"}Ayush
          </Text>
          <Text className="text-gray-500 mt-2 text-base">
            You have 2 meetings scheduled for today.
          </Text>
        </View>

        {/* Stats Row */}
        <View className="flex-row px-6 mt-8 gap-4">
          {/* Total Meetings */}
          <View className="flex-1 bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-start mb-4">
              <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center">
                <Ionicons name="calendar-outline" size={20} color="#2563EB" />
              </View>
              <View className="bg-green-100 px-2.5 py-1 rounded-full">
                <Text className="text-green-700 text-[10px] font-bold">
                  +12%
                </Text>
              </View>
            </View>
            <Text className="text-gray-400 text-xs font-bold tracking-wider mb-1">
              TOTAL MEETINGS
            </Text>
            <Text className="text-3xl font-bold text-gray-900">24</Text>
          </View>

          {/* Upcoming */}
          <View className="flex-1 bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
            <View className="flex-row justify-between items-start mb-4">
              <View className="w-10 h-10 rounded-full bg-purple-50 items-center justify-center">
                <MaterialCommunityIcons
                  name="video-outline"
                  size={22}
                  color="#9333EA"
                />
              </View>
            </View>
            <Text className="text-gray-400 text-xs font-bold tracking-wider mb-1">
              UPCOMING
            </Text>
            <Text className="text-3xl font-bold text-gray-900">5</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mt-6">
          <View className="bg-blue-600 rounded-3xl p-6 shadow-md shadow-blue-600/30">
            <Text className="text-white text-lg font-semibold mb-4">
              Quick Actions
            </Text>
            <View className="flex-row gap-3">
              <TouchableOpacity className="flex-1 bg-white flex-row items-center justify-center py-3.5 rounded-xl">
                <Ionicons name="add-circle" size={18} color="#2563EB" />
                <Text className="ml-2 font-bold text-blue-600 text-sm">
                  Create Event
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-blue-500 flex-row items-center justify-center py-3.5 rounded-xl border border-blue-400">
                <Ionicons name="share-social" size={18} color="#FFFFFF" />
                <Text className="ml-2 font-bold text-white text-sm">
                  Share Link
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Today's Schedule */}
        <View className="px-6 mt-8">
          <View className="flex-row justify-between items-end mb-5">
            <Text className="text-[26px] leading-[30px] font-bold text-gray-900">
              Today's{"\n"}Schedule
            </Text>
            <TouchableOpacity className="flex-row items-center mb-1">
              <Text className="text-blue-600 font-semibold text-sm mr-1">
                View Calendar
              </Text>
              <Ionicons name="chevron-forward" size={14} color="#2563EB" />
            </TouchableOpacity>
          </View>

          {/* Schedule Items */}
          <View className="space-y-5">
            {/* Item 1 */}
            <View className="flex-row items-start mt-2">
              <View className="w-[52px] items-center pt-2">
                <Text className="text-base font-bold text-gray-900">10:00</Text>
                <Text className="text-[10px] text-gray-500 font-bold mt-0.5">
                  AM
                </Text>
              </View>
              <View className="flex-1 bg-white rounded-3xl p-4 shadow-sm border border-gray-100 ml-3">
                <View className="flex-row justify-between items-start">
                  <View className="flex-row items-center flex-1">
                    <Image
                      source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                      className="w-11 h-11 rounded-full bg-gray-200"
                    />
                    <View className="ml-3 flex-1">
                      <Text className="text-base font-bold text-gray-900">
                        Client Meeting
                      </Text>
                      <Text className="text-xs text-gray-500 font-medium mt-0.5">
                        Rahul Sharma • 45 min session
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center">
                    <Ionicons
                      name="ellipsis-vertical"
                      size={16}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
                <View className="mt-4 flex-row">
                  <View className="bg-purple-50 px-3 py-1.5 rounded-full flex-row items-center border border-purple-100">
                    <Ionicons name="videocam" size={12} color="#9333EA" />
                    <Text className="text-purple-700 text-[11px] font-bold ml-1.5">
                      Zoom Meeting
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {/* Item 2 */}
            <View className="flex-row items-start mt-5">
              <View className="w-[52px] items-center pt-2">
                <Text className="text-base font-bold text-gray-900">02:00</Text>
                <Text className="text-[10px] text-gray-500 font-bold mt-0.5">
                  PM
                </Text>
              </View>
              <View className="flex-1 bg-white rounded-3xl p-4 shadow-sm border-l-[6px] border-l-blue-500 ml-3">
                <View className="flex-row justify-between items-start">
                  <View className="flex-row items-center flex-1">
                    <View className="w-11 h-11 rounded-full bg-blue-50 items-center justify-center">
                      <Ionicons name="people" size={20} color="#2563EB" />
                    </View>
                    <View className="ml-3 flex-1">
                      <Text className="text-base font-bold text-gray-900">
                        Project Discussion
                      </Text>
                      <Text className="text-xs text-gray-500 font-medium mt-0.5">
                        MeetEase UI Redesign • Internal Team
                      </Text>
                    </View>
                  </View>
                </View>
                {/* avatars row */}
                <View className="mt-4 flex-row items-center">
                  <View className="flex-row">
                    <Image
                      source={{ uri: "https://i.pravatar.cc/150?img=6" }}
                      className="w-7 h-7 rounded-full border-[2px] border-white z-30"
                    />
                    <Image
                      source={{ uri: "https://i.pravatar.cc/150?img=8" }}
                      className="w-7 h-7 rounded-full border-[2px] border-white -ml-2 z-20"
                    />
                    <Image
                      source={{ uri: "https://i.pravatar.cc/150?img=9" }}
                      className="w-7 h-7 rounded-full border-[2px] border-white -ml-2 z-10"
                    />
                  </View>
                  <View className="w-7 h-7 rounded-full bg-gray-100 border-[2px] border-white -ml-2 items-center justify-center z-0">
                    <Text className="text-[10px] font-bold text-gray-600">
                      +2
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-6 mt-10 mb-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">
            Recent Activity
          </Text>

          <View className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
            <View className="flex-row items-center p-3">
              <View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center">
                <Ionicons name="checkmark-circle" size={20} color="#16A34A" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-gray-900">
                  Completed: Quarterly Review
                </Text>
                <Text className="text-[11px] text-gray-500 mt-0.5">
                  2 hours ago
                </Text>
              </View>
            </View>

            <View className="h-[1px] bg-gray-50 mx-4" />

            <View className="flex-row items-center p-3">
              <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center">
                <Ionicons name="person-add" size={18} color="#2563EB" />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-sm font-bold text-gray-900">
                  New Client Registered
                </Text>
                <Text className="text-[11px] text-gray-500 mt-0.5">
                  5 hours ago
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
