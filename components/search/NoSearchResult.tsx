import { images } from "@/constnts";
import React from "react";
import { Image, Text, View } from "react-native";

export default function NoSearchResult() {
  return (
    <View className="flex items-center justify-center h-[200px] gap-1.5">
      <Image className="size-24" source={images.noSearch} />
      <Text className="font-roboto-semibold text-sm text-black">
        No search Found
      </Text>
    </View>
  );
}
