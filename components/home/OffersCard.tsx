import { Meal } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function OffersCard({ item }: { item: Meal }) {
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
