// hooks/useUnreadNotifications.ts
import { appwriteConfig, client, databases } from "@/lib/appwrite";
import { useUserStorage } from "@/store/useUserStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Query } from "react-native-appwrite";

export const useUnreadNotifications = () => {
  const { guest } = useUserStorage();
  const queryClient = useQueryClient();
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread notifications count
  const { data: notifications, refetch } = useQuery({
    queryKey: ["unread-notifications", guest?.$id],
    queryFn: async () => {
      if (!guest?.$id) return { documents: [] };

      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.notificationsCollectionId,
        [
          Query.equal("guests", guest.$id),
          Query.equal("isRead", false),
          Query.orderDesc("$createdAt"),
        ]
      );
      return response;
    },
    enabled: !!guest?.$id,
  });

  // Update unread count when data changes
  useEffect(() => {
    setUnreadCount(notifications?.documents?.length || 0);
  }, [notifications]);

  // Real-time subscription for new notifications
  useEffect(() => {
    if (!guest?.$id) return;

    console.log("🔔 Subscribing to notification updates");

    const unsubscribe = client.subscribe(
      [
        `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.notificationsCollectionId}.documents`,
      ],
      (response) => {
        const notification: any = response.payload;

        // Only handle current user's notifications
        if (notification.guests === guest.$id) {
          console.log("🔔 New notification received, refreshing badge");

          // Refetch unread count
          queryClient.invalidateQueries({
            queryKey: ["unread-notifications", guest.$id],
          });
        }
      }
    );

    return () => {
      console.log("🔔 Unsubscribing from notification updates");
      unsubscribe();
    };
  }, [guest?.$id, queryClient]);

  // Function to mark all as read
  const markAllAsRead = async () => {
    if (!notifications?.documents) return;

    try {
      await Promise.all(
        notifications.documents.map((notif: any) =>
          databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.notificationsCollectionId,
            notif.$id,
            { isRead: true }
          )
        )
      );

      // Refresh count
      refetch();
      console.log("✅ Marked all notifications as read");
    } catch (error) {
      console.error("❌ Failed to mark notifications as read:", error);
    }
  };

  return { unreadCount, refetch, markAllAsRead };
};
