import { Feather } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const CalenderScreen = () => {
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [selected, setSelected] = useState(formattedToday);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("All");

  const meetingDetailsSheetRef = useRef(null);
  const joinMeetingSheetRef = useRef(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isMeetingDetailsOpen, setIsMeetingDetailsOpen] = useState(false);
  const [isJoinMeetingOpen, setIsJoinMeetingOpen] = useState(false);

  // Android back press handler for Meeting Details Sheet
  useEffect(() => {
    if (!isMeetingDetailsOpen) return;

    const backAction = () => {
      meetingDetailsSheetRef.current?.dismiss();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isMeetingDetailsOpen]);

  // Android back press handler for Join Meeting Sheet
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

  const openMeetingDetails = useCallback((meeting) => {
    setSelectedMeeting(meeting);
    meetingDetailsSheetRef.current?.present();
  }, []);

  const openJoinMeeting = useCallback((meeting) => {
    setSelectedMeeting(meeting);
    joinMeetingSheetRef.current?.present();
  }, []);

  const handleAction = useCallback(
    (actionName) => {
      meetingDetailsSheetRef.current?.dismiss();
      Alert.alert(
        "Success",
        `${actionName} selected for "${selectedMeeting?.name}"!`
      );
    },
    [selectedMeeting]
  );

  const scheduleData = [
    {
      date: "Tuesday, May 19",
      isToday: true,
      data: [],
    },
    {
      date: "Thursday, May 21",
      data: [
        {
          id: 1,
          title: "Initial Discovery Call",
          name: "Sarah Jenkins",
          time: "9:00 AM - 9:30 AM",
          color: "#4F46E5", // Elegant Indigo
          platform: "Google Meet",
          avatar: "https://i.pravatar.cc/150?img=49",
          status: "CONFIRMED",
        },
        {
          id: 2,
          title: "Product Demo",
          name: "Michael Chen",
          time: "1:00 PM - 2:00 PM",
          color: "#F59E0B", // Elegant Orange
          platform: "Zoom Meeting",
          avatar: "https://i.pravatar.cc/150?img=12",
          status: "CONFIRMED",
        },
      ],
    },
    {
      date: "Friday, May 22",
      data: [
        {
          id: 3,
          title: "Portfolio Review",
          name: "Elena Rodriguez",
          time: "02:30 PM - 03:30 PM",
          color: "#10B981", // Emerald
          platform: "Google Meet",
          avatar: "https://i.pravatar.cc/150?img=47",
          status: "CONFIRMED",
        },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Premium Header */}
      <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8 mb-6 shadow-md shadow-indigo-500/20">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => setIsCalendarVisible(!isCalendarVisible)}
            activeOpacity={0.7}
          >
            <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
              <Feather name="calendar" size={18} color="white" />
            </View>
            <Text className="text-[26px] font-bold text-white mr-2">
              May 2026
            </Text>
            <Feather
              name={isCalendarVisible ? "chevron-up" : "chevron-down"}
              size={22}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity className="w-10 h-10 bg-white/10 rounded-full items-center justify-center relative">
            <Feather name="bell" size={20} color="white" />
            <View className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full border border-[#5B4CF0]" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Tabs */}
      <View className="px-6 mb-6">
        <View className="flex-row bg-white rounded-full p-1 shadow-sm border border-gray-100">
          {["All", "Upcoming", "Completed"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 items-center py-2.5 rounded-full ${
                activeTab === tab ? "bg-[#4F46E5]" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-[14px] font-bold ${
                  activeTab === tab ? "text-white" : "text-gray-500"
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Calendar Dropdown */}
        {isCalendarVisible && (
          <View className="px-6 mb-8">
            <View className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-50 overflow-hidden">
              <Calendar
                current={selected}
                onDayPress={(day) => setSelected(day.dateString)}
                theme={{
                  backgroundColor: "#ffffff",
                  calendarBackground: "#ffffff",
                  textSectionTitleColor: "#9CA3AF",
                  selectedDayBackgroundColor: "#5B4CF0",
                  selectedDayTextColor: "#ffffff",
                  todayTextColor: "#5B4CF0",
                  dayTextColor: "#1F2937",
                  textDisabledColor: "#D1D5DB",
                  dotColor: "#5B4CF0",
                  selectedDotColor: "#ffffff",
                  arrowColor: "#4B5563",
                  monthTextColor: "#1F2937",
                  textDayFontWeight: "600",
                  textMonthFontWeight: "bold",
                  textDayHeaderFontWeight: "600",
                  "stylesheet.calendar.header": {
                    header: {
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 20,
                    },
                    monthText: {
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#1F2937",
                      marginLeft: 10,
                    },
                  },
                }}
                markedDates={{
                  "2026-05-21": { marked: true, dotColor: "#5B4CF0" },
                  "2026-05-22": { marked: true, dotColor: "#F59E0B" },
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    marked: true,
                    dotColor: "white",
                  },
                }}
                renderArrow={(direction) => (
                  <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center">
                    <Feather
                      name={
                        direction === "left" ? "chevron-left" : "chevron-right"
                      }
                      size={16}
                      color="#4B5563"
                    />
                  </View>
                )}
              />
            </View>
          </View>
        )}

        {/* Schedule List */}
        <View className="flex-1">
          {scheduleData.map((group, index) => (
            <View key={index} className="mb-6">
              {/* Date Header */}
              <View className="px-6 mb-4">
                <View className="flex-row items-center mb-2">
                  <Text className="text-[13px] font-bold text-gray-400 uppercase tracking-wider">
                    {group.date}
                  </Text>
                  {group.isToday && (
                    <View className="bg-indigo-50 px-2 py-0.5 rounded ml-2">
                      <Text className="text-[11px] font-bold text-[#5B4CF0] uppercase">
                        Today
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Meetings */}
              {group.data.length === 0 ? (
                <View className="px-6 mb-2">
                  <View className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-50 items-center justify-center">
                    <Feather
                      name="coffee"
                      size={24}
                      color="#D1D5DB"
                      className="mb-3"
                    />
                    <Text className="text-[15px] text-gray-500 font-medium">
                      No meetings scheduled today.
                    </Text>
                  </View>
                </View>
              ) : (
                <View className="px-6 gap-y-4">
                  {group.data.map((meeting) => (
                    <TouchableOpacity
                      key={meeting.id}
                      activeOpacity={0.9}
                      onPress={() => openMeetingDetails(meeting)}
                      className="bg-white rounded-[32px] p-5 shadow-sm border border-slate-100/80 flex-col overflow-hidden"
                      style={{ borderLeftWidth: 4, borderLeftColor: meeting.color }}
                    >
                      {/* Top Header Row */}
                      <View className="flex-row items-center justify-between mb-4">
                        <View className="flex-row items-center flex-1 mr-2">
                          <Image
                            source={{ uri: meeting.avatar }}
                            className="w-11 h-11 rounded-full bg-slate-100 mr-3"
                          />
                          <View className="flex-1">
                            <Text className="text-[17px] font-bold text-slate-800" numberOfLines={1}>
                              {meeting.name}
                            </Text>
                            <View className="flex-row items-center mt-0.5">
                              <View
                                className="w-2.5 h-2.5 rounded-full mr-1.5"
                                style={{ backgroundColor: meeting.color }}
                              />
                              <Text className="text-[14px] font-medium text-slate-500" numberOfLines={1}>
                                {meeting.title}
                              </Text>
                            </View>
                          </View>
                        </View>

                        {/* Status Badge */}
                        <View className="bg-emerald-50/80 px-3 py-1.5 rounded-xl">
                          <Text className="text-[11px] font-bold text-emerald-600 tracking-wider">
                            {meeting.status}
                          </Text>
                        </View>
                      </View>

                      {/* Center Details Box */}
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => openJoinMeeting(meeting)}
                        className="bg-slate-50/70 active:bg-slate-100/70 rounded-2xl p-4 mb-4 gap-y-3"
                      >
                        <View className="flex-row items-center">
                          <Feather name="clock" size={16} color={meeting.color} />
                          <Text className="text-[15px] font-semibold text-slate-700 ml-3">
                            {meeting.time}
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Feather name="video" size={16} color={meeting.color} />
                          <Text className="text-[15px] font-semibold text-slate-700 ml-3">
                            {meeting.platform}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      {/* Bottom Button Row */}
                      <View className="flex-row items-center">
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => Alert.alert("Reschedule", `Rescheduling "${meeting.title}" with ${meeting.name}...`)}
                          className="flex-1 py-3 border border-slate-200 rounded-xl mr-2 items-center justify-center bg-white"
                        >
                          <Text className="text-[14px] font-bold text-slate-600">
                            Reschedule
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => openMeetingDetails(meeting)}
                          className="flex-1 py-3 bg-indigo-50/70 active:bg-indigo-100 rounded-xl ml-2 items-center justify-center"
                        >
                          <Text className="text-[14px] font-bold text-[#4F46E5]">
                            Details
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}

          <View className="px-6 mt-2 mb-10 items-center">
            <Text className="text-[13px] text-gray-400 font-medium">
              End of scheduled meetings
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity className="w-[64px] h-[64px] bg-[#5B4CF0] rounded-[24px] items-center justify-center shadow-lg shadow-indigo-500/40 border border-white/20">
          <Feather name="plus" size={32} color="white" />
        </TouchableOpacity>
      </View>

      {/* High-Fidelity Meeting Details Bottom Sheet */}
      <BottomSheetModal
        ref={meetingDetailsSheetRef}
        index={0}
        snapPoints={["60%"]}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        onChange={(index) => setIsMeetingDetailsOpen(index > -1)}
        backgroundStyle={{
          backgroundColor: "#ffffff",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#cbd5e1",
          width: 36,
          height: 4,
        }}
      >
        <BottomSheetView className="flex-1 px-6 pt-4 bg-white">
          {selectedMeeting && (
            <>
              {/* Header with Avatar and Status */}
              <View className="flex-row items-center justify-between mt-2 mb-4">
                <View className="flex-row items-center flex-1 mr-2">
                  <Image
                    source={{ uri: selectedMeeting.avatar }}
                    className="w-12 h-12 rounded-full bg-slate-100 mr-3"
                  />
                  <View className="flex-1">
                    <Text className="text-[18px] font-bold text-slate-800" numberOfLines={1}>
                      {selectedMeeting.name}
                    </Text>
                    <Text className="text-[13px] font-medium text-slate-400 mt-0.5">
                      Organizer
                    </Text>
                  </View>
                </View>
                <View className="bg-emerald-50/80 px-3 py-1.5 rounded-xl">
                  <Text className="text-[11px] font-bold text-emerald-600 tracking-wider">
                    {selectedMeeting.status}
                  </Text>
                </View>
              </View>

              {/* Title & Time Capsule */}
              <Text className="text-[20px] font-bold text-slate-800 mb-2">
                {selectedMeeting.title}
              </Text>
              
              <View className="bg-slate-50/80 rounded-2xl p-4 mb-4 gap-y-2.5">
                <View className="flex-row items-center">
                  <Feather name="calendar" size={16} color={selectedMeeting.color} />
                  <Text className="text-[14px] font-semibold text-slate-700 ml-3">
                    Thursday, May 21, 2026
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="clock" size={16} color={selectedMeeting.color} />
                  <Text className="text-[14px] font-semibold text-slate-700 ml-3">
                    {selectedMeeting.time} (30 mins)
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Feather name="video" size={16} color={selectedMeeting.color} />
                  <Text className="text-[14px] font-semibold text-slate-700 ml-3">
                    {selectedMeeting.platform}
                  </Text>
                </View>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
                {/* ACTIONS Section */}
                <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2">
                  ACTIONS
                </Text>

                <View className="mb-4">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      meetingDetailsSheetRef.current?.dismiss();
                      openJoinMeeting(selectedMeeting);
                    }}
                    className="flex-row items-center py-3.5"
                  >
                    <Feather name="video" size={22} color="#1d4ed8" />
                    <Text className="text-[16px] font-medium text-slate-700 ml-4">
                      Join meeting
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleAction("Copy meeting link")}
                    className="flex-row items-center py-3.5"
                  >
                    <Feather name="copy" size={22} color="#1d4ed8" />
                    <Text className="text-[16px] font-medium text-slate-700 ml-4">
                      Copy meeting link
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleAction("Email organizer")}
                    className="flex-row items-center py-3.5"
                  >
                    <Feather name="mail" size={22} color="#1d4ed8" />
                    <Text className="text-[16px] font-medium text-slate-700 ml-4">
                      Email organizer
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* MANAGEMENT Section */}
                <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2">
                  MANAGEMENT
                </Text>

                <View className="mb-4">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleAction("Reschedule")}
                    className="flex-row items-center py-3.5"
                  >
                    <Feather name="edit-2" size={22} color="#1d4ed8" />
                    <Text className="text-[16px] font-medium text-slate-700 ml-4">
                      Reschedule meeting
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleAction("Cancel meeting")}
                    className="flex-row items-center py-3.5"
                  >
                    <Feather name="trash-2" size={22} color="#ef4444" />
                    <Text className="text-[16px] font-medium text-red-600 ml-4">
                      Cancel meeting
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>

      {/* High-Fidelity Join Meeting Bottom Sheet */}
      <BottomSheetModal
        ref={joinMeetingSheetRef}
        index={0}
        snapPoints={["32%"]}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        onChange={(index) => setIsJoinMeetingOpen(index > -1)}
        backgroundStyle={{
          backgroundColor: "#ffffff",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#cbd5e1",
          width: 36,
          height: 4,
        }}
      >
        <BottomSheetView className="flex-1 px-6 pt-4 bg-white">
          {selectedMeeting && (
            <>
              {/* Title */}
              <Text className="text-[22px] font-bold text-slate-800 mt-2 mb-4">
                Join meeting
              </Text>

              <View className="mb-4">
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    joinMeetingSheetRef.current?.dismiss();
                    Alert.alert("Success", `Opening ${selectedMeeting.platform === "Zoom Meeting" ? "Zoom" : "Google Meet"} app...`);
                  }}
                  className="flex-row items-center py-3.5"
                >
                  <Feather name="video" size={22} color="#1d4ed8" />
                  <Text className="text-[16px] font-medium text-slate-700 ml-4">
                    Join via {selectedMeeting.platform === "Zoom Meeting" ? "Zoom" : "Google Meet"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    joinMeetingSheetRef.current?.dismiss();
                    Alert.alert("Success", "Meeting link copied to clipboard!");
                  }}
                  className="flex-row items-center py-3.5"
                >
                  <Feather name="copy" size={22} color="#1d4ed8" />
                  <Text className="text-[16px] font-medium text-slate-700 ml-4">
                    Copy meetings URL
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default CalenderScreen;
