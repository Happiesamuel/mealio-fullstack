// import BottomSheetProvider from "@/context/BottomSheetProvider";
// import { useAppState } from "@/hooks/useAppState";
// import { useFonts } from "expo-font";
// import { SplashScreen, Stack } from "expo-router";
// import { useEffect } from "react";
// import "./globals.css";
// export default function RootLayout() {
//   const [fontLoaded, error] = useFonts({
//     "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
//     "Roboto-ExtraBold": require("../assets/fonts/Roboto-ExtraBold.ttf"),
//     "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
//     "Roboto-SemiBold": require("../assets/fonts/Roboto-SemiBold.ttf"),
//     "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
//     "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
//   });

//   const { loaded, seenOnboard, userToken } = useAppState();
//   useEffect(
//     function () {
//       if (error) throw error;
//       if (fontLoaded) SplashScreen.hideAsync();
//     },
//     [fontLoaded, error]
//   );

//   if (!fontLoaded) return null;

//   return (
//     <BottomSheetProvider>
//       <Stack screenOptions={{ headerShown: false }} />
//     </BottomSheetProvider>
//   );
// }
import BottomSheetProvider from "@/context/BottomSheetProvider";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import "./globals.css";
import Splash from "./Splash";

// Keep splash on screen until we manually hide it
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

  // After fonts are loaded → hide native splash → show our animation
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

  return (
    <BottomSheetProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </BottomSheetProvider>
  );
}
