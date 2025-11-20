import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export function useAppState() {
  const [loaded, setLoaded] = useState(false);
  const [seenOnboard, setSeenOnboard] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadState() {
      const onboardFlag = await AsyncStorage.getItem("seen_onboard");
      const token = await AsyncStorage.getItem("user_token");

      setSeenOnboard(!!onboardFlag);
      setUserToken(token);
      setLoaded(true);
    }

    loadState();
  }, []);

  return {
    loaded,
    seenOnboard,
    userToken,
  };
}
