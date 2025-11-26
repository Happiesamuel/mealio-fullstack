import ExploreHeader from "@/components/explore/ExploreHeader";
import ExploreTabHeader from "@/components/explore/ExploreTabHeader";
import MealsCard from "@/components/explore/MealsCard";
import ResturantCard from "@/components/explore/ResturantCard";
import { explore, exploreResturants } from "@/constnts/constant";
import { MealProp, ResturntProp } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type ItemType = MealProp | ResturntProp;
export default function Explore() {
  const { tab } = useLocalSearchParams<{ tab: string }>();
  const [tabSlug, setTabSlug] = useState(tab || "meals");
  return (
    <SafeAreaView className="h-full bg-secondary px-5">
      <View className="gap-2 pb-2 pt-4">
        <ExploreHeader />
        <ExploreTabHeader tabSlug={tabSlug} setTabSlug={setTabSlug} />
      </View>
      <FlatList<ItemType>
        keyExtractor={(item) => ("id" in item ? item.id : item.slug)}
        data={tabSlug === "meals" ? explore : exploreResturants}
        renderItem={({ item }) =>
          "price" in item ? (
            <MealsCard item={item as unknown as MealProp} />
          ) : (
            <ResturantCard item={item as unknown as ResturntProp} />
          )
        }
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8 gap-6"
      />
    </SafeAreaView>
  );
}
