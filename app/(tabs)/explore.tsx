import ExploreHeader from "@/components/explore/ExploreHeader";
import ExploreTabHeader from "@/components/explore/ExploreTabHeader";
import MealsCard from "@/components/explore/MealsCard";
import RestuarantCard from "@/components/explore/ResturantCard";
import { useMealsQuery } from "@/hooks/useMeals";
import ExploreScreenSkeleton from "@/skeleton/ExploreScreenSkeleton";
import { useZustMeals } from "@/store/useMealStore";
import { Meal, Restaurant } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type ItemType = Meal | Restaurant;
export default function Explore() {
  const { tab, pricing, rating, categories, sort } = useLocalSearchParams<{
    tab: string;
    pricing: string;
    rating: string;
    sort: string;
    categories: string;
  }>();
  const [tabSlug, setTabSlug] = useState(tab || "meals");
  const { meals, status } = useMealsQuery();
  const { restaurants } = useZustMeals();

  const filteredMeals = useMemo(() => {
    if (!meals || meals.length === 0) return [];

    let list = [...meals];

    const cats = categories ? JSON.parse(categories) : [];

    if (cats.length > 0) {
      list = list.filter((item) => cats.includes(item.category));
    }

    if (pricing === "asc") {
      list = list.sort((a, b) => a.price - b.price);
    }
    if (pricing === "desc") {
      list = list.sort((a, b) => b.price - a.price);
    }

    if (rating === "desc") {
      list = list.sort((a, b) => b.rating - a.rating);
    }
    if (rating === "asc") {
      list = list.sort((a, b) => a.rating - b.rating);
    }

    if (sort === "asc") {
      list = list.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sort === "desc") {
      list = list.sort((a, b) => b.title.localeCompare(a.title));
    }

    return list;
  }, [meals, categories, rating, pricing, sort]);

  return (
    <SafeAreaView edges={["top"]} className="h-full bg-secondary px-5 flex-1">
      <View className="gap-2 pb-2 pt-4">
        <ExploreHeader />
        <ExploreTabHeader tabSlug={tabSlug} setTabSlug={setTabSlug} />
      </View>
      <FlatList<ItemType>
        keyExtractor={(item) => ("price" in item ? item.id : item.id)}
        data={tabSlug === "meals" ? filteredMeals : restaurants}
        renderItem={({ item }) =>
          "price" in item ? (
            <MealsCard item={item as unknown as Meal} />
          ) : (
            <RestuarantCard item={item as unknown as Restaurant} />
          )
        }
        ListEmptyComponent={() => {
          if (status === "pending")
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
