import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  const route = useRouter();

  return (
    <View className="flex-1 bg-[#F5F7FB]">
      <View className="absolute top-0 h-[45%] w-full rounded-b-[40px] bg-[#4F46E5]">
        <SafeAreaView edges={["top"]} className="flex-1">
          <View className="mt-16 px-8 items-center justify-center">
            <Text className="text-[32px] font-bold text-white text-center">
              Reset Password
            </Text>
            <Text className="mt-4 text-[15px] leading-6 font-medium text-indigo-100 text-center">
              Enter your email address and we'll send you a link to reset your password.
            </Text>
          </View>
        </SafeAreaView>
      </View>

      <SafeAreaView edges={["bottom"]} className="flex-1">
        <View
          style={{
            flex: 1,
            paddingTop: 240,
            paddingBottom: 20,
          }}
        >
          <View className="mx-5 rounded-[30px] border border-gray-100 bg-white p-6 shadow-sm">
            <View>
              <Text className="mb-2 text-[14px] font-medium text-slate-700">
                Email Address
              </Text>
              <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5">
                <Feather name="mail" size={20} color="#94A3B8" />
                <TextInput
                  className="ml-3 flex-1 text-[16px] text-slate-900"
                  placeholder="name@example.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                className="mt-8 w-full items-center justify-center rounded-xl bg-[#4F46E5] py-4 shadow-sm shadow-indigo-500/30"
              >
                <Text className="text-[16px] font-bold text-white">Send reset link</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-10 items-center justify-center">
            <TouchableOpacity
              className="flex-row items-center justify-center"
              onPress={() => route.push("/signin")}
            >
              <Feather name="arrow-left" size={16} color="#4F46E5" />
              <Text className="ml-2 font-bold text-[#4F46E5]">Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <SafeAreaView edges={["top"]} className="absolute top-0 w-full" pointerEvents="box-none">
        <View className="px-6 pt-4" pointerEvents="box-none">
          <TouchableOpacity
            onPress={() => route.canGoBack() ? route.back() : route.replace("/signin")}
            className="h-10 w-10 items-center justify-center rounded-full bg-white/20"
          >
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
