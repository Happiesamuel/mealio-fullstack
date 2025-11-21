import { ItemProp } from "@/types";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function SearchResult({ item }: { item: ItemProp }) {
  return (
    <View className="bg-[#EEEEEE] px-2.5 py-1.5 rounded-xl flex items-center flex-row gap-2">
      <View className="w-[30%]">
        <Image
          source={item.image}
          resizeMode="cover"
          className="h-[50px] w-full rounded"
        />
      </View>
      <View className="flex-1 gap-2">
        <View className="flex items-center flex-row justify-between">
          <Text className="font-roboto text-sm text-black">{item.name}</Text>
          <Text className="font-roboto-medium text-sm text-black">
            ${item.price.toFixed(2)}
          </Text>
        </View>
        <View className="flex items-center flex-row justify-between">
          <View className="flex items-center flex-row gap-1">
            <AntDesign name="clock-circle" size={12} color="#A1A1A1" />
            <Text className="font-roboto text-xs text-grey">{item.time}</Text>
          </View>
          <RoundedFullButton className="bg-primary w-fit">
            <Text className="font-roboto-bold text-white text-[6px] py-1 pb-1.5 px-2.5">
              Add to Cart
            </Text>
          </RoundedFullButton>
        </View>
      </View>
    </View>
  );
}
