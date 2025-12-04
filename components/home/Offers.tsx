import { OffersSkeleton } from "@/skeleton/OffersSkeleton";
import { useMeals } from "@/store/useMealStore";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";
import OffersCard from "./OffersCard";

export default function Offers() {
  const { todaysOffers, loading } = useMeals();

  return (
    <View className="gap-2 mb-4">
      <View className="flex items-center justify-between flex-row w-full">
        <Text className="font-roboto-medium text-sm text-black py-2">
          Todays offer
        </Text>
        <FontAwesome name="angle-right" size={20} color="black" />
      </View>
      <FlatList
        data={todaysOffers}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerClassName="gap-3.5  "
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OffersCard item={item} />}
        ListEmptyComponent={() => {
          if (loading) {
            return (
              <View className="flex-row flex-wrap gap-5 justify-between ">
                {[...Array(6)].map((_, index) => (
                  <OffersSkeleton key={index} />
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
