import { useTheme } from "@/context/ThemeProvider";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function App() {
  const { isDark } = useTheme();
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#121212" : "#f7f7f7"}
      />
    </>
  );
}
