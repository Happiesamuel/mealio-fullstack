// import { useEffect, useState } from "react";
// import { Redirect } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ActivityIndicator, View } from "react-native";

// export default function Index() {
//   const [loading, setLoading] = useState(true);
//   const [seenOnboard, setSeenOnboard] = useState(false);
//   const [userToken, setUserToken] = useState<string|null>(null);

//   useEffect(() => {
//     async function load() {
//       const onboard = await AsyncStorage.getItem("seenOnboard");
//       const token = await AsyncStorage.getItem("userToken");

//       setSeenOnboard(!!onboard);
//       setUserToken(token);
//       setLoading(false);
//     }

//     load();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   // 1) Never seen onboarding → redirect to onboarding
//   if (!seenOnboard) {
//     return <Redirect href="/onboard" />;
//   }

//   // 2) Seen onboarding but NOT logged in → auth
//   if (!userToken) {
//     return <Redirect href="/login" />;
//   }

//   // 3) Logged in → home
//   return <Redirect href="/" />;
// }

//finish onboard
// await AsyncStorage.setItem("seenOnboard", "true");
// router.replace("/auth");

//login
// await AsyncStorage.setItem("userToken", token);
// router.replace("/home");

//logout
// await AsyncStorage.removeItem("userToken");
// router.replace("/");

import { Redirect } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function index() {
  const a = true;
  if (a) return <Redirect href="/onboard" />;
  return (
    <View>
      <Text>index</Text>
    </View>
  );
}
