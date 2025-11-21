import { popularMeals } from "@/constnts/constant";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";
import PopularCard from "./PopularCard";

export default function PopularMeals() {
  return (
    <View className="gap-2">
      <View className="flex items-center justify-between flex-row w-full">
        <Text className="font-roboto-medium text-sm text-black py-2">
          Popular Meals
        </Text>
        <FontAwesome name="angle-right" size={20} color="black" />
      </View>
      <FlatList
        data={popularMeals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <PopularCard item={item} />;
        }}
        horizontal
        contentContainerClassName="gap-5  h-fit"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
