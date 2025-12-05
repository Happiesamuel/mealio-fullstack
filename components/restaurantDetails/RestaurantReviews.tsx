import { formatReviewDate } from "@/lib/helper";
import { RestaurantReview } from "@/types";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

export default function RestaurantReviews({
  item,
}: {
  item: RestaurantReview;
}) {
  return (
    <View className="flex items-start gap-1.5 flex-row">
      <Image
        source={{ uri: item.avatar }}
        resizeMode="contain"
        className="rounded-full size-8"
      />
      <View className="flex-1 gap-1">
        <View className="flex items-center flex-row justify-between">
          <View className="gap-1.5 flex flex-row items-center">
            <Text className="text-xs font-roboto text-black">{item.user}</Text>
          </View>
          <Text className="text-grey font-roboto text-xs italic">
            {formatReviewDate(item.date)}
          </Text>
        </View>
        <View className="flex flex-row gap-[3px]">
          {Array.from({ length: Math.floor(item.rating) }, (v, i) => (
            <AntDesign key={i} name="star" size={8} color="#FF8007" />
          ))}
        </View>
        <Text
          style={{ fontStyle: "italic" }}
          className="text-sm  font-roboto text-black"
        >
          {item.comment}
        </Text>
      </View>
    </View>
  );
}
