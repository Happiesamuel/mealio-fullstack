import App from "@/components/ui/App";
import BottomSheetProvider from "@/context/BottomSheetProvider";
import { ThemeProvider } from "@/context/ThemeProvider";
import { setupNotificationCategories } from "@/lib/notification";
import { toastConfig } from "@/lib/toastConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import { router, SplashScreen } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "react-native-url-polyfill/auto";
import "./globals.css";
import Splash from "./Splash";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

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
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const [showAnimatedSplash, setShowAnimatedSplash] = useState(true);

  useEffect(() => {
    setupNotifications();

    // Listen for notification actions (taps and button clicks)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const data = response.notification.request.content.data;
        const actionIdentifier = response.actionIdentifier;

        // Handle "View Order" button or notification tap
        if (
          actionIdentifier === "view_order" ||
          actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
        ) {
          if (data.orderId) {
            console.log(data.orderId);
            router.replace(`/order/${data.orderId}`);
          }
        }
      });

    return () => {
      if (responseListener.current) {
        responseListener.current.remove();
      }
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  // useEffect(() => {
  //   setupNotifications();
  // }, []);
  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  async function setupNotifications() {
    // Request permission
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      await Notifications.requestPermissionsAsync();
    }

    // Setup categories with buttons
    await setupNotificationCategories();

    // Setup Android channel
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("orders", {
        name: "Order Updates",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#ff231f7c",
      });
    }
  }
  // async function setupNotifications() {
  //   const { status } = await Notifications.getPermissionsAsync();
  //   if (status !== "granted") {
  //     await Notifications.requestPermissionsAsync();
  //   }
  //   if (Platform.OS === "android") {
  //     await Notifications.setNotificationChannelAsync("orders", {
  //       name: "Order Updates",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#ff231f7c",
  //     });
  //   }
  // }

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
      <ThemeProvider>
        <SafeAreaProvider>
          <BottomSheetProvider>
            <App />
            <Toast config={toastConfig} />
          </BottomSheetProvider>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
