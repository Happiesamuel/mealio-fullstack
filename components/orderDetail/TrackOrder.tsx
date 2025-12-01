import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import { Text, View } from "react-native";
interface Step {
  title: string;
  subtitle: string;
  icon: string;
  done: boolean;
}

export default function TrackOrder() {
  const steps: Step[] = [
    {
      title: "Order placed",
      subtitle: "We have received your order on 21-Dec-2019",
      icon: "clipboard-edit-outline",
      done: true,
    },
    {
      title: "Order Confirmed",
      subtitle: "We have confirmed your order on 21-Dec-2019",
      icon: "clipboard-check-outline",
      done: true,
    },
    {
      title: "Order Processed",
      subtitle: "We are processing your order on 21-Dec-2019",
      icon: "clipboard-text-play-outline",
      done: true,
    },
    {
      title: "Out for Delivery",
      subtitle: "Your order is on its way to your location",
      icon: "truck-fast-outline",
      done: false,
    },
    {
      title: "Order Delivered",
      subtitle: "Your order has been delivered on 21-Dec-2019",
      icon: "check-circle-outline",
      done: false,
    },
  ];
  return (
    <View className="bg-[#ECECEC] p-4 rounded-xl shadow-sm my-4">
      <Text className="text-base font-roboto-semibold mb-3">Track Order</Text>

      <View className="flex">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;

          return (
            <View key={index} className="flex-row ">
              <View className="items-center">
                <View
                  className={`w-4 h-4 rounded-full border-2 ${
                    step.done
                      ? "bg-green-500 border-green-500"
                      : "border-gray-400"
                  }`}
                />

                {!isLast && (
                  <View
                    className={`w-0.5 flex-1 ${
                      step.done ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </View>

              <View className="ml-4 pb-6">
                <View className="flex-row items-center gap-2">
                  <View
                    className={cn(
                      "size-8 rounded-full flex items-center justify-center",
                      step.done ? "bg-primary" : "bg-[#9CA3AF]"
                    )}
                  >
                    <MaterialCommunityIcons
                      name={step.icon as any}
                      size={15}
                      color={"#FFFFFF"}
                    />
                  </View>
                  <View>
                    <Text
                      className={`text-sm font-roboto-medium ${
                        step.done ? "text-black" : "text-grey"
                      }`}
                    >
                      {step.title}
                    </Text>
                    <Text
                      className={`text-sm mt-1 font-roboto ${
                        step.done ? "text-gray-600" : "text-gray-400"
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
