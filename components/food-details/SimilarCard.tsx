import useAllFavourite from "@/hooks/useAllFavourite";
import { Meal } from "@/types";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FavouriteIcon from "../ui/FavouriteIcon";

export function SimilarCard({ item }: { item: Meal }) {
  const { handlePress, isInFavourite } = useAllFavourite(item, "meals");
  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/fooddetail/${item.id}?res=${item.restaurantId}`)
      }
      style={{ width: 220 }}
      className="gap-2 "
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

      <View className="flex justify-between flex-row items-center">
        <Text className="font-roboto text-sm text-zinc-700" numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
export function SimilarAreaCard({ item }: { item: Meal }) {
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

      <Text className="font-roboto text-sm text-zinc-700" numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}
