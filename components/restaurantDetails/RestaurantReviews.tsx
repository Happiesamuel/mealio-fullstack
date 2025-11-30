import { Review } from "@/types";
import React from "react";
import { Image, Text, View } from "react-native";

export default function RestaurantReviews({ item }: { item: Review }) {
  return (
    <View>
      <View className="flex items-center flex-row justify-between">
        <View className="gap-1.5 flex flex-row items-center">
          <Image
            source={item.image}
            resizeMode="contain"
            className="rounded-full size-6"
          />
          <Text className="text-xs font-roboto text-black">{item.name}</Text>
        </View>
        <Text className="text-grey font-roboto text-xs italic">
          {item.time}
        </Text>
      </View>
      <View></View>
      <Text className="text-xs italic font-roboto text-black">
        {item.content}
      </Text>
    </View>
  );
}
