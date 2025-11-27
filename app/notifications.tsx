import EmptyNotification from "@/components/notifications/EmptyNotification";
import NotificationHeader from "@/components/notifications/NotificationHeader";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function notifications() {
  return (
    <SafeAreaView className="bg-secondary h-full px-5">
      <NotificationHeader />
      <View className="flex items-center justify-center flex-1">
        <EmptyNotification />
      </View>
    </SafeAreaView>
  );
}
