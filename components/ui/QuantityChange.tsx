import { AntDesign } from "@expo/vector-icons";
import cn from "clsx";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
export default function QuantityChange({
  quan,
  handleQuantity,
  quanStat,
}: {
  quan: number;
  quanStat: string;
  handleQuantity(type: string): void;
}) {
  return (
    <View className="flex items-center flex-row gap-2">
      <TouchableOpacity
        className={cn(
          "border  size-[22px] rounded-lg flex items-center justify-center",
          quan <= 1
            ? "border-grey bg-transparent"
            : "border-primary bg-primary/10"
        )}
        onPress={() => handleQuantity("decrease")}
      >
        <AntDesign
          name="minus"
          size={11}
          color={quan <= 1 ? "#A1A1A1" : "#14B74D"}
        />
      </TouchableOpacity>
      {quanStat === "pending" ? (
        <ActivityIndicator size={15} color={"#14b74d"} />
      ) : (
        <Text className="text-sm font-roboto-semibold dark:text-secondary/80 text-black">
          {quan}
        </Text>
      )}
      <TouchableOpacity
        className="border border-primary bg-primary/10 size-[22px] rounded-lg flex items-center justify-center"
        onPress={() => handleQuantity("increase")}
      >
        <AntDesign name="plus" size={11} color="#14B74D" />
      </TouchableOpacity>
    </View>
  );
}
