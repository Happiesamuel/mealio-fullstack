import { useTheme } from "@/context/ThemeProvider";
import { useToastConfig } from "@/lib/toastConfig";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";

export default function App() {
  const { isDark } = useTheme();
  const toastConfig = useToastConfig();
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <Toast config={toastConfig} />
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#121212" : "#f7f7f7"}
      />
    </>
  );
}
