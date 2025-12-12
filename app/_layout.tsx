// }
import BottomSheetProvider from "@/context/BottomSheetProvider";
import { toastConfig } from "@/lib/toastConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "react-native-url-polyfill/auto";
import "./globals.css";
import Splash from "./Splash";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-ExtraBold": require("../assets/fonts/Roboto-ExtraBold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-SemiBold": require("../assets/fonts/Roboto-SemiBold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const [showAnimatedSplash, setShowAnimatedSplash] = useState(true);

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  if (showAnimatedSplash)
    return (
      <Splash
        onFinish={() => {
          setShowAnimatedSplash(false);
        }}
      />
    );
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <BottomSheetProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar barStyle="dark-content" backgroundColor="#f7f7f7" />
          <Toast config={toastConfig} />
        </BottomSheetProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
