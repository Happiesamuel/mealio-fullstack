import { Meal } from "@/types";
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

export default function RestaurantMenu({ item }: { item: Meal }) {
  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/fooddetail/${item.id}?res=${item.restaurantId}`)
      }
      className="gap-2 w-[48%] mb-2.5"
    >
      <View className="w-full relative">
        <Image
          className="rounded-lg w-full"
          source={{ uri: item.image }}
          style={{ height: 160 }}
          resizeMode="cover"
        />
        <View
          className=" flex items-center justify-center  z-10 flex-row absolute  rounded-full"
          style={{
            backgroundColor: "#2E2E2E26",
            width: 32,
            height: 32,
            right: 8,
            top: 8,
          }}
        >
          <Ionicons name="heart-outline" size={20} color="white" />
        </View>
      </View>
      <Text className="font-roboto-semibold text-sm text-black">
        {item.title}
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
      <View className="flex justify-between flex-row items-center">
        <Text className="font-roboto-medium text-sm text-black">
          ${item.price.toFixed(2)}
        </Text>
        <RoundedFullButton
          onPress={() => null}
          className={cn(
            "bg-primary flex flex-row w-fit px-3 items-center py-1.5 justify-center gap-2"
          )}
        >
          <MaterialCommunityIcons
            name={`cart-outline`}
            size={14}
            color={"white"}
          />
          <Text className="text-xs font-roboto-bold text-white text-center">
            Order Now
          </Text>
        </RoundedFullButton>
      </View>
    </TouchableOpacity>
  );
}
