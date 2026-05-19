import { Feather } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const AlertScreen = () => {
  const notifications = [
    {
      id: 1,
      title: "New Event Scheduled",
      time: "1d ago",
      description: (
        <Text className="text-[15px] text-gray-600 leading-relaxed">
          <Text className="font-bold text-gray-900">Pawan</Text> scheduled{" "}
          <Text className="font-bold text-gray-900">maths class</Text> with{" "}
          <Text className="font-bold text-gray-900">Hola amigo</Text> on Friday,
          22 May 2026 at 11:00am IST.
        </Text>
      ),
    },
    {
      id: 2,
      title: "New Event Scheduled",
      time: "1d ago",
      description: (
        <Text className="text-[15px] text-gray-600 leading-relaxed">
          <Text className="font-bold text-gray-900">Ayush Baliyan</Text> scheduled{" "}
          <Text className="font-bold text-gray-900">30 Minute Meeting</Text>{" "}
          with <Text className="font-bold text-gray-900">Hola amigo</Text> on{" "}
          Thursday, 21 May 2026 at 10:00am IST.
        </Text>
      ),
    },
  ];

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Premium Header */}
      <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8 mb-6 shadow-md shadow-indigo-500/20">
        <View className="flex-row items-center justify-between">
          <Text className="text-[28px] font-bold text-white">Notifications</Text>
          <TouchableOpacity className="w-10 h-10 bg-white/10 rounded-full items-center justify-center">
            <Feather name="sliders" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 gap-y-4">
          {notifications.map((notif) => (
            <View
              key={notif.id}
              className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-50"
            >
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <Feather name="calendar" size={16} color="#10B981" />
                  <Text className="text-[#10B981] font-bold text-[13px] ml-2">
                    {notif.title}
                  </Text>
                </View>
                <Text className="text-gray-400 text-[12px] font-medium">
                  {notif.time}
                </Text>
              </View>
              
              <View className="mb-4">{notif.description}</View>

              <TouchableOpacity className="self-start border border-gray-200 rounded-full px-5 py-2">
                <Text className="text-[#4F46E5] font-bold text-[13px]">
                  View Contact
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AlertScreen;
