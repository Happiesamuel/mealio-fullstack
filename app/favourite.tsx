import FavouriteHeader from "@/components/favourite/FavouriteHeader";
import FavouriteMeal from "@/components/favourite/FavouriteMeal";
import FavouriteRestaurant from "@/components/favourite/FavouriteRestaurant";
import FavouriteTabHeader from "@/components/favourite/FavouriteTabHeader";
import { images } from "@/constnts";
import { useFavouriteStorage } from "@/store/useFavouriteStore";
import { FavouriteMeal as Fav, Restaurant } from "@/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
type ItemType = Fav | Restaurant;
export default function Favourite() {
  const { tab } = useLocalSearchParams<{ tab: string }>();
  const [tabSlug, setTabSlug] = useState(tab || "meals");
  const { favourite } = useFavouriteStorage();
  return (
    <SafeAreaView
      edges={["top"]}
      className="h-full bg-secondary dark:bg-[#121212] pb-safe px-5"
    >
      <View className="gap-2 pb-2 pt-4">
        <FavouriteHeader />
        <FavouriteTabHeader tabSlug={tabSlug} setTabSlug={setTabSlug} />
      </View>
      <FlatList<ItemType>
        keyExtractor={(item) => item.id}
        data={tabSlug === "meals" ? favourite.meals : favourite.restaurants}
        renderItem={({ item }) =>
          "price" in item ? (
            <FavouriteMeal item={item as unknown as Fav} />
          ) : (
            <FavouriteRestaurant item={item as unknown as Restaurant} />
          )
        }
        ListEmptyComponent={() => (
          <View className="flex items-center justify-center gap-2 mt-24">
            <Image
              className="size-[200px] h-[150px]"
              source={images.noOrder}
              resizeMode="cover"
            />
            <Text className="font-roboto-bold text-xl dark:text-white text-black mt-5">
              No Favourite {tabSlug === "meals" ? "meal" : "restaurant"}
            </Text>
            <Text className="font-roboto text-sm text-grey text-center max-w-[180px]">
              You haven&apos;t added any item to your list
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-8 gap-6"
      />
    </SafeAreaView>
  );
}
