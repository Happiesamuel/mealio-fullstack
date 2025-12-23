import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/**
 * Send notification when order is placed successfully
 */
// export async function sendOrderPlacedNotification(
//   orderNumber: string,
//   restaurantName: string
// ) {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Order Placed! 🎉",
//       body: `${restaurantName} is preparing order #${orderNumber}`,
//       data: {
//         type: "order_placed",
//         orderNumber,
//       },
//     },
//     trigger: null, // Send immediately
//     ...(Platform.OS === "android" && { channelId: "orders" }),
//   });
// }
export async function setupNotificationCategories() {
  await Notifications.setNotificationCategoryAsync("order_notification", [
    {
      identifier: "view_order",
      buttonTitle: "View Order",
      options: {
        opensAppToForeground: true,
      },
    },
    {
      identifier: "dismiss",
      buttonTitle: "Dismiss",
      options: {
        opensAppToForeground: false,
      },
    },
  ]);
}
export async function sendOrderPlacedNotification(
  orderNumber: string,
  restaurantName: string,
  orderId: string | undefined // <- Add this parameter
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order Placed! 🎉",
      body: `${restaurantName} is preparing order #${orderNumber}`,
      data: {
        type: "order_placed",
        orderNumber,
        orderId,
      },
      categoryIdentifier: "order_notification", // <- Add this
    },
    trigger: null,
    ...(Platform.OS === "android" && { channelId: "orders" }),
  });
}
/**
 * Send notification when order is being prepared
 */
export async function sendOrderPreparingNotification(
  orderNumber: string,
  estimatedTime: string
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order Being Prepared 👨‍🍳",
      body: `Your order #${orderNumber} will be ready in ${estimatedTime} `,
      data: {
        type: "order_preparing",
        orderNumber,
      },
    },
    trigger: null,
    ...(Platform.OS === "android" && { channelId: "orders" }),
  });
}

/**
 * Send notification when order is ready for pickup
 */
export async function sendOrderReadyNotification(orderNumber: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order Ready! 🎉",
      body: `Order #${orderNumber} is ready for pickup`,
      data: {
        type: "order_ready",
        orderNumber,
      },
    },
    trigger: null,
    ...(Platform.OS === "android" && { channelId: "orders" }),
  });
}

/**
 * Send notification when order is out for delivery
 */
export async function sendOrderOutForDeliveryNotification(
  orderNumber: string,
  driverName?: string
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order On The Way! 🛵",
      body: driverName
        ? `${driverName} is delivering order #${orderNumber}`
        : `Your order #${orderNumber} is on the way`,
      data: {
        type: "order_delivery",
        orderNumber,
      },
    },
    trigger: null,
    ...(Platform.OS === "android" && { channelId: "orders" }),
  });
}

/**
 * Send notification when order is delivered
 */
export async function sendOrderDeliveredNotification(orderNumber: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Delivered! Enjoy Your Meal 🍕",
      body: `Order #${orderNumber} has been delivered. Bon appétit!`,
      data: {
        type: "order_delivered",
        orderNumber,
      },
    },
    trigger: null,
    ...(Platform.OS === "android" && { channelId: "orders" }),
  });
}

/**
 * Schedule reminder notification for later
 */
export async function scheduleOrderReminderNotification(
  orderNumber: string,
  scheduledTime: Date
) {
  // Send reminder 10 minutes before scheduled time
  const reminderTime = new Date(scheduledTime);
  reminderTime.setMinutes(reminderTime.getMinutes() - 10);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order Coming Soon! ⏰",
      body: `Your scheduled order #${orderNumber} will be ready in 10 minutes`,
      data: {
        type: "order_reminder",
        orderNumber,
      },
    },
    trigger: { date: reminderTime } as Notifications.NotificationTriggerInput, // ← Changed to object with date property
    ...(Platform.OS === "android" && { channelId: "orders" }),
  });
}
/**
 * Test notification function
 */
export async function sendTestNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Test Notification 🧪",
      body: "This is a test notification from your food app",
      data: { type: "test" },
    },
    trigger: null,
    ...(Platform.OS === "android" && { channelId: "orders" }),
  });
}
