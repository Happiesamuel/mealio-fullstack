import useGetUser from "@/hooks/useGetUser";
import { getGuestByEmail } from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { Guest } from "@/types";
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
    async function loadUser() {
      if (status === "success") {
        if (user) {
          const guest = await getGuestByEmail(user.email);
          setUser(user, guest as unknown as Guest);
        } else {
          reset();
        }
      }
    }
    loadUser();
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
