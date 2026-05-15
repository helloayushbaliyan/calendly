import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  // Basic password strength logic for visual purposes
  const getPasswordStrength = () => {
    const length = password.length;
    if (length === 0) return 0;
    if (length < 6) return 1;
    if (length < 10) return 2;
    if (length < 14) return 3;
    return 4;
  };

  const strength = getPasswordStrength();
  const getStrengthText = () => {
    switch (strength) {
      case 0:
        return "";
      case 1:
        return "Weak password";
      case 2:
        return "Fairly strong password";
      case 3:
        return "Strong password";
      case 4:
        return "Very strong password";
      default:
        return "";
    }
  };

  return (
    <View className="flex-1 bg-[#F5F7FB]">
      <View className="absolute top-0 h-[45%] w-full rounded-b-[40px] bg-[#4F46E5]">
        <SafeAreaView edges={["top"]} className="flex-1">
          <View className="px-6 pt-4 relative">
            <TouchableOpacity
              onPress={() => route.back()}
              className="h-10 w-10 items-center justify-center rounded-full bg-white/20"
            >
              <Feather name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View className="mt-4 items-center justify-center">
            <Text className="text-[32px] font-bold text-white">
              Create Account
            </Text>
            <Text className="mt-2 text-[15px] font-medium text-indigo-100">
              Join Scedly today.
            </Text>
          </View>
        </SafeAreaView>
      </View>

      <SafeAreaView edges={["bottom"]} className="flex-1">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 240,
            paddingBottom: 20,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mx-5 rounded-[30px] border border-gray-100 bg-white p-6 pb-8 shadow-sm">
            <View>
              <Text className="mb-2 text-[14px] font-medium text-slate-700">
                Full Name
              </Text>
              <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5">
                <Feather name="user" size={20} color="#94A3B8" />
                <TextInput
                  className="ml-3 flex-1 text-[16px] text-slate-900"
                  placeholder="John Doe"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="words"
                />
              </View>

              <Text className="mb-2 mt-6 text-[14px] font-medium text-slate-700">
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

              <Text className="mb-2 mt-6 text-[14px] font-medium text-slate-700">
                Password
              </Text>
              <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5">
                <Feather name="lock" size={20} color="#94A3B8" />
                <TextInput
                  className="ml-3 flex-1 text-[16px] text-slate-900"
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Feather
                    name={showPassword ? "eye" : "eye-off"}
                    size={20}
                    color="#94A3B8"
                  />
                </TouchableOpacity>
              </View>

              {/* Password Strength Indicator */}
              <View className="mt-4">
                <View className="w-full flex-row justify-between">
                  {[1, 2, 3, 4].map((level, index) => (
                    <View
                      key={level}
                      className={`h-1.5 flex-1 rounded-full ${index !== 0 ? "ml-2" : ""} ${
                        strength >= level ? "bg-[#4F46E5]" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </View>
                <Text className="mt-2 text-[12px] font-medium text-slate-500">
                  {getStrengthText() ||
                    "Password must be at least 8 characters"}
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                className="mt-8 w-full items-center justify-center rounded-xl bg-[#4F46E5] py-4 shadow-sm shadow-indigo-500/30"
                onPress={() => route.push("/home")}
              >
                <Text className="text-[16px] font-bold text-white">
                  Create account
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-4 mt-8">
            <Text className="text-center text-[14px] text-slate-500">
              Already have an account?{" "}
              <Text
                className="font-bold text-[#4F46E5]"
                onPress={() => route.push("/signin")}
              >
                Log in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
