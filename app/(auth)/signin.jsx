import { Feather, Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import logo from "../../assets/images/logo.png";
import { SignInUser } from "../../lib/services/authService";
import { login } from "../../store/authSlice";
import { signinSchema } from "../../utils/authSchema";

const index = () => {
  const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema)
  });

  const onsubmit = async (formData) => {
    console.log(formData);
    try {
      const data = await SignInUser(
        formData.email, formData.password
      )
      if (data) {
        dispatch(login({ session: data.session, user: data.session.user }))
        // route.replace("/home")
      }
    } catch (error) {
      console.log("error: ", error)
    }

  }

  return (
    <View className="flex-1 bg-[#F5F7FB]">
      <View className="absolute top-0 h-[45%] w-full rounded-b-[40px] bg-[#4F46E5]">
        <SafeAreaView edges={["top"]} className="flex-1">
          <View className="mt-16 items-center justify-center">
            <View className="flex-1 items-center justify-top">
              <Image
                source={logo}
                className="h-[130px] w-[250px]"
                resizeMode="contain"
              />
            </View>
          </View>
        </SafeAreaView>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" || "android" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeAreaView edges={["bottom"]} className="flex-1 justify-end pb-4">
          <View className="mx-5 rounded-[30px] border border-gray-100 bg-white p-6 shadow-sm">
            <Text className="mt-2 text-[26px] font-bold text-slate-900">
              Welcome back
            </Text>
            <Text className="mt-2 text-[15px] text-slate-500">
              Sign in to continue to Scedly
            </Text>

            <View className="mt-6">
              <Text className="mb-2 text-[14px] font-medium text-slate-700">
                Email Address
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5">
                    <Feather name="mail" size={20} color="#94A3B8" />
                    <TextInput
                      className="ml-3 flex-1 text-[16px] text-slate-900"
                      placeholder="name@example.com"
                      placeholderTextColor="#94A3B8"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text className="text-red-500">{errors.email.message}</Text>
              )}

              <Text className="mb-2 mt-4 text-[14px] font-medium text-slate-700">
                Password
              </Text>
              <Controller control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <View className="flex-row items-center rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3.5">
                    <Feather name="lock" size={20} color="#94A3B8" />
                    <TextInput
                      className="ml-3 flex-1 text-[16px] text-slate-900"
                      placeholder="••••••••"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      value={value}
                      onChangeText={onChange}
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
                )} />
              {errors.password && (
                <Text className="text-red-500">{errors.password.message}</Text>
              )}

              <View className="mt-4 flex-row items-center justify-between">
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => setRememberMe(!rememberMe)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={rememberMe ? "checkbox" : "square-outline"}
                    size={22}
                    color={rememberMe ? "#4F46E5" : "#94A3B8"}
                  />
                  <Text className="ml-2 text-[14px] text-slate-600">
                    Remember me
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => route.push("/forgot-password")}
                >
                  <Text className="text-[14px] font-medium text-[#4F46E5]">
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                className="mt-6 w-full items-center justify-center rounded-xl bg-[#4F46E5] py-3.5 shadow-sm shadow-indigo-500/30"
                onPress={handleSubmit(onsubmit)}
              >
                <Text className="text-[16px] font-bold text-white">Log in</Text>
              </TouchableOpacity>

              <View className="my-4 flex-row items-center">
                <View className="h-[1px] flex-1 bg-gray-200" />
                <Text className="mx-4 text-[13px] font-medium text-gray-400">
                  Or continue with
                </Text>
                <View className="h-[1px] flex-1 bg-gray-200" />
              </View>

              <TouchableOpacity
                activeOpacity={0.85}
                className="w-full flex-row items-center justify-center rounded-xl border border-gray-200 bg-white py-3.5"
              >
                <Text className="mr-2 text-[20px] font-bold text-[#EA4335]">
                  G
                </Text>
                <Text className="text-[15px] font-semibold text-slate-700">
                  Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-2 mt-6">
            <Text className="text-center text-[14px] text-slate-500">
              Don't have an account?{" "}
              <Text
                className="font-bold text-[#4F46E5]"
                onPress={() => route.push("/signup")}
              >
                Create account
              </Text>
            </Text>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
