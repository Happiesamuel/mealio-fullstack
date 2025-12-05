import Banner from "@/components/home/Banner";
import ExploreRestaurant from "@/components/home/ExploreRestaurant";
import FeatureCard from "@/components/home/FeatureCard";
import HomeHeader from "@/components/home/HomeHeader";
import MealForYou from "@/components/home/MealForYou";
import Offers from "@/components/home/Offers";
import PopularMeals from "@/components/home/PopularMeals";
import SearchBar from "@/components/home/SearchBar";
import { categories } from "@/constnts/constant";
import { useMealsQuery } from "@/hooks/useMeals";
import FeturedCardSkeleton from "@/skeleton/FeturedCardSkeleton";
import { FontAwesome } from "@expo/vector-icons";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const { featuredMeals, status } = useMealsQuery();
  const params = useLocalSearchParams<{ fil: string }>();
  const [fil, setFil] = useState(params.fil || "all");
  function handlePressFilter(slug: string) {
    setFil(slug);
    router.setParams({ fil: slug });
  }
  return (
    <SafeAreaView edges={["top"]} className="bg-secondary h-full px-3  ">
      <FlatList
        data={featuredMeals}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-6 "
        columnWrapperClassName="flex gap-2   "
        renderItem={({ item }) => <FeatureCard item={item} />}
        ListHeaderComponent={() => (
          <>
            <HomeHeader />
            <SearchBar onPress={() => router.push("/search")} />
            <Banner />
            <FlatList
              horizontal
              data={categories}
              extraData={fil}
              initialScrollIndex={0}
              keyExtractor={(item) => item.slug}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handlePressFilter(item.slug)}
                  className={cn(
                    "px-3 py-1 rounded-lg h-fit",
                    fil === item.slug ? "bg-primary" : "bg-[#EEEEEE]"
                  )}
                >
                  <Text
                    className={cn(
                      "font-roboto-semibold text-sm ",
                      fil === item.slug ? "text-white" : "text-[#767676]"
                    )}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerClassName="gap-5 my-4 h-fit"
              showsHorizontalScrollIndicator={false}
            />
            <ExploreRestaurant />
            <Offers />
            <MealForYou />
            <PopularMeals />
            <View className="flex items-center justify-between flex-row w-full mt-4 mb-2">
              <Text className="font-roboto-medium text-sm text-black py-2">
                Feature Meals
              </Text>
              <FontAwesome name="angle-right" size={20} color="black" />
            </View>
          </>
        )}
        ListEmptyComponent={() => {
          if (status === "pending") {
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
    </SafeAreaView>
  );
}
