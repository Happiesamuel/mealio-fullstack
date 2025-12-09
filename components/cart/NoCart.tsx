import { images } from "@/constnts";
import React from "react";
import { Image, Text, View } from "react-native";

export default function NoCart() {
  return (
    <View className="flex items-center justify-center h-[250px] gap-1.5">
      <Image className="size-24" source={images.noCart} />
      <Text className="font-roboto-semibold text-sm text-center text-black">
        Hungry? Add something tasty to your cart.
      </Text>
    </View>
  );
}
