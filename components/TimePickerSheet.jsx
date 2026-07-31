import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import WheelPicker from "@quidone/react-native-wheel-picker";
import React, { useCallback, useMemo, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Static data options for the wheel picker columns
const hoursData = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: `${i + 1}` }));
const minutesData = Array.from({ length: 60 }, (_, i) => ({ value: i, label: i < 10 ? `0${i}` : `${i}` }));
const ampmData = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];

/**
 * TimePickerSheet Component
 * 
 * A premium, modern Bottom Sheet UI for time scheduling, styled using NativeWind (Tailwind CSS).
 * It features functional interactive tabs for Start/End times and uses `@quidone/react-native-wheel-picker`.
 */
const TimePickerSheet = React.forwardRef(({ onSave }, ref) => {
  // State for active panel editing selection
  const [activeTab, setActiveTab] = useState("start"); // "start" or "end"

  // State for Start Time and End Time values
  const [startHour, setStartHour] = useState(9);
  const [startMinute, setStartMinute] = useState(0);
  const [startAmPm, setStartAmPm] = useState("AM");

  const [endHour, setEndHour] = useState(5);
  const [endMinute, setEndMinute] = useState(0);
  const [endAmPm, setEndAmPm] = useState("PM");


  const startTime = `${startHour}:${startMinute < 10 ? `0${startMinute}` : startMinute
    } ${startAmPm}`;

  const endTime = `${endHour}:${endMinute < 10 ? `0${endMinute}` : endMinute
    } ${endAmPm}`;

  // Snap point to cover approximately 60-65% of the screen
  const snapPoints = useMemo(() => ["63%"], []);

  const renderBackdrop = useCallback(
    (backdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.3} // Soft, clean backdrop
      />
    ),
    []
  );


  const handleSaveTime = () => {
    onSave(startTime, endTime);
    ref.current?.dismiss();

    setStartHour(9);
    setStartMinute(0);
    setStartAmPm("AM");
    setEndHour(5);
    setEndMinute(0);
    setEndAmPm("PM");
    setActiveTab("start");

  };

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      enableOverDrag={false}
      enableContentPanningGesture={false}
      backgroundStyle={{
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        // Soft elevation shadow for Android / iOS
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 10,
      }}
      handleIndicatorStyle={{
        backgroundColor: "#E2E8F0", // Slate-200 handle
        width: 40,
        height: 5,
        marginTop: 8,
      }}
    >
      <BottomSheetView className="flex-1 bg-white px-6 pt-4 pb-8 flex justify-between">

        {/* Top Section: Split Start/End Panels */}
        <View className="flex-row justify-between space-x-4 w-full">
          {/* Left Panel (Start Time) - Primary Brand Color when active */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab("start")}
            className={`flex-1 p-4 rounded-2xl ${activeTab === "start" ? "bg-[#5B4CF5]" : "bg-[#F3F4F6] border border-gray-100"}`}
            style={activeTab === "start" ? {
              shadowColor: "#5B4CF5",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 4,
            } : undefined}
          >
            <Text className={`text-[12px] font-semibold uppercase tracking-wider ${activeTab === "start" ? "text-white/70" : "text-gray-500"}`}>
              Start Time
            </Text>
            <Text className={`text-[24px] font-bold mt-1 ${activeTab === "start" ? "text-white" : "text-gray-800"}`}>
              {`${startHour}:${startMinute < 10 ? `0${startMinute}` : startMinute} ${startAmPm}`}
            </Text>
          </TouchableOpacity>

          {/* Right Panel (End Time) - Primary Brand Color when active */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setActiveTab("end")}
            className={`flex-1 p-4 rounded-2xl ${activeTab === "end" ? "bg-[#5B4CF5]" : "bg-[#F3F4F6] border border-gray-100"}`}
            style={activeTab === "end" ? {
              shadowColor: "#5B4CF5",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 4,
            } : undefined}
          >
            <Text className={`text-[12px] font-semibold uppercase tracking-wider ${activeTab === "end" ? "text-white/70" : "text-gray-500"}`}>
              End Time
            </Text>
            <Text className={`text-[24px] font-bold mt-1 ${activeTab === "end" ? "text-white" : "text-gray-800"}`}>
              {`${endHour}:${endMinute < 10 ? `0${endMinute}` : endMinute} ${endAmPm}`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Middle Section: Real Wheel Picker Columns */}
        <View className="my-8 relative items-center justify-center py-2 h-[180px]">
          {/* Highlight Selected Row: Horizontal Divider Lines */}
          <View className="absolute left-0 right-0 top-[64px] h-[52px] border-t border-b border-gray-200/80 bg-gray-50/50 pointer-events-none z-10" />

          {/* Three Centered Columns: Hour | Minutes | AM/PM */}
          <View className="flex-row justify-center items-center w-full">

            {/* Column 1: Hour */}
            <WheelPicker
              data={hoursData}
              value={activeTab === "start" ? startHour : endHour}
              onValueChanged={({ item }) => {
                if (activeTab === "start") setStartHour(item.value);
                else setEndHour(item.value);
              }}
              width={70}
              itemHeight={52}
              visibleItemCount={3}
              renderOverlay={null}
              renderItem={({ item }) => {
                const currentSelectedHour = activeTab === "start" ? startHour : endHour;
                const isSelected = item.value === currentSelectedHour;
                return (
                  <Text className={`text-center leading-[52px] ${isSelected ? "text-[28px] text-black font-bold" : "text-[28px] text-black font-bold"}`}>
                    {item.label}
                  </Text>
                );
              }}
            />

            {/* Separator Colon (Visual) */}
            <Text className="text-[20px] text-gray-300 font-semibold mx-4 mb-1">:</Text>

            {/* Column 2: Minutes */}
            <WheelPicker
              data={minutesData}
              value={activeTab === "start" ? startMinute : endMinute}
              onValueChanged={({ item }) => {
                if (activeTab === "start") setStartMinute(item.value);
                else setEndMinute(item.value);
              }}
              width={70}
              itemHeight={52}
              visibleItemCount={3}
              renderOverlay={null}
              renderItem={({ item }) => {
                const currentSelectedMin = activeTab === "start" ? startMinute : endMinute;
                const isSelected = item.value === currentSelectedMin;
                return (
                  <Text className={`text-center leading-[52px] ${isSelected ? "text-[28px] text-black font-bold" : "text-[28px] text-black font-bold"}`}>
                    {item.label}
                  </Text>
                );
              }}
            />

            {/* Gap spacer between Minutes and AM/PM */}
            <View className="w-6" />

            {/* Column 3: AM / PM */}
            <WheelPicker
              data={ampmData}
              value={activeTab === "start" ? startAmPm : endAmPm}
              onValueChanged={({ item }) => {
                if (activeTab === "start") setStartAmPm(item.value);
                else setEndAmPm(item.value);
              }}
              width={70}
              itemHeight={52}
              visibleItemCount={3}
              renderOverlay={null}
              renderItem={({ item }) => {
                const currentSelectedAmPm = activeTab === "start" ? startAmPm : endAmPm;
                const isSelected = item.value === currentSelectedAmPm;
                return (
                  <Text className={`text-center leading-[52px] ${isSelected ? "text-[28px] text-black font-bold" : "text-[28px] text-black font-bold"}`}>
                    {item.label}
                  </Text>
                );
              }}
            />

          </View>
        </View>

        {/* Bottom Section: Primary Action and Cancel Buttons */}
        <View className="w-full mt-auto space-y-4">
          {/* Primary Action Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSaveTime}
            className="w-full py-4 bg-[#5B4CF5] rounded-2xl items-center justify-center"
            style={{
              shadowColor: "#5B4CF5",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.2,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            <Text className="text-white text-[16px] font-semibold">
              Use these times
            </Text>
          </TouchableOpacity>

          {/* Cancel Text Button */}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => ref.current?.dismiss()}
            className="w-full py-3 items-center justify-center"
          >
            <Text className="text-gray-500 text-[16px] font-medium">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>

      </BottomSheetView>
    </BottomSheetModal>
  );
});

TimePickerSheet.displayName = "TimePickerSheet";

export default TimePickerSheet;
