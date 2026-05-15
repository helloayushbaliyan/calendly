import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/images/logo.png";
import splashImage from "../assets/images/splash-screen-image.png";
const index = () => {
  const route = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#f7f7fa]">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="m-2 my-16 flex justify-center items-center">
          <Image className="w-[40%] object-contain h-[40px]" source={logo} />
        </View>
        <View className=" m-10 flex justify-center   rounded-3xl ">
          <Image
            source={splashImage}
            className="w-full h-[320px]"
            resizeMode="contain"
          />
        </View>
        <View className=" mx-5 flex-1 justify-between items-center">
          <View>
            <Text className="text-center text-[35px] font-bold text-gray-700">
              Easy Scheduling
            </Text>
            <Text className="text-center text-[18px] font- text-gray-500 leading-6 mt-4">
              The Temporal Architect of your workday. Organize your meetings
              with a curated editorial flow that breathes life into your
              calendar.
            </Text>
          </View>
          <TouchableOpacity
            className="bg-[#554ce6] rounded-2xl py-5 px-6 mt-6 w-full flex justify-center items-center"
            onPress={() => route.push("/signin")}
          >
            <Text className="text-white font-bold text-xl">Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
