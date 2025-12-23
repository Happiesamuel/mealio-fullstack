// hooks/useOrderRealtime.ts
import { appwriteConfig, client } from "@/lib/appwrite";
import { useUserStorage } from "@/store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export const useOrderRealtime = () => {
  const { guest, isLoggedIn } = useUserStorage();
  const queryClient = useQueryClient();

  useEffect(() => {
    // 🔥 Don't subscribe if user is logged out
    if (!guest?.$id || !isLoggedIn) {
      return;
    }

    console.log("🔌 Subscribing to real-time updates for user:", guest.$id);

    const unsubscribe = client.subscribe(
      [
        `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.ordersCollectionId}.documents`,
      ],
      (response) => {
        const order: any = response.payload;

        // 🔥 CRITICAL: Only handle this user's orders
        if (order.guests !== guest.$id) {
          return; // Silently ignore other users' orders
        }

        // Invalidate React Query cache
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.update"
          )
        ) {
          queryClient.invalidateQueries({ queryKey: ["orders", guest.$id] });

          // Show toast
          if (order.status === "Shipped") {
            Toast.show({
              type: "info",
              text1: "📦 Order Shipped!",
              text2: `Order #${order.orderId} is on the way`,
              position: "top",
              visibilityTime: 4000,
            });
          } else if (order.status === "Delivered") {
            Toast.show({
              type: "success",
              text1: "✅ Order Delivered!",
              text2: `Order #${order.orderId} has arrived`,
              position: "top",
              visibilityTime: 4000,
            });
          }
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [guest?.$id, isLoggedIn, queryClient]);
};
