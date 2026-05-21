import { Feather } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, BackHandler, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  const route = useRouter();
  const eventDetailsSheetRef = useRef(null);
  const joinMeetingSheetRef = useRef(null);

  // List of events
  const events = useMemo(() => [
    {
      id: 1,
      title: "freelance",
      subtitle: "One-on-one, Multiple durations",
      time: "Mon, Tue, Wed, Thu, Fri, Sat, Sun, 9 AM - 5 PM",
      initials: "HA",
      color: "#10B981", // Green
    },
    {
      id: 2,
      title: "maths class",
      subtitle: "One-on-one, Multiple durations",
      time: "Mon, Wed, Fri, 9 AM - 5 PM",
      initials: "MC",
      color: "#F59E0B", // Orange
    },
    {
      id: 3,
      title: "30 Minute Meeting",
      subtitle: "One-on-one, Multiple durations",
      time: "Mon, Wed, Fri, 9 AM - 5 PM, +1 more time",
      initials: "30",
      color: "#8B5CF6", // Purple
    },
  ], []);

  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isJoinMeetingOpen, setIsJoinMeetingOpen] = useState(false);

  // Android hardware back handler for Event Details Sheet
  useEffect(() => {
    if (!isEventDetailsOpen) return;

    const backAction = () => {
      eventDetailsSheetRef.current?.dismiss();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isEventDetailsOpen]);

  // Android hardware back handler for Join Meeting Sheet
  useEffect(() => {
    if (!isJoinMeetingOpen) return;

    const backAction = () => {
      joinMeetingSheetRef.current?.dismiss();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isJoinMeetingOpen]);

  // Backdrop component
  const renderBackdrop = useCallback(
    (backdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.3}
      />
    ),
    []
  );

  const openEventDetails = useCallback((event) => {
    setSelectedEvent(event);
    eventDetailsSheetRef.current?.present();
  }, []);

  const openJoinMeeting = useCallback(() => {
    joinMeetingSheetRef.current?.present();
  }, []);

  const handleAction = useCallback((actionName) => {
    eventDetailsSheetRef.current?.dismiss();
    Alert.alert("Success", `${actionName} selected for "${selectedEvent.title}"!`);
  }, [selectedEvent]);

  return (
    <View className="flex-1 bg-[#F5F7FB]">
      {/* Purple Header */}
      <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8">
        {/* User & Bell */}
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => route.push("/settings")}>
              <Image
                source={{ uri: "https://i.pravatar.cc/150?img=11" }}
                className="w-12 h-12 rounded-full border-2 border-white/20"
              />
            </TouchableOpacity>
            <View className="ml-3">
              <Text className="text-indigo-100 text-[13px] font-medium">
                Good morning,
              </Text>
              <Text className="text-white text-[18px] font-bold">
                Sarah Jenkins
              </Text>
            </View>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-white/10 rounded-full items-center justify-center">
            <Feather name="bell" size={20} color="#FFFFFF" />
            <View className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#4F46E5]" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View className="flex-row mt-8 gap-4">
          {/* Today */}
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Feather name="calendar" size={14} color="#6366F1" />
              <Text className="ml-1.5 text-gray-500 text-[11px] font-bold tracking-wider">
                TODAY
              </Text>
            </View>
            <View className="flex-row items-end">
              <Text className="text-[28px] font-bold text-gray-900 leading-none">
                4
              </Text>
              <Text className="text-gray-400 text-[13px] font-medium ml-2 mb-1">
                Meetings
              </Text>
            </View>
          </View>

          {/* Total */}
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center mb-2">
              <Feather name="bar-chart-2" size={14} color="#6366F1" />
              <Text className="ml-1.5 text-gray-500 text-[11px] font-bold tracking-wider">
                TOTAL
              </Text>
            </View>
            <View className="flex-row items-end">
              <Text className="text-[28px] font-bold text-gray-900 leading-none">
                28
              </Text>
              <Text className="text-gray-400 text-[13px] font-medium ml-2 mb-1">
                Bookings
              </Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Upcoming Today */}
        <View className="px-6 mt-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[18px] font-bold text-gray-900">
              Upcoming Today
            </Text>
            <TouchableOpacity>
              <Text className="text-[#4F46E5] text-[13px] font-medium">
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <View className="grid grid-cols-1 gap-4">
            {/* Card 1 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                route.push({
                  pathname: "/meetingDetails",
                  params: {
                    id: 101,
                    title: "Product Demo Call",
                    name: "Alex Thompson",
                    time: "10:00 AM - 10:30 AM",
                    color: "#4F46E5",
                    platform: "Google Meet",
                    avatar: "https://i.pravatar.cc/150?img=12",
                    status: "CONFIRMED",
                    date: "Today",
                  },
                })
              }
              className="bg-white rounded-3xl p-5 shadow-sm border-l-[4px] border-l-[#4F46E5]"
            >
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-[#4F46E5] text-[12px] font-bold">
                  10:00 AM - 10:30 AM
                </Text>
                <View className="bg-indigo-50 px-2.5 py-1 rounded-full">
                  <Text className="text-[#4F46E5] text-[11px] font-medium">
                    Google Meet
                  </Text>
                </View>
              </View>
              <Text className="text-[16px] font-bold text-gray-900 mb-4">
                Product Demo Call
              </Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=12" }}
                    className="w-8 h-8 rounded-full bg-gray-200"
                  />
                  <View className="ml-3">
                    <Text className="text-gray-900 text-[13px] font-bold">
                      Alex Thompson
                    </Text>
                    <Text className="text-gray-400 text-[11px]">Acme Corp</Text>
                  </View>
                </View>
                <View className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center">
                  <Feather name="more-horizontal" size={16} color="#9CA3AF" />
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 2 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                route.push({
                  pathname: "/meetingDetails",
                  params: {
                    id: 102,
                    title: "Quarterly Review",
                    name: "David Chen",
                    time: "1:00 PM - 2:00 PM",
                    color: "#9CA3AF",
                    platform: "Zoom Meeting",
                    avatar: "https://i.pravatar.cc/150?img=33",
                    status: "CONFIRMED",
                    date: "Today",
                  },
                })
              }
              className="bg-white rounded-3xl p-5 shadow-sm border-l-[4px] border-l-gray-400"
            >
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-500 text-[12px] font-bold">
                  1:00 PM - 2:00 PM
                </Text>
                <View className="bg-gray-100 px-2.5 py-1 rounded-full">
                  <Text className="text-gray-600 text-[11px] font-medium">
                    Zoom
                  </Text>
                </View>
              </View>
              <Text className="text-[16px] font-bold text-gray-900 mb-4">
                Quarterly Review
              </Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=33" }}
                    className="w-8 h-8 rounded-full bg-gray-200"
                  />
                  <View className="ml-3">
                    <Text className="text-gray-900 text-[13px] font-bold">
                      David Chen
                    </Text>
                    <Text className="text-gray-400 text-[11px]">TechFlow</Text>
                  </View>
                </View>
                <View className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center">
                  <Feather name="more-horizontal" size={16} color="#9CA3AF" />
                </View>
              </View>
            </TouchableOpacity>

            {/* Card 3 */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                route.push({
                  pathname: "/meetingDetails",
                  params: {
                    id: 103,
                    title: "Sync with Design Team",
                    name: "Elena Rodriguez",
                    time: "3:30 PM - 4:00 PM",
                    color: "#64748B",
                    platform: "Microsoft Teams",
                    avatar: "https://i.pravatar.cc/150?img=44",
                    status: "CONFIRMED",
                    date: "Today",
                  },
                })
              }
              className="bg-white rounded-3xl p-5 shadow-sm border-l-[4px] border-l-gray-400"
            >
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-500 text-[12px] font-bold">
                  3:30 PM - 4:00 PM
                </Text>
                <View className="bg-gray-100 px-2.5 py-1 rounded-full">
                  <Text className="text-gray-600 text-[11px] font-medium">
                    Teams
                  </Text>
                </View>
              </View>
              <Text className="text-[16px] font-bold text-gray-900 mb-4">
                Sync with Design Team
              </Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=44" }}
                    className="w-8 h-8 rounded-full bg-gray-200 z-20 border-2 border-white"
                  />
                  <Image
                    source={{ uri: "https://i.pravatar.cc/150?img=45" }}
                    className="w-8 h-8 rounded-full bg-gray-200 -ml-3 z-10 border-2 border-white"
                  />
                  <View className="w-8 h-8 rounded-full bg-gray-100 -ml-3 z-0 border-2 border-white items-center justify-center">
                    <Text className="text-[10px] font-bold text-gray-500">
                      +2
                    </Text>
                  </View>
                </View>
                <View className="w-8 h-8 bg-gray-50 rounded-full items-center justify-center">
                  <Feather name="more-horizontal" size={16} color="#9CA3AF" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Meeting Snapshot Section */}
        <View className="px-6 mt-6">
          <Text className="text-[18px] font-bold text-gray-900 mb-4">
            Meeting snapshot
          </Text>

          <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-3">
              TOMORROW
            </Text>

            {/* Title with Dot Indicator */}
            <View className="flex-row items-center justify-between mb-3">
              <View className="flex-row items-center">
                <View className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2.5" />
                <Text className="text-[16px] font-bold text-gray-900">
                  maths class
                </Text>
              </View>
              <Feather name="chevron-right" size={16} color="#9CA3AF" />
            </View>

            {/* Host Row */}
            <View className="flex-row items-center mb-3">
              <Feather name="users" size={14} color="#64748B" />
              <Text className="text-[13px] text-gray-500 font-medium ml-2">
                with <Text className="font-bold text-gray-700">Pawan</Text>
              </Text>
            </View>

            {/* Date & Time & App Row */}
            <View className="flex-row items-center mb-5">
              <Feather name="calendar" size={14} color="#64748B" />
              <Text className="text-[13px] text-gray-500 font-medium ml-2" numberOfLines={1}>
                May 22 • 11:00 - 11:45 AM • Google Meet
              </Text>
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() =>
                  route.push({
                    pathname: "/contactDetails",
                    params: {
                      id: 2,
                      name: "Pawan Kumar",
                      email: "pawan.kumar@gmail.com",
                      phone: "+91 98765 43210",
                      company: "Acme Corp",
                      role: "Maths Teacher",
                      avatar: "https://i.pravatar.cc/150?img=12",
                    },
                  })
                }
                className="flex-1 bg-gray-50 border border-gray-100 py-3 rounded-[16px] items-center justify-center active:bg-gray-100"
              >
                <Text className="text-[#4F46E5] font-bold text-[13px]">
                  View Contact
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={openJoinMeeting}
                className="flex-1 bg-[#4F46E5] py-3 rounded-[16px] items-center justify-center shadow-sm shadow-indigo-500/20 active:bg-indigo-700"
              >
                <Text className="text-white font-bold text-[13px]">
                  Join meeting
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Event Types Section */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[18px] font-bold text-gray-900">
              Event types
            </Text>
            <TouchableOpacity onPress={() => route.push("/events")}>
              <Text className="text-[#4F46E5] text-[13px] font-medium">
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <View className="gap-y-3">
            {events.map((event) => (
              <TouchableOpacity
                key={event.id}
                activeOpacity={0.7}
                onPress={() => openEventDetails(event)}
                className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex-row items-center justify-between"
                style={{ borderLeftWidth: 4, borderLeftColor: event.color }}
              >
                <View className="flex-1 mr-4">
                  <Text className="text-[16px] font-bold text-gray-900 mb-1">
                    {event.title}
                  </Text>
                  <Text className="text-[13px] text-gray-400 font-medium mb-1.5">
                    {event.subtitle}
                  </Text>
                  <Text className="text-[12px] text-gray-500 font-medium" numberOfLines={1}>
                    {event.time}
                  </Text>
                </View>
                <Feather name="chevron-right" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* High-Fidelity Event Details Bottom Sheet */}
      <BottomSheetModal
        ref={eventDetailsSheetRef}
        index={0}
        snapPoints={["55%"]}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        onChange={(index) => setIsEventDetailsOpen(index > -1)}
        backgroundStyle={{
          backgroundColor: "#ffffff", // Light theme white background
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#cbd5e1", // Slate-300 handle
          width: 36,
          height: 4,
        }}
      >
        <BottomSheetView className="flex-1 px-6 pt-4 bg-white">
          {/* Title */}
          <Text className="text-[22px] font-bold text-slate-800 mt-2 mb-1">
            {selectedEvent.title}
          </Text>
          {selectedEvent.subtitle && (
            <Text className="text-[13px] font-medium text-slate-400 mb-4">
              {selectedEvent.subtitle}
            </Text>
          )}

          <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            {/* SCHEDULING Section */}
            <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2">
              SCHEDULING
            </Text>

            <View className="mb-4">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleAction("Copy link")}
                className="flex-row items-center py-3.5"
              >
                <Feather name="copy" size={22} color="#1d4ed8" />
                <Text className="text-[16px] font-medium text-slate-700 ml-4">
                  Copy link
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleAction("Create single-use link")}
                className="flex-row items-center py-3.5"
              >
                <Feather name="zap" size={22} color="#1d4ed8" />
                <Text className="text-[16px] font-medium text-slate-700 ml-4">
                  Create single-use link
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleAction("Book meeting")}
                className="flex-row items-center py-3.5"
              >
                <Feather name="calendar" size={22} color="#1d4ed8" />
                <Text className="text-[16px] font-medium text-slate-700 ml-4">
                  Book meeting
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleAction("More share options")}
                className="flex-row items-center py-3.5"
              >
                <Feather name="share-2" size={22} color="#1d4ed8" />
                <Text className="text-[16px] font-medium text-slate-700 ml-4">
                  More share options
                </Text>
              </TouchableOpacity>
            </View>

            {/* CONFIGURE Section */}
            <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2">
              CONFIGURE
            </Text>

            <View className="mb-4">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleAction("Mark as favorite")}
                className="flex-row items-center py-3.5"
              >
                <Feather name="star" size={22} color="#1d4ed8" />
                <Text className="text-[16px] font-medium text-slate-700 ml-4">
                  Mark as favorite
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleAction("View booking page")}
                className="flex-row items-center py-3.5"
              >
                <Feather name="eye" size={22} color="#1d4ed8" />
                <Text className="text-[16px] font-medium text-slate-700 ml-4">
                  View booking page
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleAction("Edit event type")}
                className="flex-row items-center py-3.5"
              >
                <Feather name="edit-2" size={22} color="#1d4ed8" />
                <Text className="text-[16px] font-medium text-slate-700 ml-4">
                  Edit event type
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>

      {/* High-Fidelity Join Meeting Bottom Sheet */}
      <BottomSheetModal
        ref={joinMeetingSheetRef}
        index={0}
        snapPoints={["30%"]}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        onChange={(index) => setIsJoinMeetingOpen(index > -1)}
        backgroundStyle={{
          backgroundColor: "#ffffff", // Light theme white background
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#cbd5e1", // Slate-300 handle
          width: 36,
          height: 4,
        }}
      >
        <BottomSheetView className="flex-1 px-6 pt-4 bg-white">
          {/* Title */}
          <Text className="text-[22px] font-bold text-slate-800 mt-2 mb-4">
            Join meeting
          </Text>

          <View className="mb-4">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                joinMeetingSheetRef.current?.dismiss();
                Alert.alert("Success", "Opening Google Meet app...");
              }}
              className="flex-row items-center py-3.5"
            >
              <Feather name="video" size={22} color="#1d4ed8" />
              <Text className="text-[16px] font-medium text-slate-700 ml-4">
                Join meeting on Google Meet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                joinMeetingSheetRef.current?.dismiss();
                Alert.alert("Success", "Meetings URL copied to clipboard!");
              }}
              className="flex-row items-center py-3.5"
            >
              <Feather name="copy" size={22} color="#1d4ed8" />
              <Text className="text-[16px] font-medium text-slate-700 ml-4">
                Copy meetings URL
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default Home;
