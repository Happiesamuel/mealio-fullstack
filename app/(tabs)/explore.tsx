import ExploreHeader from "@/components/explore/ExploreHeader";
import ExploreTabHeader from "@/components/explore/ExploreTabHeader";
import MealsCard from "@/components/explore/MealsCard";
import RestuarantCard from "@/components/explore/ResturantCard";
import ExploreScreenSkeleton from "@/skeleton/ExploreScreenSkeleton";
import { useMeals } from "@/store/useMealStore";
import { Meal, Restaurant } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type ItemType = Meal | Restaurant;
export default function Explore() {
  const { tab } = useLocalSearchParams<{ tab: string }>();
  const [tabSlug, setTabSlug] = useState(tab || "meals");
  const { meals, loading, restaurants } = useMeals();
  return (
    <SafeAreaView edges={["top"]} className="h-full bg-secondary px-5 flex-1">
      <View className="gap-2 pb-2 pt-4">
        <ExploreHeader />
        <ExploreTabHeader tabSlug={tabSlug} setTabSlug={setTabSlug} />
      </View>
      <FlatList<ItemType>
        keyExtractor={(item) => ("price" in item ? item.id : item.id)}
        data={tabSlug === "meals" ? meals : restaurants}
        renderItem={({ item }) =>
          "price" in item ? (
            <MealsCard item={item as unknown as Meal} />
          ) : (
            <RestuarantCard item={item as unknown as Restaurant} />
          )
        }
        ListEmptyComponent={() => {
          if (loading)
            return (
              <View className="gap-6">
                {[...Array(6)].map((_, index) => (
                  <ExploreScreenSkeleton key={index} />
                ))}
              </View>
            );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8 gap-6"
      />
    </SafeAreaView>
  );
}
