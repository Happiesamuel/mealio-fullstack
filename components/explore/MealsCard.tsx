import { MealProp } from "@/types";
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
export default function MealsCard({ item }: { item: MealProp }) {
  return (
    <View className="flex flex-row items-center justify-between gap-5">
      <TouchableOpacity
        onPress={() => router.push(`/fooddetail/${item.id}`)}
        className="w-[166px] h-[129px]"
      >
        <Image
          resizeMode="cover"
          source={item.image}
          className="size-full rounded-2xl"
        />
      </TouchableOpacity>
      <View className="gap-6 flex-1">
        <View className="gap-2">
          <Text
            className="font-roboto-medium text-lg text-black"
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <View className="flex justify-between flex-row items-center">
            <View className="flex items-center flex-row gap-1">
              <AntDesign name="clock-circle" size={12} color="#A1A1A1" />
              <Text className="font-roboto text-xs text-grey">{item.time}</Text>
            </View>
            <View className="flex items-center flex-row gap-1">
              <AntDesign name="star" size={12} color="#FF8007" />
              <Text className="font-roboto text-xs text-grey">
                {item.rating.toFixed(1)}
              </Text>
            </View>
          </View>
          <Text className="font-roboto-medium text-base text-black">
            ${item.price}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <RoundedFullButton
            onPress={() => null}
            className={cn(
              "bg-primary flex flex-row w-fit px-4 items-center py-2 justify-center gap-2"
            )}
          >
            <MaterialCommunityIcons
              name={`cart-outline`}
              size={14}
              color={"white"}
            />
            <Text className="text-xs font-roboto-bold text-white text-center">
              Add to Card
            </Text>
          </RoundedFullButton>
          <RoundedFullButton className="bg-grey/5 flex items-center justify-center w-[32px] h-[32px] ">
            <Ionicons name="heart-outline" size={18} color="black" />
          </RoundedFullButton>
        </View>
      </View>
    </View>
  );
}
