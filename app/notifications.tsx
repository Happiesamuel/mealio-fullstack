import EmptyNotification from "@/components/notifications/EmptyNotification";
import NotificaationList from "@/components/notifications/NotificaationList";
import NotificationHeader from "@/components/notifications/NotificationHeader";
import { notifictions } from "@/constnts/constant";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function notifications() {
  return (
    <SafeAreaView className="bg-secondary  h-full px-5">
      <NotificationHeader />
      <FlatList
        data={notifictions}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-3 py-10"
        renderItem={({ item }) => <NotificaationList item={item} />}
        ListEmptyComponent={() => (
          <View className="flex items-center justify-center  mt-32  flex-1">
            <EmptyNotification />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
