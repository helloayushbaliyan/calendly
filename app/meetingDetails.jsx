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

export default function MeetingDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Retrieve parameters passed via navigation
  const {
    id,
    title = "No Title",
    name = "Unknown Organizer",
    time = "N/A",
    color = "#4F46E5",
    platform = "Google Meet",
    avatar = "https://i.pravatar.cc/150?img=49",
    status = "CONFIRMED",
    date = "N/A",
  } = params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Meeting Invitation: "${title}" with ${name} on ${date} at ${time}. Link: https://meet.google.com/abc-defg-hij`,
      });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleCopyLink = () => {
    Alert.alert("Link Copied", "Meeting link has been copied to your clipboard!");
  };

  const handleEmailOrganizer = () => {
    Alert.alert("Email Sent", `Opening email draft to ${name}...`);
  };

  const handleAddToCalendar = () => {
    Alert.alert("Calendar Synced", "Meeting has been added to your local device calendar.");
  };

  const handleJoinMeeting = () => {
    Alert.alert(
      "Launching Meeting",
      `Connecting to your ${platform === "Zoom Meeting" ? "Zoom Room" : "Google Meet"}...`
    );
  };

  const handleReschedule = () => {
    Alert.alert("Reschedule", `Rescheduling "${title}" with ${name}...`);
  };

  const handleCancelMeeting = () => {
    Alert.alert(
      "Cancel Meeting",
      `Are you sure you want to cancel "${title}"?`,
      [
        { text: "No, Keep It", style: "cancel" },
        {
          text: "Yes, Cancel It",
          style: "destructive",
          onPress: () => {
            Alert.alert("Meeting Cancelled", "The meeting has been removed.");
            router.back();
          },
        },
      ]
    );
  };

  const handleViewContact = () => {
    // Map known contacts
    let contactParams = {
      id: "99",
      name: name,
      email: "contact@" + name.toLowerCase().replace(/\s+/g, "") + ".com",
      phone: "+91 98765 43210",
      company: "Acme Partners",
      role: "Professional Partner",
      avatar: avatar,
    };

    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes("ayush")) {
      contactParams = {
        id: 1,
        name: "Ayush Baliyan",
        email: "baliyan2809@gmail.com",
        phone: "+91 99999 88888",
        company: "Calendly Corp",
        role: "Founder",
        avatar: "https://i.pravatar.cc/150?img=11",
      };
    } else if (lowercaseName.includes("pawan")) {
      contactParams = {
        id: 2,
        name: "Pawan Kumar",
        email: "pawan.kumar@gmail.com",
        phone: "+91 98765 43210",
        company: "Acme Corp",
        role: "Maths Teacher",
        avatar: "https://i.pravatar.cc/150?img=12",
      };
    } else if (lowercaseName.includes("sarah")) {
      contactParams = {
        id: 3,
        name: "Sarah Jenkins",
        email: "sarah.j@techflow.io",
        phone: "+1 (555) 123-4567",
        company: "TechFlow",
        role: "Product Manager",
        avatar: "https://i.pravatar.cc/150?img=49",
      };
    } else if (lowercaseName.includes("michael")) {
      contactParams = {
        id: 4,
        name: "Michael Chen",
        email: "m.chen@designhub.co",
        phone: "+1 (555) 765-4321",
        company: "DesignHub",
        role: "Creative Director",
        avatar: "https://i.pravatar.cc/150?img=33",
      };
    } else if (lowercaseName.includes("elena")) {
      contactParams = {
        id: 5,
        name: "Elena Rodriguez",
        email: "elena.r@designco.com",
        phone: "+1 (555) 321-7654",
        company: "DesignCo",
        role: "Lead UX Designer",
        avatar: "https://i.pravatar.cc/150?img=47",
      };
    }

    router.push({
      pathname: "/contactDetails",
      params: contactParams,
    });
  };

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Premium Indigo Header - Matched with other screens */}
      <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8 mb-6 shadow-md shadow-indigo-500/20">
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center mr-4"
          >
            <Feather name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-[28px] font-bold text-white">Meeting Details</Text>
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
            <Image
              source={{ uri: avatar }}
              className="w-24 h-24 rounded-full border-4 border-white bg-slate-100 shadow-md"
            />
            {/* Status Indicator Badge */}
            <View className="absolute bottom-0 right-0 bg-emerald-500 border-2 border-white w-6 h-6 rounded-full items-center justify-center">
              <Feather name="check" size={12} color="white" />
            </View>
          </View>

          <Text className="text-[22px] font-bold text-slate-800 mb-1 text-center">
            {name}
          </Text>
          <Text className="text-[14px] font-semibold text-slate-400 mb-3 text-center">
            Organizer
          </Text>

          <View className="bg-emerald-50 px-4 py-1.5 rounded-full mb-2">
            <Text className="text-[11px] font-bold text-emerald-600 tracking-wider">
              {status}
            </Text>
          </View>

          {/* View Contact Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleViewContact}
            className="mt-3 flex-row items-center bg-indigo-50/70 active:bg-indigo-100 px-5 py-2.5 rounded-2xl"
          >
            <Feather name="user" size={14} color="#4F46E5" />
            <Text className="text-[12px] font-bold text-[#4F46E5] ml-2">
              View Contact Profile
            </Text>
            <Feather name="chevron-right" size={12} color="#4F46E5" className="ml-1" />
          </TouchableOpacity>
        </View>

        {/* Meeting Information Section */}
        <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2 uppercase">
          Meeting Info
        </Text>
        <View className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100/80 mb-6 gap-y-4">
          {/* Meeting Title */}
          <View className="flex-row items-start">
            <View
              className="w-8 h-8 rounded-full items-center justify-center mt-0.5"
              style={{ backgroundColor: `${color}15` }}
            >
              <View
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: color }}
              />
            </View>
            <View className="flex-1 ml-3.5">
              <Text className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Event Type
              </Text>
              <Text className="text-[16px] font-bold text-slate-800 mt-0.5">
                {title}
              </Text>
            </View>
          </View>

          {/* Date Row */}
          <View className="flex-row items-start">
            <View
              className="w-8 h-8 rounded-full items-center justify-center"
              style={{ backgroundColor: `${color}15` }}
            >
              <Feather name="calendar" size={16} color={color} />
            </View>
            <View className="flex-1 ml-3.5">
              <Text className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Date
              </Text>
              <Text className="text-[16px] font-bold text-slate-800 mt-0.5">
                {date}
              </Text>
            </View>
          </View>

          {/* Time Row */}
          <View className="flex-row items-start">
            <View
              className="w-8 h-8 rounded-full items-center justify-center"
              style={{ backgroundColor: `${color}15` }}
            >
              <Feather name="clock" size={16} color={color} />
            </View>
            <View className="flex-1 ml-3.5">
              <Text className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Time (Duration)
              </Text>
              <Text className="text-[16px] font-bold text-slate-800 mt-0.5">
                {time} (30 minutes)
              </Text>
            </View>
          </View>

          {/* Platform Row */}
          <View className="flex-row items-start">
            <View
              className="w-8 h-8 rounded-full items-center justify-center"
              style={{ backgroundColor: `${color}15` }}
            >
              <Feather name="video" size={16} color={color} />
            </View>
            <View className="flex-1 ml-3.5">
              <Text className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                Location / Video App
              </Text>
              <Text className="text-[16px] font-bold text-slate-800 mt-0.5">
                {platform}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions Section */}
        <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2 uppercase">
          Quick Actions
        </Text>

        <View className="mb-6">
          {/* Primary Join Meeting CTA */}
          <TouchableOpacity
            onPress={handleJoinMeeting}
            activeOpacity={0.8}
            className="bg-[#4F46E5] rounded-[24px] py-4 px-6 shadow-lg shadow-indigo-500/30 flex-row items-center justify-center gap-x-2 mb-4"
          >
            <Feather name="video" size={20} color="white" />
            <Text className="text-white font-bold text-[16px] tracking-wide">
              Join via {platform === "Zoom Meeting" ? "Zoom" : "Google Meet"}
            </Text>
          </TouchableOpacity>

          {/* Action List items matching flat layout */}
          <View className="bg-white rounded-[28px] px-5 py-2 shadow-sm border border-slate-100/80">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleCopyLink}
              className="flex-row items-center py-3.5 border-b border-slate-50"
            >
              <Feather name="copy" size={22} color="#1d4ed8" />
              <Text className="text-[16px] font-semibold text-slate-700 ml-4 flex-1">
                Copy meeting link
              </Text>
              <Feather name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleEmailOrganizer}
              className="flex-row items-center py-3.5 border-b border-slate-50"
            >
              <Feather name="mail" size={22} color="#1d4ed8" />
              <Text className="text-[16px] font-semibold text-slate-700 ml-4 flex-1">
                Email organizer
              </Text>
              <Feather name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleAddToCalendar}
              className="flex-row items-center py-3.5 border-b border-slate-50"
            >
              <Feather name="calendar" size={22} color="#1d4ed8" />
              <Text className="text-[16px] font-semibold text-slate-700 ml-4 flex-1">
                Add to device calendar
              </Text>
              <Feather name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleShare}
              className="flex-row items-center py-3.5"
            >
              <Feather name="share-2" size={22} color="#1d4ed8" />
              <Text className="text-[16px] font-semibold text-slate-700 ml-4 flex-1">
                Share invitation details
              </Text>
              <Feather name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Management Controls */}
        <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2 uppercase">
          Management
        </Text>
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleReschedule}
            className="flex-1 py-4 border border-slate-200 rounded-2xl mr-2 items-center justify-center bg-white shadow-sm"
          >
            <Text className="text-[14px] font-bold text-slate-700">
              Reschedule
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleCancelMeeting}
            className="flex-1 py-4 bg-red-50 active:bg-red-100 rounded-2xl ml-2 items-center justify-center shadow-sm"
          >
            <Text className="text-[14px] font-bold text-red-600">
              Cancel Meeting
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
