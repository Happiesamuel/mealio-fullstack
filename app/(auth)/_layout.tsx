import { Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";

export default function AuthLayout() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        className="bg-primary relative  "
      >
        <View className="h-full mt-[85px]  absolute flex-1  z-1 w-[97%]  self-center  bg-[#08732E] rounded-t-[34px]" />
        <View
          style={{ height: Dimensions.get("screen").height - 112 }}
          className=" flex-1 mt-28  bg-secondary relative z-50  rounded-t-[34px] px-5 pb-10"
        >
          <Slot />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
