import {
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { useCallback, useRef } from "react";

import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  // ref
  const bottomSheetModalRef = useRef(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <View style={styles.container}>
      <Button
        onPress={handlePresentModalPress}
        title="Present Modal"
        color="black"
      />

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["50%"]}
        onChange={handleSheetChanges}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});