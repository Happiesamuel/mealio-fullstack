import useAllFavourite from "@/hooks/useAllFavourite";
import { Meal } from "@/types";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FavouriteIcon from "../ui/FavouriteIcon";

export default function OffersCard({ item }: { item: Meal }) {
  const { handlePress, isInFavourite } = useAllFavourite(item, "meals");
  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/fooddetail/${item.id}?res=${item.restaurantId}`)
      }
      style={{ width: 140 }}
      className="gap-1"
    >
      <View className="w-full relative">
        <Image
          className="rounded-lg w-full"
          source={{ uri: item.image }}
          style={{ height: 120 }}
        />
        <FavouriteIcon
          handlePress={() => handlePress("meals")}
          isInFavourite={isInFavourite}
        />
      </View>

      <Text
        className="font-roboto-semibold text-sm text-black"
        numberOfLines={1}
      >
        {item.title}
      </Text>

      <Text className="font-roboto-medium text-sm text-black">
        ${item.price.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
}
