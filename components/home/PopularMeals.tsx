import { useMeals } from "@/store/useMealStore";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";
import PopularCard from "./PopularCard";

export default function PopularMeals() {
  const { popular, loading, error, refetch } = useMeals();
  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  if (error)
    return (
      <View>
        <Text>{error}.</Text>
      </View>
    );
  const popularMeals = popular.map((pop) => {
    return {
      price: pop.pricePerServing,
      time: pop.cookingMinutes
        ? `${pop.cookingMinutes || pop.preparationMinutes}-${pop.readyInMinutes}mins`
        : `${pop.readyInMinutes}mins`,
      rating: 5,
      image: pop.image,
      name: pop.title,
      id: pop.id,
    };
  });
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
        keyExtractor={(item) => item.id.toString()}
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
