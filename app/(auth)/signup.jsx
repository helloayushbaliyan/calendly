import { useRouter } from "expo-router";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../../assets/images/logo.png";

const SignUp = () => {
  const route = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F5F7FB]">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-6 my-10 flex-1 rounded-[40px] bg-white px-6 py-8">
          <View className="mb-10 w-full">
            <Image className="h-[40px] w-[40%] object-contain" source={logo} />
          </View>

          <View className="mb-10">
            <Text className="text-left text-[35px] font-bold text-[#1F2937]">
              Create Account
            </Text>
            <Text className="mt-4 text-left text-[20px] leading-7 text-[#6B7280]">
              Join Calenderly and start organizing your schedule.
            </Text>
          </View>

          <View>
            <View className="mb-6">
              <Text className="text-left text-[20px] font-bold text-[#374151]">
                Full Name
              </Text>
              <TextInput
                className="mt-3 rounded-2xl border border-[#D7DEE8] bg-[#EEF2F7] px-4 py-4 text-[17px] text-[#111827]"
                placeholder="Full Name"
                placeholderTextColor="#94A3B8"
                autoCapitalize="words"
              />
            </View>

            <View className="mb-6">
              <Text className="text-left text-[20px] font-bold text-[#374151]">
                Email Address
              </Text>
              <TextInput
                className="mt-3 rounded-2xl border border-[#D7DEE8] bg-[#EEF2F7] px-4 py-4 text-[17px] text-[#111827]"
                placeholder="Email Address"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <Text className="text-left text-[20px] font-bold text-[#374151]">
                Password
              </Text>
              <TextInput
                className="mt-3 rounded-2xl border border-[#D7DEE8] bg-[#EEF2F7] px-4 py-4 text-[17px] text-[#111827]"
                placeholder="Password"
                placeholderTextColor="#94A3B8"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View className="mb-6">
              <Text className="text-left text-[20px] font-bold text-[#374151]">
                Confirm Password
              </Text>
              <TextInput
                className="mt-3 rounded-2xl border border-[#D7DEE8] bg-[#EEF2F7] px-4 py-4 text-[17px] text-[#111827]"
                placeholder="Confirm Password"
                placeholderTextColor="#94A3B8"
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              className="mt-6 w-full items-center justify-center rounded-2xl bg-[#007AFF] px-6 py-5"
              onPress={() => route.push("/home")}
            >
              <Text className="text-xl font-bold text-white">
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          <Text className="my-6 text-center text-[15px] font-bold text-[#9CA3AF]">
            or
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            className=" w-full flex-row items-center justify-center rounded-2xl border border-[#D7DEE8] bg-[#EEF2F7] px-6 py-5"
          >
            <Text className="mr-2 text-[18px] font-bold text-[#EA4335]">G</Text>
            <Text className="text-[18px] font-bold text-[#374151]">
              Continue with Google
            </Text>
          </TouchableOpacity>
          <View>
            <Text className="mt-6 text-center text-[15px] font-bold text-[#9CA3AF]">
              Already have an account?{" "}
              <Text
                className="text-[15px] font-bold text-[#007AFF]"
                onPress={() => route.push("/signin")}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
