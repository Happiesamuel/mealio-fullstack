import { Orders } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import cn from "clsx";
import React from "react";
import { Text, View } from "react-native";

export default function OrderCard({ item }: { item: Orders }) {
  return (
    <View className="bg-[#F0F0F0] rounded-xl py-3 px-3 border border-grey">
      <View className="flex flex-row items-center justify-between">
        <View className="gap-1">
          <Text className="text-base font-roboto-semibold text-black">
            {item.orderId}
          </Text>
          <Text className="text-xs font-roboto text-grey">
            Ordered on {item.date}
          </Text>
        </View>
        <View
          className={cn(
            " rounded-lg border border-grey/50 py-1 px-2 flex flex-row gap-1.5 items-center",
            item.status === "Delivered"
              ? "bg-primary/20"
              : item.status === "Shipped"
                ? "bg-[#0B298A]/20"
                : "bg-error/10"
          )}
        >
          <FontAwesome
            name="check-square"
            size={15}
            color={
              item.status === "Delivered"
                ? "#14B74D"
                : item.status === "Shipped"
                  ? "#0B298A"
                  : "#FF1414"
            }
          />
          <Text
            className={cn(
              " font-roboto text-sm ",
              item.status === "Delivered"
                ? "text-primary"
                : item.status === "Shipped"
                  ? "text-[#0B298A]"
                  : "text-error"
            )}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );
}
