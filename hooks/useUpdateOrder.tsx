// hooks/useOrderStatusUpdater.ts
import { appwriteConfig, databases } from "@/lib/appwrite";
import { useCallback, useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { Query } from "react-native-appwrite";

export const useOrderStatusUpdater = () => {
  const updateOrderStatuses = useCallback(async () => {
    try {
      const now = new Date().toISOString();

      const pendingOrders = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        [Query.equal("status", "Pending"), Query.lessThan("shippedAt", now)]
      );

      if (pendingOrders.documents.length > 0) {
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
        console.log(
          `✅ Updated ${pendingOrders.documents.length} orders to Shipped`
        );
      }

      const shippedOrders = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.ordersCollectionId,
        [Query.equal("status", "Shipped"), Query.lessThan("deliveredAt", now)]
      );

      if (shippedOrders.documents.length > 0) {
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
        console.log(
          `✅ Updated ${shippedOrders.documents.length} orders to Delivered`
        );
      }
    } catch (error) {
      console.error("❌ Failed to update order statuses:", error);
    }
  }, []);

  useEffect(() => {
    updateOrderStatuses();

    const interval = setInterval(updateOrderStatuses, 5 * 60 * 1000);

    const subscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (nextAppState === "active") {
          updateOrderStatuses();
        }
      }
    );

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [updateOrderStatuses]);
};
