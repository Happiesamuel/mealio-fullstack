import Switch from "@/components/profile/notification";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notification() {
  const isOn = useSharedValue(0);

  const handlePress = () => {
    isOn.value = isOn.value === 0 ? 1 : 0;
  };

  return (
    <SafeAreaView className="bg-secondary h-full px-3">
      <ProfileHeader>Notification</ProfileHeader>
      <View className="gap-6 mt-10">
        <View className="flex flex-row items-center justify-between">
          <Text className="font-roboto text-base text-black">Meals Alerts</Text>
          <Switch value={isOn} onPress={handlePress} style={styles.switch} />
        </View>
        <View className="flex items-center justify-between gap-2 flex-row">
          <Text className="text-base font-roboto text-black">
            Communication Preference
          </Text>
          <FontAwesome name="angle-right" size={20} color="black" />
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
