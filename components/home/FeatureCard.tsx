import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
interface FeatureCardProp {
  name: string;
  id: string;
  description: string;
  image: any;
  rating: number;
  reviews: number;
  price: number;
}
export default function FeatureCard({ item }: { item: FeatureCardProp }) {
  return (
    <TouchableOpacity
      onPress={() => router.push(`/fooddetail/${item.id}`)}
      className="gap-1.5 w-[49%] p-1.5 mb-1 border !border-zinc-200/70  rounded-xl"
    >
      <View className="w-full relative">
        <Image
          className="rounded-lg w-full"
          source={item.image}
          style={{ height: 120 }}
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
        {item.name}
      </Text>
      <Text className="font-roboto text-xs text-grey" numberOfLines={1}>
        {item.description}
      </Text>
      <View className="flex items-center flex-row gap-1">
        <View className="flex items-center flex-row gap-1">
          <AntDesign name="star" size={12} color="#FF8007" />
          <Text className="font-roboto text-xs text-black">
            {item.rating.toFixed(1)}
          </Text>
        </View>
        <Text className="font-roboto text-xs text-grey">
          ({item.reviews} reviews)
        </Text>
      </View>
      <View className="flex justify-between flex-row items-center">
        <Text className="font-roboto-medium text-sm text-black">
          ${item.price.toFixed(2)}
        </Text>
        <View className=" rounded-md size-7 flex items-center justify-center border border-primary/30">
          <MaterialCommunityIcons
            name="cart-outline"
            size={15}
            color="#14b74d"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
