import FeatureCard from "@/components/home/FeatureCard";
import SearchBar from "@/components/home/SearchBar";
import NoSearchResult from "@/components/search/NoSearchResult";
import RecentSearch from "@/components/search/RecentSearch";
import SearchFavourite from "@/components/search/SearchFavourite";
import SearchHeader from "@/components/search/SearchHeader";
import Error from "@/components/ui/Error";
import { useMealsQuery } from "@/hooks/useMeals";
import { useMealSearch } from "@/hooks/useSearch";
import FeturedCardSkeleton from "@/skeleton/FeturedCardSkeleton";
import { Meal } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const { query, pricing, rating, categories, sort } = useLocalSearchParams<{
    query: string;
    pricing: string;
    rating: string;
    sort: string;
    categories: string;
  }>();
  const { data: meals, status, error, refetch } = useMealSearch(query);
  const { error: mealErr } = useMealsQuery();
  function handleSearch(test: string) {
    if (test) router.setParams({ query: test });
  }

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
    <SafeAreaView
      edges={["top"]}
      className="bg-secondary h-full px-3 w-fit pb-safe"
    >
      <>
        <SearchHeader />
        <SearchBar handleSearch={handleSearch} value={query} />
        {error || mealErr ? (
          <Error error={error?.message || mealErr?.message} onPress={refetch} />
        ) : query ? (
          status === "pending" ? (
            <View className="w-full items-start">
              <ActivityIndicator size="small" color="#14b74d" />
            </View>
          ) : (
            <Text className="text-black font-roboto-semibold text-sm">
              {meals?.length} Results Found
            </Text>
          )
        ) : (
          ""
        )}
      </>
      {!error && !mealErr && (
        <FlatList
          data={filteredMeals}
          renderItem={({ item }: { item: Meal }) => <FeatureCard item={item} />}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerClassName="pb-6"
          columnWrapperClassName="flex gap-2  my-2  "
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            if (status === "pending" && query)
              return (
                <View className="flex-row flex-wrap justify-between gap-y-4 px-1">
                  {[...Array(6)].map((_, index) => (
                    <FeturedCardSkeleton key={index} />
                  ))}
                </View>
              );
            return <>{query ? <NoSearchResult /> : <RecentSearch />}</>;
          }}
          ListFooterComponent={<SearchFavourite />}
        />
      )}
    </SafeAreaView>
  );
}
