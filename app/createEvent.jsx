import { Feather } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef, useState } from "react";
import {
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
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDuration, setSelectedDuration] = useState(30);
  const [selectedLocation, setSelectedLocation] = useState(null); // { id, name, icon, iconColor }

  // Bottom Sheet Ref for Location Apps
  const locationSheetRef = useRef(null);

  // Bottom Sheet Snap Points (35% screen height)
  const snapPoints = useMemo(() => ["35%"], []);

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



  const handleCreate = () => {
    router.back()
  };


  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    duration: "",
    location: "",
    availabilityId: "",
  })



  const handleSelectLocation = (app) => {
    setSelectedLocation(app);
    setEventData({ ...eventData, location: app.name })
    locationSheetRef.current?.dismiss();
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
              onPress={() => router.push("/selectAvailability")}
              className="bg-gray-50/50 border border-gray-100 rounded-[16px] p-4 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1">
                <Feather name="calendar" size={20} color="#94a3b8" />
                <Text className="text-[15px] ml-3 flex-1 text-slate-800 font-semibold" numberOfLines={1}>
                  Mon, Wed, Fri, 9 AM - 5 PM, +1 more time
                </Text>
              </View>
              <Feather name="chevron-right" size={16} color="#94a3b8" />
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
            <Text className="text-[18px] font-bold text-slate-800 mt-2 mb-4">
              Select Meeting Location
            </Text>

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
      </KeyboardAvoidingView>
    </View>
  );
}
