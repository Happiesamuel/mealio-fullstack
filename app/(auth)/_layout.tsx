import { Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          className="bg-primary relative"
        >
          <View
            className="absolute w-[97%] self-center bg-[#08732E] rounded-t-[34px]"
            style={{
              top: 85,
              bottom: 0,
            }}
          />

          <View
            className="bg-secondary relative z-50 rounded-t-[34px] px-5 pb-10 mt-28"
            style={{
              minHeight: Dimensions.get("screen").height - 112,
            }}
          >
            <Slot />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
