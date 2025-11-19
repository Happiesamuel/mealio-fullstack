import { Redirect } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function AuthLayout() {
  const isAuthenticated = true;
  if (!isAuthenticated) return <Redirect href="/onboard" />;
  return (
    <View className="bg-primary relative flex-1">
      <View className="h-full mt-[95px]  absolute flex-1  z-1 w-[97%]  self-center  bg-[#08732E] rounded-t-[34px]" />
      <View className="h-full mt-32  bg-secondary relative z-50  rounded-t-[34px]"></View>
    </View>
  );
}
