import { Feather } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  BackHandler,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { GetEventType, RemoveEventType } from "../../lib/services/eventTypeService";

const EventsScreen = () => {
  const router = useRouter();
  const eventDetailsSheetRef = useRef(null);



  const user = useSelector((state) => state.auth.user)

  const [events, setEvents] = useState([])

  const FetchEventType = async () => {
    const eventtypes = await GetEventType(user.id)
    if (eventtypes) {
      console.log(eventtypes);

      setEvents(eventtypes)
    }

  }
  useFocusEffect(
    useCallback(() => {
      if (user?.id) {
        FetchEventType();
      }
    }, [user?.id])
  );

  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
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

  // Bottom Sheet Backdrop setup
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

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    eventDetailsSheetRef.current?.present();
  };

  const handleAction = (actionName) => {
    eventDetailsSheetRef.current?.dismiss();
    Alert.alert("Success", `${actionName} selected for "${selectedEvent?.title}"!`);
  };



  const handleRemoveEventType = async (id) => {
    const data = await RemoveEventType(id)
    FetchEventType()
    eventDetailsSheetRef.current?.dismiss();
  }
  return (
    <View className="flex-1 bg-[#F8FAFC]">
      {/* Premium Indigo Header */}
      <View className="bg-[#4F46E5] rounded-b-[40px] px-6 pt-16 pb-8 mb-6 shadow-md shadow-indigo-500/20">
        <View className="flex-row items-center">
          <Text className="text-[28px] font-bold text-white">Event Types</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        className="px-6"
      >
        <Text className="text-gray-400 text-[13px] font-bold tracking-wider mb-4">
          YOUR EVENT TYPES ({events?.length || 0})
        </Text>

        {/* List of Event Cards */}
        <View className="gap-y-4">
          {events.map((event) => (
            <TouchableOpacity
              key={event.id}
              activeOpacity={0.7}
              onPress={() => openEventDetails(event)}
              className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 flex-row items-center justify-between"
              style={{ borderLeftWidth: 4, borderLeftColor: event.color }}
            >
              <View className="flex-1 mr-4">
                <Text className="text-[17px] font-bold text-gray-900 mb-1">
                  {event.title}
                </Text>
                <Text className="text-[13px] text-gray-400 font-medium mb-2">
                  {`${event.duration} mind . ${event.location_type}`}
                </Text>
                <Text className="text-[12px] text-gray-500 font-semibold" numberOfLines={1}>
                  {event.availability_schedules.name}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>


      <View className="absolute bottom-6 right-6">
        <TouchableOpacity onPress={() => router.push("/createEvent")} className="w-[64px] h-[64px] bg-[#5B4CF0] rounded-[24px] items-center justify-center shadow-lg shadow-indigo-500/40 border border-white/20">
          <Feather name="plus" size={32} color="white" />
        </TouchableOpacity>
      </View>

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
            {selectedEvent?.title}
          </Text>
          {selectedEvent?.duration && (
            <Text className="text-[13px] font-medium text-slate-400 mb-4">
              {`${selectedEvent?.duration} mind . ${selectedEvent?.location_type}`}
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

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleRemoveEventType(selectedEvent.id)}
                className="flex-row items-center py-3.5"
              >
                <Feather name="trash" size={22} color="#ef4444" />
                <Text className="text-[16px] font-medium text-red-600 ml-4">
                  Delete Event Type
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

export default EventsScreen;
