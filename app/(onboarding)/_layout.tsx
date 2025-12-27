import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnBoardingLayout() {
  return (
    <SafeAreaView
      edges={["top"]}
      className="h-full flex-1 bg-secondary dark:bg-[#121212] flex items-center px-5 pb-safe"
    >
      <Slot />
    </SafeAreaView>
  );
}
