import { useTheme } from "@/context/ThemeProvider";
import { useToastConfig } from "@/lib/toastConfig";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar, View } from "react-native";
import Toast from "react-native-toast-message";

export default function App() {
  const { isDark } = useTheme();
  const toastConfig = useToastConfig();
  return (
    <View className="bg-secondary dark:bg-[#121212] flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "ios_from_right",
          contentStyle: {
            backgroundColor: isDark ? "#121212" : "#f7f7f7",
          },
        }}
      />
      <Toast config={toastConfig} />
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#121212" : "#f7f7f7"}
      />
    </View>
  );
}
