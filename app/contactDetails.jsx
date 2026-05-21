import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ContactDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Retrieve contact data passed via params
  const {
    id = "0",
    name = "Unknown Contact",
    email = "N/A",
    phone = "+91 98765 43210",
    company = "Calendly Partner",
    role = "Client",
    avatar = "https://i.pravatar.cc/150?img=11",
  } = params;

  // Retrieve dynamic upcoming meeting based on contact name
  const getUpcomingMeeting = () => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes("pawan")) {
      return {
        id: 2,
        title: "maths class",
        time: "Tomorrow • 11:00 AM - 11:45 AM",
        color: "#F59E0B", // Amber
        platform: "Google Meet",
        status: "CONFIRMED",
      };
    } else if (lowercaseName.includes("ayush")) {
      return {
        id: 5,
        title: "Freelance Review",
        time: "Monday, May 25 • 2:00 PM - 2:30 PM",
        color: "#10B981", // Emerald
        platform: "Zoom Meeting",
        status: "CONFIRMED",
      };
    } else if (lowercaseName.includes("sarah")) {
      return {
        id: 1,
        title: "Initial Discovery Call",
        time: "Thursday, May 21 • 9:00 AM - 9:30 AM",
        color: "#4F46E5", // Indigo
        platform: "Google Meet",
        status: "CONFIRMED",
      };
    } else if (lowercaseName.includes("michael")) {
      return {
        id: 2,
        title: "Product Demo",
        time: "Thursday, May 21 • 1:00 PM - 2:00 PM",
        color: "#F59E0B", // Orange
        platform: "Zoom Meeting",
        status: "CONFIRMED",
      };
    }
    // Default fallback meeting
    return {
      id: 99,
      title: "Introductory Meeting",
      time: "Next Tuesday • 3:00 PM - 3:30 PM",
      color: "#8B5CF6", // Purple
      platform: "Google Meet",
      status: "TENTATIVE",
    };
  };

  const meeting = getUpcomingMeeting();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Contact Card: ${name}\nRole: ${role} at ${company}\nEmail: ${email}\nPhone: ${phone}`,
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleCall = () => {
    Alert.alert("Phone Dialing", `Opening device phone dialer to call ${name} (${phone})...`);
  };

  const handleEmail = () => {
    Alert.alert("Email Composer", `Opening default email draft to ${name} (${email})...`);
  };

  const handleBookMeeting = () => {
    router.push("/createEvent");
  };

  const handleEditContact = () => {
    Alert.alert("Edit Contact", `Editing contact card for "${name}"...`);
  };

  const handleOpenMeetingDetails = () => {
    router.push({
      pathname: "/meetingDetails",
      params: {
        id: meeting.id,
        title: meeting.title,
        name: name,
        time: meeting.time,
        color: meeting.color,
        platform: meeting.platform,
        avatar: avatar,
        status: meeting.status,
        date: meeting.time.split(" • ")[0],
      },
    });
  };

  // Get initials for profile placeholder fallback
  const getInitials = () => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Premium Indigo Header - Matched styling */}
      <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8 mb-6 shadow-md shadow-indigo-500/20">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center mr-4"
          >
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-[28px] font-bold text-white">Contact Details</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
        className="flex-1 px-6"
      >
        {/* Profile Card & Avatar */}
        <View className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100/80 items-center mb-6">
          <View className="relative mb-4">
            {avatar && avatar.startsWith("http") ? (
              <Image
                source={{ uri: avatar }}
                className="w-24 h-24 rounded-full border-4 border-white bg-slate-100 shadow-md"
              />
            ) : (
              <View className="w-24 h-24 rounded-full border-4 border-white bg-indigo-50 items-center justify-center shadow-md">
                <Text className="text-[28px] font-bold text-[#4F46E5]">
                  {getInitials()}
                </Text>
              </View>
            )}
            {/* dynamic role icon badge */}
            <View className="absolute bottom-0 right-0 bg-[#4F46E5] border-2 border-white w-7 h-7 rounded-full items-center justify-center shadow">
              <Feather name="briefcase" size={12} color="white" />
            </View>
          </View>

          <Text className="text-[22px] font-bold text-slate-800 mb-1 text-center">
            {name}
          </Text>
          <Text className="text-[14px] font-semibold text-slate-400 mb-4 text-center">
            {role} • {company}
          </Text>

          {/* Quick Action Dial / Email Pill buttons */}
          <View className="flex-row gap-x-3 w-full px-4">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleCall}
              className="flex-1 flex-row items-center justify-center py-3 bg-indigo-50/70 active:bg-indigo-100 rounded-xl"
            >
              <Feather name="phone" size={16} color="#4F46E5" />
              <Text className="text-[13px] font-bold text-[#4F46E5] ml-2">Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleEmail}
              className="flex-1 flex-row items-center justify-center py-3 bg-indigo-50/70 active:bg-indigo-100 rounded-xl"
            >
              <Feather name="mail" size={16} color="#4F46E5" />
              <Text className="text-[13px] font-bold text-[#4F46E5] ml-2">Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Info Card */}
        <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2 uppercase">
          Contact Info
        </Text>
        <View className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100/80 mb-6 gap-y-4">
          {/* Email Row */}
          <View className="flex-row items-start">
            <View className="w-8 h-8 rounded-full items-center justify-center bg-indigo-50/80">
              <Feather name="mail" size={16} color="#4F46E5" />
            </View>
            <View className="flex-1 ml-3.5">
              <Text className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Email Address
              </Text>
              <Text className="text-[16px] font-semibold text-slate-700 mt-0.5" numberOfLines={1}>
                {email}
              </Text>
            </View>
          </View>

          {/* Phone Row */}
          <View className="flex-row items-start">
            <View className="w-8 h-8 rounded-full items-center justify-center bg-indigo-50/80">
              <Feather name="phone" size={16} color="#4F46E5" />
            </View>
            <View className="flex-1 ml-3.5">
              <Text className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Phone Number
              </Text>
              <Text className="text-[16px] font-semibold text-slate-700 mt-0.5">
                {phone}
              </Text>
            </View>
          </View>

          {/* Org Row */}
          <View className="flex-row items-start">
            <View className="w-8 h-8 rounded-full items-center justify-center bg-indigo-50/80">
              <Feather name="globe" size={16} color="#4F46E5" />
            </View>
            <View className="flex-1 ml-3.5">
              <Text className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Organization
              </Text>
              <Text className="text-[16px] font-semibold text-slate-700 mt-0.5">
                {company} ({role})
              </Text>
            </View>
          </View>
        </View>

        {/* Dynamic Upcoming Meeting Card */}
        <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2 uppercase">
          Upcoming Meeting
        </Text>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleOpenMeetingDetails}
          className="bg-white rounded-[32px] p-5 shadow-sm border border-slate-100/80 flex-col overflow-hidden mb-6"
          style={{ borderLeftWidth: 4, borderLeftColor: meeting.color }}
        >
          {/* Meeting header */}
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center flex-1 mr-2">
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: `${meeting.color}15` }}
              >
                <Feather name="calendar" size={18} color={meeting.color} />
              </View>
              <View className="flex-1">
                <Text className="text-[16px] font-bold text-slate-800" numberOfLines={1}>
                  {meeting.title}
                </Text>
                <Text className="text-[13px] font-semibold text-slate-400 mt-0.5">
                  Scheduled with you
                </Text>
              </View>
            </View>
            {/* Status Badge */}
            <View className="bg-emerald-50 px-2.5 py-1 rounded-xl">
              <Text className="text-[10px] font-bold text-emerald-600 tracking-wider">
                {meeting.status}
              </Text>
            </View>
          </View>

          {/* Time Capsule */}
          <View className="bg-slate-50/70 rounded-2xl p-3.5 gap-y-2 mb-2">
            <View className="flex-row items-center">
              <Feather name="clock" size={14} color={meeting.color} />
              <Text className="text-[14px] font-semibold text-slate-700 ml-2.5">
                {meeting.time}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Feather name="video" size={14} color={meeting.color} />
              <Text className="text-[14px] font-semibold text-slate-700 ml-2.5">
                {meeting.platform}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions List Card */}
        <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2 uppercase">
          Quick Actions
        </Text>
        <View className="bg-white rounded-[28px] px-5 py-2 shadow-sm border border-slate-100/80 mb-6">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleBookMeeting}
            className="flex-row items-center py-3.5 border-b border-slate-50"
          >
            <Feather name="plus-circle" size={22} color="#1d4ed8" />
            <Text className="text-[16px] font-semibold text-slate-700 ml-4 flex-1">
              Book new meeting
            </Text>
            <Feather name="chevron-right" size={16} color="#cbd5e1" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleShare}
            className="flex-row items-center py-3.5 border-b border-slate-50"
          >
            <Feather name="share-2" size={22} color="#1d4ed8" />
            <Text className="text-[16px] font-semibold text-slate-700 ml-4 flex-1">
              Share contact details
            </Text>
            <Feather name="chevron-right" size={16} color="#cbd5e1" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleEditContact}
            className="flex-row items-center py-3.5"
          >
            <Feather name="edit-2" size={22} color="#1d4ed8" />
            <Text className="text-[16px] font-semibold text-slate-700 ml-4 flex-1">
              Edit contact info
            </Text>
            <Feather name="chevron-right" size={16} color="#cbd5e1" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
