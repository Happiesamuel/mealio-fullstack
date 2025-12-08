import { AntDesign } from "@expo/vector-icons";
import cn from "clsx";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
export default function QuantityChange({
  quan,
  handleQuantity,
}: {
  quan: number;
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
      <Text className="text-sm font-roboto-semibold text-black">{quan}</Text>
      <TouchableOpacity
        className="border border-primary bg-primary/10 size-[22px] rounded-lg flex items-center justify-center"
        onPress={() => handleQuantity("increase")}
      >
        <AntDesign name="plus" size={11} color="#14B74D" />
      </TouchableOpacity>
    </View>
  );
}
