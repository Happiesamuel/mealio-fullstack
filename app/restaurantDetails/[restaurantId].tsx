import RestaurantHeader from "@/components/restaurantDetails/RestaurantHeader";
import RestaurantMenu from "@/components/restaurantDetails/RestaurantMenu";
import RestaurantOffers from "@/components/restaurantDetails/RestaurantOffers";
import RestaurantReviews from "@/components/restaurantDetails/RestaurantReviews";
import { images } from "@/constnts";
import { offers, popularMeals, reviews } from "@/constnts/constant";
import { ItemProp, Review } from "@/types";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantTabHeader from "../../components/restaurantDetails/RestaurantTabHeader";
type ItemType = ItemProp | Review;
export default function RestaurantDetail() {
  const { detail } = useLocalSearchParams<{ detail: string }>();
  const [tabSlug, setTabSlug] = useState(detail || "menu");
  return (
    <SafeAreaView edges={["top"]} className="bg-secondary h-full px-3 pb-safe">
      <RestaurantHeader />
      <FlatList<ItemType>
        showsVerticalScrollIndicator={false}
        key={tabSlug === "reviews" ? "one-col" : "two-col"}
        numColumns={tabSlug === "reviews" ? 1 : 2}
        data={
          tabSlug === "menu"
            ? popularMeals
            : tabSlug === "offers"
              ? offers
              : reviews
        }
        contentContainerClassName={cn(
          "pb-6 ",
          tabSlug === "reviews" && "gap-5"
        )}
        columnWrapperClassName={tabSlug !== "reviews" ? "flex gap-2.5" : ""}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return tabSlug === "menu" ? (
            <RestaurantMenu item={item as unknown as ItemProp} />
          ) : tabSlug === "offers" ? (
            <RestaurantOffers item={item as unknown as ItemProp} />
          ) : (
            <RestaurantReviews item={item as unknown as Review} />
          );
        }}
        ListHeaderComponent={() => (
          <View className="gap-3  flex items-center mt-6">
            <Image
              source={images.exploreRestaurantTwo}
              className="rounded-full size-[140px]"
              resizeMode="cover"
            />
            <View className="gap-1.5 flex items-center">
              <View className="flex items-center flex-row gap-1.5">
                <Text className="font-roboto-semibold text-2xl text-black">
                  Mr Bolat Kitchen
                </Text>
                <MaterialIcons name="verified" size={24} color="#14B74D" />
              </View>
              <View className="flex items-center flex-row gap-1">
                <EvilIcons name="location" size={18} color="#A1A1A1" />
                <Text className="font-roboto text-sm text-grey">
                  Ikeja, Lagos; 2km away
                </Text>
              </View>
              <Text className="font-roboto text-grey text-sm text-center">
                Step into Maison Delish, where every meal is a celebration of
                flavor and artistry. Our chefs craft each dish with the finest
                seasonal ingredients, blending traditional recipes with modern
                techniques to create a dining experience that delights all
                senses.
              </Text>
            </View>
            <RestaurantTabHeader tabSlug={tabSlug} setTabSlug={setTabSlug} />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
