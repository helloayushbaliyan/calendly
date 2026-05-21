import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BackHandler,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * QuickActionsSheet Component
 * 
 * Styled entirely using Tailwind CSS (via NativeWind) to match a clean light theme.
 * Focuses purely on visual excellence and UI structure to match your reference layout.
 */
const QuickActionsSheet = React.forwardRef((props, ref) => {
  const router = useRouter();
  // Define sheet height snap point at 55% as per user preference
  const snapPoints = useMemo(() => ["50%"], []);
  const [isOpen, setIsOpen] = useState(false);
  const renderBackdrop = useCallback(
    (backdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
        opacity={0.3} // Soft backdrop opacity for clean light theme look
      />
    ),
    []
  );

  const handleSheetChanges = useCallback(
    (index) => {
      setIsOpen(index > -1);
      if (props.onChange) {
        props.onChange(index);
      }
    },
    [props]
  );

  // Android hardware back handler
  useEffect(() => {
    if (!isOpen) return;

    const backAction = () => {
      ref.current?.dismiss();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isOpen, ref]);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      // Light theme modal wrapper styling
      backgroundStyle={{
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
      }}
      handleIndicatorStyle={{
        backgroundColor: "#cbd5e1", // Slate-300 soft handle color
        width: 36,
        height: 4,
      }}
    >
      <BottomSheetView className="flex-1 px-6 bg-white">

        {/* Title */}
        <Text className="text-[22px] font-bold text-slate-800 mt-2 mb-4">
          Quick actions
        </Text>

        {/* Section 1: CREATE */}
        <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2">
          CREATE
        </Text>

        <View className="mb-4">


          {/* Row 2: Create event type */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              ref.current?.dismiss();
              router.push("/createEvent");
            }}
            className="flex-row items-center py-3.5"
          >
            <Ionicons name="card-outline" size={22} color="#1d4ed8" />
            <Text className="text-[16px] font-medium text-slate-700 ml-4">
              Create event type
            </Text>
          </TouchableOpacity>




          {/* Row 5: Create new contact */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              ref.current?.dismiss();
              router.push("/createContact");
            }}
            className="flex-row items-center py-3.5"
          >
            <Ionicons name="person-add-outline" size={22} color="#1d4ed8" />
            <Text className="text-[16px] font-medium text-slate-700 ml-4">
              Create new contact
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section 2: AVAILABILITY */}
        <Text className="text-[12px] font-bold text-slate-400 tracking-wider mb-2">
          AVAILABILITY
        </Text>

        <View>
          {/* Row 6: Manage availability */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => ref.current?.dismiss()}
            className="flex-row items-center py-3.5"
          >
            <Ionicons name="alarm-outline" size={22} color="#1d4ed8" />
            <Text className="text-[16px] font-medium text-slate-700 ml-4">
              Manage availability
            </Text>
          </TouchableOpacity>
        </View>

      </BottomSheetView>
    </BottomSheetModal>
  );
});

QuickActionsSheet.displayName = "QuickActionsSheet";

export default QuickActionsSheet;
