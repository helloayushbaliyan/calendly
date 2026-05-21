import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * CreateContact Screen
 * 
 * Beautifully designed to align with the Contacts screen layout and brand identity.
 * 
 * Design Features:
 * 1. Matching Background [#F8FAFC].
 * 2. Premium Indigo Header with [#4F46E5] theme and deep [rounded-b-[40px]] border-radius.
 * 3. Elevated white cards [rounded-[24px]] and gray-50 border accents.
 * 4. Premium Circular Profile Avatar uploader mockup with dynamic initials and edit badge.
 * 5. Indigo CTA Button with chevron-arrow right, matching the fixed CreateEvent button.
 */
export default function CreateContact() {
  const router = useRouter();

  // Input states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const getInitials = () => {
    const f = firstName.trim().charAt(0).toUpperCase();
    const l = lastName.trim().charAt(0).toUpperCase();
    return `${f}${l}` || "?";
  };

  const handleCreate = () => {
    if (!firstName.trim()) {
      Alert.alert("Required Info", "Please enter a first name.");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      Alert.alert("Required Info", "Please provide either an email address or a phone number.");
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    Alert.alert(
      "Contact Created 🎉",
      `"${fullName}" has been added to your contacts.`,
      [{ text: "Awesome!", onPress: () => router.back() }]
    );
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Premium Indigo Header - Matched with Contacts/CreateEvent screen */}
        <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8 mb-6 shadow-md shadow-indigo-500/20">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="w-10 h-10 bg-white/10 rounded-full items-center justify-center mr-4"
            >
              <Feather name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-[28px] font-bold text-white">New Contact</Text>
          </View>
        </View>

        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 60 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar Section */}
          <View className="items-center mb-6">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Alert.alert("Avatar Upload", "In a real app, this opens the camera roll to pick a contact photo.")}
              className="w-24 h-24 rounded-full bg-indigo-50 items-center justify-center border border-indigo-100 shadow-sm relative"
            >
              <Text className="text-[28px] font-bold text-[#4F46E5] tracking-wide">
                {getInitials()}
              </Text>
              
              {/* Photo Edit Badge */}
              <View className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#4F46E5] border-2 border-white items-center justify-center shadow-md">
                <Feather name="camera" size={14} color="white" />
              </View>
            </TouchableOpacity>
            <Text className="text-[12px] font-semibold text-gray-500 mt-3">
              TAP TO ADD PHOTO
            </Text>
          </View>

          {/* Card 1: Name & Company */}
          <View className="bg-white rounded-[24px] p-5 mb-4 shadow-sm border border-gray-50">
            <Text className="text-[17px] font-bold text-gray-900 mb-4">
              Profile Details
            </Text>

            {/* First Name */}
            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">
              FIRST NAME
            </Text>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder="e.g. John"
              placeholderTextColor="#94a3b8"
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 text-[15px] text-gray-800 mb-4 focus:border-[#4F46E5]"
            />

            {/* Last Name */}
            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">
              LAST NAME
            </Text>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder="e.g. Doe"
              placeholderTextColor="#94a3b8"
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 text-[15px] text-gray-800 mb-4 focus:border-[#4F46E5]"
            />

            {/* Company */}
            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">
              COMPANY
            </Text>
            <TextInput
              value={company}
              onChangeText={setCompany}
              placeholder="e.g. Acme Corp"
              placeholderTextColor="#94a3b8"
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 text-[15px] text-gray-800 mb-4 focus:border-[#4F46E5]"
            />

            {/* Job Title */}
            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">
              JOB TITLE
            </Text>
            <TextInput
              value={jobTitle}
              onChangeText={setJobTitle}
              placeholder="e.g. Senior Designer"
              placeholderTextColor="#94a3b8"
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 text-[15px] text-gray-800 focus:border-[#4F46E5]"
            />
          </View>

          {/* Card 2: Contact Information */}
          <View className="bg-white rounded-[24px] p-5 mb-6 shadow-sm border border-gray-50">
            <Text className="text-[17px] font-bold text-gray-900 mb-4">
              Contact Info
            </Text>

            {/* Email */}
            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">
              EMAIL ADDRESS
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="e.g. john.doe@example.com"
              placeholderTextColor="#94a3b8"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 text-[15px] text-gray-800 mb-4 focus:border-[#4F46E5]"
            />

            {/* Phone */}
            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">
              PHONE NUMBER
            </Text>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="e.g. +1 (555) 000-0000"
              placeholderTextColor="#94a3b8"
              keyboardType="phone-pad"
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 text-[15px] text-gray-800 focus:border-[#4F46E5]"
            />
          </View>

          {/* Premium Indigo Create Button - Matched Card design & shadows */}
          <TouchableOpacity
            onPress={handleCreate}
            activeOpacity={0.8}
            className="bg-[#4F46E5] rounded-[24px] py-4 px-6 shadow-lg shadow-indigo-500/30 flex-row items-center justify-center mb-6 gap-x-2"
          >
            <Text className="text-white font-bold text-[16px] tracking-wide">
              Create Contact
            </Text>
            <Feather name="arrow-right" size={18} color="white" />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
