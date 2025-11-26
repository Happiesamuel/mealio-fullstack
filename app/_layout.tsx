import BottomSheetProvider from "@/context/BottomSheetProvider";
import { useAppState } from "@/hooks/useAppState";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import "./globals.css";
export default function RootLayout() {
  const [fontLoaded, error] = useFonts({
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-ExtraBold": require("../assets/fonts/Roboto-ExtraBold.ttf"),
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-SemiBold": require("../assets/fonts/Roboto-SemiBold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Light": require("../assets/fonts/Roboto-Light.ttf"),
  });

  const { loaded, seenOnboard, userToken } = useAppState();
  useEffect(
    function () {
      if (error) throw error;
      if (fontLoaded) SplashScreen.hideAsync();
    },
    [fontLoaded, error]
  );

  if (!fontLoaded) return null;

  return (
    <BottomSheetProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </BottomSheetProvider>
  );
}
//   const screens: { screen: string; animation: StackAnimationTypes }[] = [
//     { screen: "(onboarding)", animation: "fade" },
//     { screen: "(auth)", animation: "fade" },
//     { screen: "(tabs)", animation: "fade" },
//     { screen: "profile/edit", animation: "ios_from_right" },
//     { screen: "profile/notification", animation: "ios_from_right" },
//     { screen: "profile/address", animation: "ios_from_right" },
//     { screen: "profile/payment", animation: "ios_from_right" },
//     { screen: "profile/preference", animation: "ios_from_right" },
//     { screen: "profile/security/index", animation: "ios_from_right" },
//     { screen: "profile/security/password", animation: "ios_from_right" },
//   ];
//   return (
//     <BottomSheetProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         {screens.map((screen) => (
//           <Stack.Screen
//             key={screen.screen}
//             name={screen.screen}
//             options={{ animation: screen.animation }}
//           />
//         ))}
//       </Stack>
//     </BottomSheetProvider>
//   );
// }
