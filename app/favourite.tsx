import FavouriteHeader from "@/components/favourite/FavouriteHeader";
import FavouriteMeal from "@/components/favourite/FavouriteMeal";
import FavouriteRestaurant from "@/components/favourite/FavouriteRestaurant";
import FavouriteTabHeader from "@/components/favourite/FavouriteTabHeader";
import { explore, exploreResturants } from "@/constnts/constant";
import { MealProp, ResturntProp } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type ItemType = MealProp | ResturntProp;
export default function Favourite() {
  const { tab } = useLocalSearchParams<{ tab: string }>();
  const [tabSlug, setTabSlug] = useState(tab || "meals");
  return (
    <SafeAreaView edges={["top"]} className="h-full bg-secondary px-5">
      <View className="gap-2 pb-2 pt-4">
        <FavouriteHeader />
        <FavouriteTabHeader tabSlug={tabSlug} setTabSlug={setTabSlug} />
      </View>
      <FlatList<ItemType>
        keyExtractor={(item) => ("id" in item ? item.id : item.slug)}
        data={tabSlug === "meals" ? explore : exploreResturants}
        renderItem={({ item }) =>
          "price" in item ? (
            <FavouriteMeal item={item as unknown as MealProp} />
          ) : (
            <FavouriteRestaurant item={item as unknown as ResturntProp} />
          )
        }
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8 gap-6"
      />
    </SafeAreaView>
  );
}
