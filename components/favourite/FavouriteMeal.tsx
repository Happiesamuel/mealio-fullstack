import { useTheme } from "@/context/ThemeProvider";
import useAllFavourite from "@/hooks/useAllFavourite";
import { FavouriteMeal as Fav } from "@/types";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";
export default function FavouriteMeal({ item }: { item: Fav }) {
  const { handlePress, isInFavourite } = useAllFavourite(item, "meals");
  const { isDark } = useTheme();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/fooddetail/${item.id}?res=${item.restaurantId}`)
      }
      className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 bg-zinc-200/10 dark:bg-zinc-900  justify-between gap-3"
    >
      <View className="w-full h-[160px]">
        <Image
          resizeMode="cover"
          source={{ uri: item.image }}
          className="size-full rounded-t-xl"
        />
      </View>
      <View className="gap-4 ">
        <View className="gap-1">
          <View className="flex items-center flex-row justify-between">
            <Text
              className="font-roboto-medium text-lg dark:text-white text-black"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text className="font-roboto-medium text-base dark:text-secondary/80 text-black">
              ${item.price.toFixed(2)}
            </Text>
          </View>
          <View className="flex items-center justify-between flex-row">
            <View className="flex gap-4 flex-row items-center">
              <View className="flex items-center flex-row gap-1">
                <AntDesign name="clock-circle" size={12} color="#A1A1A1" />
                <Text className="font-roboto text-xs text-grey">
                  {item.time}
                </Text>
              </View>
              <View className="flex items-center flex-row gap-1">
                <AntDesign name="star" size={12} color="#FF8007" />
                <Text className="font-roboto text-xs text-grey">
                  {item.rating!.toFixed(1)}
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-4">
              <RoundedFullButton
                onPress={() => handlePress("meals")}
                className="bg-grey/5 flex items-center justify-center w-[32px] h-[32px] "
              >
                <Ionicons
                  name={isInFavourite ? "heart" : "heart-outline"}
                  size={18}
                  color={isInFavourite ? "#ff1414" : "white"}
                />
              </RoundedFullButton>
              <RoundedFullButton
                onPress={() => null}
                className={cn(
                  "bg-grey/5 dark:bg-white/5 flex flex-row w-[30px] h-[30px]  items-center justify-center gap-2"
                )}
              >
                <MaterialCommunityIcons
                  name={`cart-outline`}
                  size={14}
                  color={isDark ? "#f7f7f7" : "#191919"}
                />
              </RoundedFullButton>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
