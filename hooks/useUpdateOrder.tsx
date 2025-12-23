// import { appwriteConfig, client, databases } from "@/lib/appwrite";
// import { useUserStorage } from "@/store/useUserStore";
// import { useCallback, useEffect } from "react";
// import { AppState, AppStateStatus } from "react-native";
// import { Query } from "react-native-appwrite";
// import Toast from "react-native-toast-message";
// import useUpdateOrd from "./useUpdteOrder";

// export const useOrderStatusUpdater = () => {
//   const { update } = useUpdateOrd();
//   const { guest } = useUserStorage();
//   const updateOrderStatuses = useCallback(async () => {
//     try {
//       const now = new Date().toISOString();

//       const pendingOrders = await databases.listDocuments(
//         appwriteConfig.databaseId,
//         appwriteConfig.ordersCollectionId,
//         [Query.equal("status", "Pending"), Query.lessThan("shippedAt", now),]
//       );

//       pendingOrders.documents.forEach((order) => {
//         console.log(`Order ${order.$id}:`, {
//           status: order.status,
//           shippedAt: order.shippedAt,
//           isPastTime: new Date(order.shippedAt) < new Date(now),
//         });
//       });

//       if (pendingOrders.documents.length > 0) {
//         await Promise.all(
//           pendingOrders.documents.map((order) =>
//             update({ id: order.$id, update: { status: "Shipped" } })
//           )
//         );
//         console.log(
//           guest && pendingOrders.documents.some((x) => x.guests === guest?.$id)
//         );
//         console.log(guest);
//         if (
//           guest &&
//           pendingOrders.documents.some((x) => x.guests === guest?.$id)
//         ) {
//           Toast.show({
//             type: "success",
//             text1: "📦 Order Shipped!",
//             text2: `${pendingOrders.documents.length} order(s) on the way`,
//           });
//         }
//       }

//       const shippedOrders = await databases.listDocuments(
//         appwriteConfig.databaseId,
//         appwriteConfig.ordersCollectionId,
//         [Query.equal("status", "Shipped"), Query.lessThan("deliveredAt", now)]
//       );

//       shippedOrders.documents.forEach((order) => {
//         console.log(`Order ${order.$id}:`, {
//           status: order.status,
//           deliveredAt: order.deliveredAt,
//           isPastTime: new Date(order.deliveredAt) < new Date(now),
//         });
//       });

//       if (shippedOrders.documents.length > 0) {
//         await Promise.all(
//           shippedOrders.documents.map((order) =>
//             update({ id: order.$id, update: { status: "Delivered" } })
//           )
//         );
//         console.log(
//           guest &&
//             shippedOrders.documents.some((x) => x.guests === guest?.$id, guest)
//         );
//         if (
//           guest &&
//           shippedOrders.documents.some((x) => x.guests === guest?.$id)
//         ) {
//           Toast.show({
//             type: "success",
//             text1: "✅ Order Delivered!",
//             text2: `${shippedOrders.documents.length} order(s) arrived. Enjoy!`,
//           });
//         }
//       }
//     } catch (error) {
//       console.error("❌ Failed to update order statuses:", error);
//     }
//   }, []);

//   useEffect(() => {
//     updateOrderStatuses();

//     const interval = setInterval(
//       () => {
//         console.log("⏱️ 5-minute interval triggered");
//         updateOrderStatuses();
//       },
//       1 * 60 * 1000
//     );

//     const subscription = AppState.addEventListener(
//       "change",
//       (nextAppState: AppStateStatus) => {
//         if (nextAppState === "active") {
//           updateOrderStatuses();
//         }
//       }
//     );

//     const unsubscribe = client.subscribe(
//       [
//         `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.ordersCollectionId}.documents`,
//       ],
//       (response) => {}
//     );

//     return () => {
//       clearInterval(interval);
//       subscription.remove();
//       unsubscribe();
//     };
//   }, [updateOrderStatuses]);
// };

// hooks/useOrderStatusUpdater.ts
import { appwriteConfig, client, databases } from "@/lib/appwrite";
import { useUserStorage } from "@/store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { Query } from "react-native-appwrite";
import Toast from "react-native-toast-message";
import useUpdateOrd from "./useUpdteOrder";

