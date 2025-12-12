import Headers from "@/components/profile/Headers";
import Switch from "@/components/profile/notification";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useUserStorage } from "@/store/useUserStore";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Security() {
  const isOn = useSharedValue(0);
  const { user } = useUserStorage();
  const handlePress = () => {
    isOn.value = isOn.value === 0 ? 1 : 0;
  };
  if (!user) return <Headers from="/profile/security" text="Security" />;
  return (
    <SafeAreaView className="bg-secondary h-full px-3">
      <ProfileHeader>Security</ProfileHeader>
      <View className="gap-6 mt-10">
        <Link href={"/profile/security/password"}>
          <View className="flex items-center w-full justify-between gap-2 flex-row">
            <Text className="text-base font-roboto text-black">
              Change Password
            </Text>
            <FontAwesome name="angle-right" size={20} color="black" />
          </View>
        </Link>
        <View className="flex flex-row items-center justify-between">
          <Text className="font-roboto text-base text-black">Biometrics</Text>
          <Switch value={isOn} onPress={handlePress} style={styles.switch} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  switch: {
    width: 50,
    height: 24,
  },
});
