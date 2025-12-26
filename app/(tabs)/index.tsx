import Banner from "@/components/home/Banner";
import Categories from "@/components/home/Categories";
import ExploreRestaurant from "@/components/home/ExploreRestaurant";
import FeatureCard from "@/components/home/FeatureCard";
import HomeHeader from "@/components/home/HomeHeader";
import MealForYou from "@/components/home/MealForYou";
import Offers from "@/components/home/Offers";
import PopularMeals from "@/components/home/PopularMeals";
import SearchBar from "@/components/home/SearchBar";
import Error from "@/components/ui/Error";
import { useTheme } from "@/context/ThemeProvider";
import { useMealsQuery } from "@/hooks/useMeals";
import FeturedCardSkeleton from "@/skeleton/FeturedCardSkeleton";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const { isDark } = useTheme();
  const { featuredMeals, status, error, refetch } = useMealsQuery();
  const params = useLocalSearchParams<{ fil: string }>();

  const [fil, setFil] = useState(params.fil || "All");

  const filteredMeals =
    fil === "All"
      ? featuredMeals
      : featuredMeals.filter((x) => x.category === fil);

  function handlePressFilter(slug: string) {
    setFil(slug);
    router.setParams({ fil: slug });
  }
  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-secondary dark:bg-[#121212] h-full px-3  "
    >
      {error ? (
        <>
          <HomeHeader />
          <SearchBar onPress={() => router.push("/search")} />
          <Error error={error.message} onPress={refetch} />
        </>
      ) : (
        <FlatList
          data={filteredMeals}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerClassName="pb-4 "
          columnWrapperClassName="flex gap-2   "
          renderItem={({ item }) => <FeatureCard item={item} />}
          ListHeaderComponent={() => (
            <>
              <HomeHeader />
              <SearchBar onPress={() => router.push("/search")} />
              <Banner />
              <ExploreRestaurant />
              <Categories handlePressFilter={handlePressFilter} fil={fil} />

              <View className="flex items-center justify-between flex-row w-full mt-4 mb-2">
                <Text className="font-roboto-medium text-sm dark:text-secondary text-black py-2">
                  Feature Meals
                </Text>
                <FontAwesome
                  name="angle-right"
                  size={20}
                  color={isDark ? "#f7f7f7" : "#191919"}
                />
              </View>
            </>
          )}
          ListFooterComponent={() => (
            <>
              <Offers />
              <MealForYou />
              <PopularMeals />
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
      )}
    </SafeAreaView>
  );
}