export const useOrderStatusUpdater = () => {
  const queryClient = useQueryClient();
  const { guest, isLoggedIn } = useUserStorage();
  const { update } = useUpdateOrd();
  const updateOrderStatuses = useCallback(async () => {
    console.log("🔍 Starting order status check for ALL users...");
    console.log("⏰ Current time:", new Date().toISOString());

    try {
      const now = new Date().toISOString();

      // 🔥 Update Pending → Shipped (ALL USERS)
      console.log("🔎 Checking for pending orders (all users)...");
      const pendingOrders = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        [
          Query.equal("status", "Pending"),
          Query.lessThan("shippedAt", now),
          // ❌ NO guest filter here - update ALL users
        ]
      );

      console.log(
        `📋 Found ${pendingOrders.documents.length} pending orders to ship (all users)`
      );

      if (pendingOrders.documents.length > 0) {
        // Update all orders
        await Promise.all(
          pendingOrders.documents.map((order) =>
            databases.updateDocument(
              appwriteConfig.databaseId,
              appwriteConfig.ordersCollectionId,
              order.$id,
              { status: "Shipped" }
            )
          )
        );
        queryClient.invalidateQueries({ queryKey: ["orders", guest?.$id] });
        console.log(
          `✅ Updated ${pendingOrders.documents.length} orders to Shipped`
        );

        if (guest && isLoggedIn) {
          const userOrders = pendingOrders.documents.filter(
            (order: any) => order.guests === guest.$id
          );

          if (userOrders.length > 0) {
            console.log(
              `🎉 Current user has ${userOrders.length} shipped orders`
            );
            Toast.show({
              type: "success",
              text1: "📦 Order Shipped!",
              text2: `${userOrders.length} order(s) on the way`,
            });
          }
        }
      }

      console.log("🔎 Checking for shipped orders (all users)...");
      const shippedOrders = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        [Query.equal("status", "Shipped"), Query.lessThan("deliveredAt", now)]
      );

      console.log(
        `📋 Found ${shippedOrders.documents.length} shipped orders to deliver (all users)`
      );

      if (shippedOrders.documents.length > 0) {
        // Update all orders
        await Promise.all(
          shippedOrders.documents.map((order) =>
            databases.updateDocument(
              appwriteConfig.databaseId,
              appwriteConfig.ordersCollectionId,
              order.$id,
              { status: "Delivered" }
            )
          )
        );
        queryClient.invalidateQueries({ queryKey: ["orders", guest?.$id] });
        console.log(
          `✅ Updated ${shippedOrders.documents.length} orders to Delivered`
        );

        if (guest && isLoggedIn) {
          const userOrders = shippedOrders.documents.filter(
            (order: any) => order.guests === guest.$id
          );

          if (userOrders.length > 0) {
            console.log(
              `🎉 Current user has ${userOrders.length} delivered orders`
            );
            Toast.show({
              type: "success",
              text1: "✅ Order Delivered!",
              text2: `${userOrders.length} order(s) arrived. Enjoy!`,
            });
          }
        }
      }

      console.log("✅ Order status check completed");
    } catch (error) {
      console.error("❌ Failed to update order statuses:", error);
    }
  }, [guest, isLoggedIn]);

  useEffect(() => {
    console.log("🚀 useOrderStatusUpdater mounted");

    // Initial update
    updateOrderStatuses();

    // Periodic updates every minute
    const interval = setInterval(
      () => {
        console.log("⏱️ Interval triggered");
        updateOrderStatuses();
      },
      0.2 * 60 * 1000
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

        // 🔥 Only show toast if it's the current user's order
        if (guest && isLoggedIn && order.guests === guest.$id) {
          if (
            response.events.includes(
              "databases.*.collections.*.documents.*.update"
            )
          ) {
            console.log("🎉 Showing toast for current user's order");

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
      console.log("🛑 useOrderStatusUpdater unmounting");
      clearInterval(interval);
      subscription.remove();
      unsubscribe();
    };
  }, [guest, isLoggedIn, updateOrderStatuses]);
};
