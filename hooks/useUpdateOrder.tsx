import { appwriteConfig, client, databases } from "@/lib/appwrite";
import { getTimeUntilShipped } from "@/lib/helper";
import {
  sendOrderDeliveredNotification,
  sendOrderPreparingNotification,
} from "@/lib/notification";
import { useUserStorage } from "@/store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { Query } from "react-native-appwrite";
import Toast from "react-native-toast-message";
import { useCrateNotification } from "./useNotifications";

export const useOrderStatusUpdater = () => {
  const queryClient = useQueryClient();
  const { create: createNot } = useCrateNotification();
  const { guest, isLoggedIn } = useUserStorage();
  const updateOrderStatuses = useCallback(async () => {
    try {
      const now = new Date().toISOString();

      const pendingOrders = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        [
          Query.equal("status", "Pending"),
          Query.equal("shippedNotified", false),
          Query.lessThan("shippedAt", now),
        ]
      );

      if (pendingOrders.documents.length > 0) {
        await Promise.all(
          pendingOrders.documents.map((order) =>
            databases.updateDocument(
              appwriteConfig.databaseId,
              appwriteConfig.ordersCollectionId,
              order.$id,
              { status: "Shipped", shippedNotified: true }
            )
          )
        );
        queryClient.invalidateQueries({ queryKey: ["orders", guest?.$id] });

        if (guest && isLoggedIn) {
          const userOrders = pendingOrders.documents.filter(
            (order: any) => order.guests === guest.$id
          );

          if (userOrders.length > 0) {
            createNot(
              {
                title: "Rider assigned to your delivery",
                content: "A rider has picked up your order and is on the way.",
                status: "delivery",
                image: null,
                guests: guest.$id,
                createdAt: userOrders?.at(0)?.deliveredAt,
                isRead: false,
              },
              {
                onSuccess: () =>
                  Toast.show({
                    type: "success",
                    text1: "1 new notification",
                  }),
              }
            );
            await sendOrderPreparingNotification(
              userOrders?.at(0)?.orderId,
              getTimeUntilShipped(userOrders?.at(0)?.shippedAt)
            );
            Toast.show({
              type: "success",
              text1: "📦 Order Shipped!",
              text2: `${userOrders.length} order(s) on the way`,
            });
          }
        }
      }

      const shippedOrders = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        [
          Query.equal("status", "Shipped"),
          Query.equal("deliveredNotified", false),
          Query.lessThan("deliveredAt", now),
        ]
      );

      if (shippedOrders.documents.length > 0) {
        await Promise.all(
          shippedOrders.documents.map((order) =>
            databases.updateDocument(
              appwriteConfig.databaseId,
              appwriteConfig.ordersCollectionId,
              order.$id,
              { status: "Delivered", deliveredNotified: true }
            )
          )
        );
        queryClient.invalidateQueries({ queryKey: ["orders", guest?.$id] });

        if (guest && isLoggedIn) {
          const userOrders = shippedOrders.documents.filter(
            (order: any) => order.guests === guest.$id
          );

          if (userOrders.length > 0) {
            createNot(
              {
                title: "Order delivered successfully",
                content:
                  "Hope you enjoyed your meal! Don't forget to rate your delivery.",
                status: "success-delivery",
                image: null,
                guests: guest.$id,
                createdAt: userOrders?.at(0)?.deliveredAt,
                isRead: false,
              },
              {
                onSuccess: () =>
                  Toast.show({
                    type: "success",
                    text1: "1 new notification",
                  }),
              }
            );
            await sendOrderDeliveredNotification(userOrders?.at(0)?.orderId);
            Toast.show({
              type: "success",
              text1: "✅ Order Delivered!",
              text2: `${userOrders.length} order(s) arrived. Enjoy!`,
            });
          }
        }
      }
    } catch (error) {
      console.error("❌ Failed to update order statuses:", error);
    }
  }, [guest, isLoggedIn]);

  useEffect(() => {
    updateOrderStatuses();

    const interval = setInterval(
      () => {
        updateOrderStatuses();
      },
      10 * 60 * 1000
    );

    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        console.log(`📱 App state changed to: ${nextAppState}`);
        if (nextAppState === "active") {
          console.log("🔄 App became active, checking orders...");
          updateOrderStatuses();
        }
      }
    );

    const unsubscribe = client.subscribe(
      [
        `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.ordersCollectionId}.documents`,
      ],
      (response) => {
        const order: any = response.payload;

        console.log("📡 Real-time update received:", {
          orderId: order.$id,
          orderGuest: order.guests,
          currentGuest: guest?.$id,
          status: order.status,
        });

        if (guest && isLoggedIn && order.guests === guest.$id) {
          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.update"
            )
          ) {
            if (order.status === "Shipped") {
              Toast.show({
                type: "success",
                text1: "📦 Order Shipped!",
                text2: `Order #${order.orderId} is on the way`,
              });
            } else if (order.status === "Delivered") {
              Toast.show({
                type: "success",
                text1: "✅ Order Delivered!",
                text2: `Order #${order.orderId} has arrived`,
              });
            }
          }
        } else {
          console.log("⏭️ Not current user's order, skipping toast");
        }
      }
    );

    return () => {
      clearInterval(interval);
      subscription.remove();
      unsubscribe();
    };
  }, [guest, isLoggedIn, updateOrderStatuses]);
};
