import useGetUser from "@/hooks/useGetUser";
import { useUserStorage } from "@/store/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";

const ONBOARD_KEY = "seenOnboard";

export default function Index() {
  const [seenOnboard, setSeenOnboard] = useState<boolean | null>(null);
  const { user, status, error } = useGetUser();
  const { setUser, reset } = useUserStorage();

  useEffect(() => {
    async function loadOnboard() {
      const onboard = await AsyncStorage.getItem(ONBOARD_KEY);
      setSeenOnboard(onboard === "true");
    }
    loadOnboard();
  }, []);

  useEffect(() => {
    if (status === "success") {
      if (user) setUser(user);
      else reset();
    }
  }, [status, user, setUser, reset]);

  if (status === "pending" || seenOnboard === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#14b74d" size="large" />
      </View>
    );
  }

  if (error) {
    Toast.show({
      type: "error",
      text1: "Welcome to Mealio",
      text2: "Log in to get started",
    });
    return <Redirect href="/(tabs)" />;
  }

  if (!seenOnboard) return <Redirect href="/onboard" />;

  return <Redirect href="/(tabs)" />;
}
