import useAllFavourite from "@/hooks/useAllFavourite";
import { FavouriteMeal, Meal } from "@/types";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FavouriteIcon from "../ui/FavouriteIcon";

export default function PopularCard({ item }: { item: Meal }) {
  const { handlePress, isInFavourite } = useAllFavourite(
    item as unknown as FavouriteMeal,
    "meals"
  );
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
        <Text
          className="font-roboto-semibold text-sm dark:text-white text-black"
          numberOfLines={1}
        >
          {item.title}
        </Text>
      </View>
      <View className="flex justify-between flex-row items-center">
        <View className="flex items-center flex-row gap-1">
          <AntDesign name="clock-circle" size={12} color="#A1A1A1" />
          <Text className="font-roboto text-xs text-grey">{item.time}</Text>
        </View>
        <View className="flex items-center flex-row gap-1">
          <Text className="font-roboto-medium text-sm dark:text-white/80 text-black">
            ${item.price.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
