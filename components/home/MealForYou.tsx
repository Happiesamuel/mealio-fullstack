import FeturedCardSkeleton from "@/skeleton/FeturedCardSkeleton";
import { useMeals } from "@/store/useMealStore";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";
import FeatureCard from "./FeatureCard";

export default function MealForYou() {
  const { mealsForYou, loading, error } = useMeals();
  return (
    <View className="gap-2 mb-4">
      <View className="flex items-center justify-between flex-row w-full">
        <Text className="font-roboto-medium text-sm text-black py-2">
          Meal for you
        </Text>
        <FontAwesome name="angle-right" size={20} color="black" />
      </View>
      <FlatList
        data={mealsForYou}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-6 "
        columnWrapperClassName="flex gap-2   "
        renderItem={({ item }) => <FeatureCard item={item} />}
        ListEmptyComponent={() => {
          if (loading) {
            return (
              <View className="flex-row flex-wrap justify-between gap-y-4 px-1">
                {[...Array(4)].map((_, index) => (
                  <FeturedCardSkeleton key={index} />
                ))}
              </View>
            );
          }

          return (
            <View className="p-4">
              <Text>No result</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
