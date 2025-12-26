import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import { Text, View } from "react-native";
interface Step {
  title: string;
  subtitle: string;
  icon: string;
  done: boolean;
}

interface TrackOrderProps {
  status: string;
  createdAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export default function TrackOrder({
  status,
  createdAt,
  shippedAt,
  deliveredAt,
}: TrackOrderProps) {
  console.log(status, createdAt, shippedAt, deliveredAt);
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Pending";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStepStatus = (stepIndex: number) => {
    switch (status) {
      case "Pending":
        return stepIndex <= 0;
      case "Shipped":
        return stepIndex <= 3;
      case "Delivered":
        return true;
      default:
        return stepIndex <= 0;
    }
  };

  const steps: Step[] = [
    {
      title: "Order placed",
      subtitle: createdAt
        ? `We have received your order on ${formatDate(createdAt)}`
        : "We have received your order",
      icon: "clipboard-edit-outline",
      done: getStepStatus(0),
    },
    {
      title: "Order Confirmed",
      subtitle: createdAt
        ? `We have confirmed your order on ${formatDate(createdAt)}`
        : "We have confirmed your order",
      icon: "clipboard-check-outline",
      done: getStepStatus(1),
    },
    {
      title: "Order Processed",
      subtitle:
        status !== "Pending"
          ? `We are processing your order on ${formatDate(shippedAt)}`
          : "We are processing your order",
      icon: "clipboard-text-play-outline",
      done: getStepStatus(2),
    },
    {
      title: "Out for Delivery",
      subtitle:
        status === "Shipped" || status === "Delivered"
          ? `Your order is on its way (Shipped on ${formatDate(shippedAt)})`
          : "Your order is on its way to your location",
      icon: "truck-fast-outline",
      done: getStepStatus(3),
    },
    {
      title: "Order Delivered",
      subtitle:
        status === "Delivered"
          ? `Your order has been delivered on ${formatDate(deliveredAt)}`
          : "Your order will be delivered soon",
      icon: "check-circle-outline",
      done: getStepStatus(4),
    },
  ];

  return (
    <View className="bg-[#ECECEC] dark:bg-white/10 p-4 rounded-xl shadow-sm my-4">
      <Text className="text-base text-black dark:text-secondary font-roboto-semibold mb-3">
        Track Order
      </Text>

      <View className="flex">
        {steps.map((step, index) => {
          return (
            <View key={index} className="flex-row ">
              <View className="ml-2 pb-6">
                <View className="flex-row items-start gap-4">
                  <View
                    className={cn(
                      "size-10 rounded-full flex items-center justify-center",
                      step.done ? "bg-primary" : "bg-[#9CA3AF]"
                    )}
                  >
                    <MaterialCommunityIcons
                      name={step.icon as any}
                      size={20}
                      color={"#FFFFFF"}
                    />
                  </View>
                  <View>
                    <Text
                      className={`text-sm font-roboto-medium ${
                        step.done
                          ? "text-black dark:text-secondary"
                          : "text-grey"
                      }`}
                    >
                      {step.title}
                    </Text>
                    <Text
                      className={`text-sm mt-1 w-[90%] font-roboto ${
                        step.done
                          ? "text-zinc-600 dark:text-zinc-400"
                          : "text-zinc-400"
                      }`}
                    >
                      {step.subtitle}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
