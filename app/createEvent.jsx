import { Feather } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  BackHandler,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

/**
 * CreateEvent Screen
 * 
 * Beautifully styled to align with the Contacts screen layout and brand identity.
 * 
 * Brand Design Match:
 * 1. Clean background [#F8FAFC].
 * 2. Premium unified Header with [#4F46E5] Indigo theme and deep [rounded-b-[40px]] border-radius.
 * 3. Elevated cards with [rounded-[24px]] borders and gray-50 outline.
 * 4. Custom selector chips and CTA buttons mirroring the exact rounded shape.
 */
export default function CreateEvent() {
  const router = useRouter();

  // Inputs State
  const [selectedLocation, setSelectedLocation] = useState(null); // { id, name, icon, iconColor }

  // Bottom Sheet Refs
  const locationSheetRef = useRef(null);
  const availabilitySheetRef = useRef(null);

  // Track which bottom sheet is currently open
  const [openSheet, setOpenSheet] = useState(null); // 'location' | 'availability' | null

  // Intercept hardware back button to close the open bottom sheet
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (openSheet === 'location') {
        locationSheetRef.current?.dismiss();
        return true; // prevent default back navigation
      }
      if (openSheet === 'availability') {
        availabilitySheetRef.current?.dismiss();
        return true;
      }
      return false; // let default back happen when no sheet is open
    });
    return () => backHandler.remove();
  }, [openSheet]);

  // Bottom Sheet Snap Points
  const snapPoints = useMemo(() => ["35%"], []);
  const availabilitySnapPoints = useMemo(() => ["55%"], []);

  // Backdrop component for location bottom sheet
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.3}
      />
    ),
    []
  );

  // Meeting app options
  const meetingApps = [
    {
      id: "google_meet",
      name: "Google Meet",
      description: "Auto-generated Google Meet video link",
      icon: "video",
      iconColor: "#0f9d58", // Green
    },
    {
      id: "zoom",
      name: "Zoom Meeting",
      description: "Connect your Zoom account for a video room",
      icon: "video",
      iconColor: "#2d8cff", // Zoom Blue
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "Integrate Teams workspace invite link",
      icon: "users",
      iconColor: "#464eb8", // Teams Purple
    },
    {
      id: "phone",
      name: "Phone Call",
      description: "Provide a phone number for the meeting",
      icon: "phone",
      iconColor: "#059669", // Phone Green
    },
    {
      id: "in_person",
      name: "In Person Meeting",
      description: "Specify a physical address or place",
      icon: "map-pin",
      iconColor: "#dc2626", // Red
    },
  ];

  // Dummy availability schedules
  const availabilitySchedules = [
    {
      id: "1",
      name: "Working hours",
      days: "Mon, Wed, Fri, 9 AM – 5 PM, +1 more time",
      dateSpecific: "0 instances of date-specific hours",
    },
    {
      id: "2",
      name: "Freelance",
      days: "Mon, Tue, Wed, Thu, Fri, Sat, Sun, 9 AM – 5 PM",
      dateSpecific: "0 instances of date-specific hours",
    },
    {
      id: "3",
      name: "Maths class",
      days: "Mon, Wed, 10 AM – 12 PM",
      dateSpecific: "2 instances of date-specific hours",
    },
  ];

  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    duration: "",
    location: "",
    availabilityId: "",
  });

  const handleCreate = () => {
    router.back();
  };

  const handleSelectLocation = (app) => {
    setSelectedLocation(app);
    setEventData({ ...eventData, location: app.name });
    locationSheetRef.current?.dismiss();
  };

  const handleSelectAvailability = (schedule) => {
    setEventData({ ...eventData, availabilityId: schedule.id });
  };





  return (
    <View className="flex-1 bg-[#F8FAFC]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Premium Indigo Header - Matched with Contacts screen */}
        <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8 mb-6 shadow-md shadow-indigo-500/20">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              activeOpacity={0.7}
              className="w-10 h-10 bg-white/10 rounded-full items-center justify-center mr-4"
            >
              <Feather name="arrow-left" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-[28px] font-bold text-white">Create Event</Text>
          </View>
        </View>

        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Card 1: Basic Information */}
          <View className="bg-white rounded-[24px] p-5 mb-4 shadow-sm border border-gray-50">
            <Text className="text-[17px] font-bold text-gray-900 mb-4">
              Basic Information
            </Text>

            {/* Event Name */}
            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">
              EVENT NAME
            </Text>
            <TextInput
              value={eventData.name}
              onChangeText={(value) => setEventData({ ...eventData, name: value })}
              placeholder="e.g. Discovery Call"
              placeholderTextColor="#94a3b8"
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 text-[15px] text-gray-800 mb-4 focus:border-[#4F46E5]"
            />

            {/* Description */}
            <Text className="text-[11px] font-bold text-gray-400 tracking-wider mb-2">
              DESCRIPTION
            </Text>
            <TextInput
              value={eventData.description}
              onChangeText={(value) => setEventData({ ...eventData, description: value })}
              placeholder="Briefly describe this event type..."
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 text-[15px] text-gray-800 h-28 focus:border-[#4F46E5]"
            />
          </View>

          {/* Card 2: Duration & Link */}
          <View className="bg-white rounded-[24px] p-5 mb-6 shadow-sm border border-gray-50">
            <Text className="text-[17px] font-bold text-gray-900 mb-4">
              Duration & Link
            </Text>

            {/* Duration Chips */}
            <Text className="text-[12px] font-bold text-gray-400 tracking-wider mb-3">
              DURATION
            </Text>
            <View className="flex-row flex-wrap gap-3 mb-6">
              {[14, 30, 45, 60].map((dur) => {
                const isActive = eventData.duration === dur;
                return (
                  <TouchableOpacity
                    key={dur}
                    onPress={() => setEventData({ ...eventData, duration: dur })}
                    activeOpacity={0.7}
                    className={`px-5 py-3 rounded-[16px] border ${isActive
                      ? "border-[#4F46E5] bg-indigo-50/70"
                      : "border-gray-100 bg-gray-50/50"
                      }`}
                  >
                    <Text
                      className={`text-[14px] font-semibold ${isActive ? "text-[#4F46E5]" : "text-slate-600"
                        }`}
                    >
                      {dur} min
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Meeting Link / Location Selection */}
            <Text className="text-[12px] font-bold text-gray-400 tracking-wider mb-3">
              MEETING LINK / LOCATION
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => locationSheetRef.current?.present()}
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1">
                <Feather
                  name={selectedLocation ? selectedLocation.icon : "video"}
                  size={20}
                  color={selectedLocation ? selectedLocation.iconColor : "#94a3b8"}
                />
                <Text
                  className={`text-[15px] ml-3 flex-1 ${eventData.location ? "text-slate-800 font-semibold" : "text-slate-400"
                    }`}
                  numberOfLines={1}
                >
                  {eventData.location
                    ? `${eventData.location}`
                    : "Google Meet, Zoom, etc."}
                </Text>
              </View>
              <Feather name="chevron-down" size={16} color="#94a3b8" />
            </TouchableOpacity>

            {/* Availability */}
            <Text className="text-[12px] font-bold text-gray-400 tracking-wider mt-6 mb-3">
              AVAILABILITY
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => availabilitySheetRef.current?.present()}
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1">
                <Feather name="calendar" size={20} color={eventData.availabilityId ? "#4F46E5" : "#94a3b8"} />
                <Text
                  className={`text-[15px] ml-3 flex-1 ${eventData.availabilityId ? "text-slate-800 font-semibold" : "text-slate-400"}`}
                  numberOfLines={1}
                >
                  {eventData.availabilityId
                    ? availabilitySchedules.find((s) => s.id === eventData.availabilityId)?.days
                    : "Choose a schedule..."}
                </Text>
              </View>
              <Feather name="chevron-down" size={16} color="#94a3b8" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Sticky Bottom Create Button */}
        <View className="px-6 pb-8 pt-4 bg-[#F8FAFC]">
          <TouchableOpacity
            onPress={handleCreate}
            activeOpacity={0.8}
            className="bg-[#4F46E5] rounded-[20px] py-4 shadow-lg shadow-indigo-500/30 flex-row items-center justify-center gap-x-2"
          >
            <Text className="text-white font-bold text-[17px] tracking-wide">
              Create Event Type
            </Text>
            <Feather name="arrow-right" size={18} color="white" />
          </TouchableOpacity>
        </View>

        {/* Location Meeting Apps Bottom Sheet */}
        <BottomSheetModal
          ref={locationSheetRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
          onChange={(index) => {
            if (index === -1) setOpenSheet(null);
            else setOpenSheet('location');
          }}
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
          <BottomSheetView className="flex-1 px-6 bg-white">
            <View className="flex-row items-center justify-between mt-2 mb-4">
              <Text className="text-[18px] font-bold text-slate-800">
                Select Meeting Location
              </Text>
              <TouchableOpacity
                onPress={() => locationSheetRef.current?.dismiss()}
                activeOpacity={0.7}
                className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center"
              >
                <Feather name="x" size={18} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
              {meetingApps.map((app) => (
                <TouchableOpacity
                  key={app.id}
                  activeOpacity={0.7}
                  onPress={() => handleSelectLocation(app)}
                  className="flex-row items-center py-3 border-b border-slate-50"
                >
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${app.iconColor}15` }}
                  >
                    <Feather name={app.icon} size={20} color={app.iconColor} />
                  </View>
                  <View className="flex-1 ml-4">
                    <Text className="text-[15px] font-semibold text-slate-800">
                      {app.name}
                    </Text>
                    <Text className="text-[12px] text-slate-400 mt-0.5" numberOfLines={1}>
                      {app.description}
                    </Text>
                  </View>
                  <Feather name="chevron-right" size={14} color="#cbd5e1" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>

        {/* Availability Schedule Bottom Sheet */}
        <BottomSheetModal
          ref={availabilitySheetRef}
          index={0}
          snapPoints={availabilitySnapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={true}
          onChange={(index) => {
            if (index === -1) setOpenSheet(null);
            else setOpenSheet('availability');
          }}
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
          <BottomSheetView className="flex-1 px-6 bg-white">
            <View className="flex-row items-center justify-between mt-2 mb-4">
              <Text className="text-[18px] font-bold text-slate-800">
                Select Availability
              </Text>
              <TouchableOpacity
                onPress={() => availabilitySheetRef.current?.dismiss()}
                activeOpacity={0.7}
                className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center"
              >
                <Feather name="x" size={18} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
              {availabilitySchedules.map((schedule) => {
                const isSelected = eventData.availabilityId === schedule.id;
                return (
                  <TouchableOpacity
                    key={schedule.id}
                    activeOpacity={0.7}
                    onPress={() => handleSelectAvailability(schedule)}
                    className={`p-4 mb-3 rounded-[20px] border ${isSelected
                      ? "border-[#4F46E5] bg-indigo-50/50"
                      : "border-slate-100 bg-slate-50/50"
                      }`}
                  >
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className={`text-[15px] font-bold ${isSelected ? "text-[#4F46E5]" : "text-slate-800"
                        }`}>
                        {schedule.name}
                      </Text>
                      {isSelected && (
                        <Feather name="check" size={16} color="#4F46E5" />
                      )}
                    </View>
                    <Text className="text-[13px] text-slate-500 leading-snug">
                      {schedule.days}
                    </Text>
                    <Text className="text-[12px] text-slate-400 mt-1">
                      {schedule.dateSpecific}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </KeyboardAvoidingView>
    </View>
  );
}
