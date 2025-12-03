import { ItemProp } from "@/types";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function PopularCard({ item }: { item: ItemProp }) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/fooddetail/${item.id}`)}
      style={{ width: 220 }}
      className="gap-2 "
    >
      <View className="w-full relative">
        <Image
          className="rounded-lg w-full"
          source={{ uri: item.image }}
          style={{ height: 120 }}
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

      <View className="flex justify-between flex-row items-center">
        <Text
          className="font-roboto-semibold text-sm text-black"
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </View>
      <View className="flex justify-between flex-row items-center">
        <View className="flex items-center flex-row gap-1">
          <AntDesign name="clock-circle" size={12} color="#A1A1A1" />
          <Text className="font-roboto text-xs text-grey">{item.time}</Text>
        </View>
        <View className="flex items-center flex-row gap-1">
          <Text className="font-roboto-medium text-sm text-black">
            ${item.price.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
