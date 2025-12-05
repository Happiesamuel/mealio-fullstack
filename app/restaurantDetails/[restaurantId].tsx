import RestaurantHeader from "@/components/restaurantDetails/RestaurantHeader";
import RestaurantMenu from "@/components/restaurantDetails/RestaurantMenu";
import RestaurantOffers from "@/components/restaurantDetails/RestaurantOffers";
import RestaurantReviews from "@/components/restaurantDetails/RestaurantReviews";
import { offers } from "@/constnts/constant";
import { useMealsQuery } from "@/hooks/useMeals";
import { useZustMeals } from "@/store/useMealStore";
import { ItemProp, Meal, RestaurantReview } from "@/types";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantTabHeader from "../../components/restaurantDetails/RestaurantTabHeader";
type ItemType = Meal | RestaurantReview | ItemProp;
export default function RestaurantDetail() {
  const { detail, restaurantId } = useLocalSearchParams<{
    detail: string;
    restaurantId: string;
  }>();
  const [tabSlug, setTabSlug] = useState(detail || "menu");
  const { meals, status } = useMealsQuery();
  const { restaurants } = useZustMeals();
  const food = meals.filter((m) => m.restaurantId === restaurantId);
  const res = restaurants.find((x) => x.id === restaurantId);
  return (
    <SafeAreaView edges={["top"]} className="bg-secondary h-full px-3 pb-safe">
      <RestaurantHeader />
      <FlatList<ItemType>
        showsVerticalScrollIndicator={false}
        key={tabSlug === "reviews" ? "one-col" : "two-col"}
        numColumns={tabSlug === "reviews" ? 1 : 2}
        data={
          tabSlug === "menu"
            ? food
            : tabSlug === "offers"
              ? offers
              : res?.reviews
        }
        contentContainerClassName={cn(
          "pb-6 ",
          tabSlug === "reviews" && "gap-5"
        )}
        columnWrapperClassName={tabSlug !== "reviews" ? "flex gap-2.5" : ""}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return tabSlug === "menu" ? (
            <RestaurantMenu item={item as unknown as Meal} />
          ) : tabSlug === "offers" ? (
            <RestaurantOffers item={item as unknown as ItemProp} />
          ) : (
            <RestaurantReviews item={item as unknown as RestaurantReview} />
          );
        }}
        ListHeaderComponent={() => (
          <View className="gap-3  flex items-center mt-6">
            <Image
              source={res?.image}
              className="rounded-full size-[140px]"
              resizeMode="cover"
            />
            <View className="gap-1.5 flex items-center">
              <View className="flex items-center flex-row gap-1.5">
                <Text className="font-roboto-semibold text-2xl text-black">
                  {res?.name}
                </Text>
                <MaterialIcons name="verified" size={24} color="#14B74D" />
              </View>
              <View className="flex items-center flex-row gap-1">
                <EvilIcons name="location" size={18} color="#A1A1A1" />
                <Text className="font-roboto text-sm text-grey">
                  {res?.location}
                </Text>
              </View>
              <Text className="font-roboto text-grey text-sm text-center">
                {res?.description}
              </Text>
            </View>
            <RestaurantTabHeader tabSlug={tabSlug} setTabSlug={setTabSlug} />
          </View>
        )}
        ListEmptyComponent={() => {
          if (status === "pending") {
            return (
              <View className="flex gap-2 items-center justify-center w-full h-[300px] ">
                <ActivityIndicator size={"large"} color="#14B74D" />
                <Text className="text-grey text-sm font-roboto">
                  Loading Details
                </Text>
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
    </SafeAreaView>
  );
}
