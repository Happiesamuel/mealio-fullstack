import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function AuthLayout() {
  const isAuthenticated = false;
  if (!isAuthenticated) return <Redirect href="/onboard" />;
  return (
    <View>
      <Text>AuthLayout</Text>
    </View>
  );
}
