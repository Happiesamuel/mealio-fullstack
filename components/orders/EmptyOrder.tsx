import { images } from "@/constnts";
import React from "react";
import { Image, Text, View } from "react-native";

export default function EmptyOrder() {
  return (
    <View className="flex items-center justify-center gap-2 mt-24">
      <Image
        className="size-[200px] h-[150px]"
        source={images.noOrder}
        resizeMode="cover"
      />
      <Text className="font-roboto-bold text-xl dark:text-white text-black mt-5">
        No Orders
      </Text>
      <Text className="font-roboto text-sm text-grey text-center max-w-[180px]">
        You haven&apos;t placed any orders yet
      </Text>
    </View>
  );
}
