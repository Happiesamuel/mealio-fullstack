import { images } from "@/constnts";
import React from "react";
import { Image, Text, View } from "react-native";

export default function EmptyNotification() {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        className="size-[200px] h-[150px]"
        source={images.emptyNot}
        resizeMode="cover"
      />
      <Text className="font-roboto-bold text-xl text-black">
        No notification yet!
      </Text>
      <Text className="font-roboto text-sm text-grey text-center max-w-[180px]">
        You don&apos;t have any notification yet, check back later.
      </Text>
    </View>
  );
}
