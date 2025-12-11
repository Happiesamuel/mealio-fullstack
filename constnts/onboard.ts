import AsyncStorage from "@react-native-async-storage/async-storage";

const ONBOARD_KEY = "seenOnboard";

export async function hasSeenOnboard(): Promise<boolean> {
  const value = await AsyncStorage.getItem(ONBOARD_KEY);
  return value === "true";
}

export async function setSeenOnboard(): Promise<void> {
  await AsyncStorage.setItem(ONBOARD_KEY, "true");
}
