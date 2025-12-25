import EmptyNotification from "@/components/notifications/EmptyNotification";
import NotificaationList from "@/components/notifications/NotificaationList";
import NotificationHeader from "@/components/notifications/NotificationHeader";
import NotLoggedIn from "@/components/ui/NotLoggedIn";
import { useGetNotification } from "@/hooks/useNotifications";
import { useUserStorage } from "@/store/useUserStore";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  const { notifications } = useGetNotification();
  const { guest } = useUserStorage();
  if (!guest) {
    return (
      <SafeAreaView
        edges={["top"]}
        className="bg-secondary  h-full px-5 pb-safe"
      >
        <NotificationHeader /> <NotLoggedIn from="notifications" />
      </SafeAreaView>
    );
  }
  const notify = notifications as any;
  return (
    <SafeAreaView edges={["top"]} className="bg-secondary  h-full px-5 pb-safe">
      <NotificationHeader />
      <FlatList
        data={notify}
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
