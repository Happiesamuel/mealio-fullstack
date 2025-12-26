import EmptyNotification from "@/components/notifications/EmptyNotification";
import NotificaationList from "@/components/notifications/NotificaationList";
import NotificationHeader from "@/components/notifications/NotificationHeader";
import Error from "@/components/ui/Error";
import NotLoggedIn from "@/components/ui/NotLoggedIn";
import { useGetNotification } from "@/hooks/useNotifications";
import { useUnreadNotifications } from "@/hooks/useUnreadNotification";
import { useUserStorage } from "@/store/useUserStore";
import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications() {
  const { notifications, status, error, refetch } = useGetNotification();
  const { guest } = useUserStorage();
  const { markAllAsRead } = useUnreadNotifications();
  useEffect(() => {
    const timer = setTimeout(() => {
      markAllAsRead();
    }, 500);

    return () => clearTimeout(timer);
  }, [markAllAsRead]);

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
  if (status === "pending") {
    return (
      <>
        <NotificationHeader />
        <View className="flex flex-1 gap-2 items-center justify-center w-full  ">
          <ActivityIndicator size={"large"} color="#14B74D" />
          <Text className="text-grey text-sm font-roboto">Loading Details</Text>
        </View>
      </>
    );
  }
  if (error) {
    return (
      <View>
        <NotificationHeader />
        <Error error={error?.message} onPress={refetch} />
      </View>
    );
  }

  const notify = notifications as any;
  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-secondary dark:bg-[#121212] h-full px-5 pb-safe"
    >
      <NotificationHeader />
      <FlatList
        data={notify}
        keyExtractor={(item) => item.$id}
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
