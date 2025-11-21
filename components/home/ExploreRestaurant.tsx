import { exploreResturants } from "@/constnts/constant";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
export default function ExploreRestaurant() {
  return (
    <View className="gap-2">
      <View className="flex items-center justify-between flex-row w-full">
        <Text className="font-roboto-medium text-sm text-black">
          Explore Restaurants
        </Text>
        <FontAwesome name="angle-right" size={20} color="black" />
      </View>
      <FlatList
        data={exploreResturants}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <TouchableOpacity className="gap-2">
            <Image
              source={item.image}
              resizeMode="cover"
              className="size-[50px] rounded-full"
            />
            <Text className="font-roboto text-xs text-center text-black">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        contentContainerClassName="gap-5 my-4 h-fit"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
