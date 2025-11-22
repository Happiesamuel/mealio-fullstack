import SearchBar from "@/components/home/SearchBar";
import NoSearchResult from "@/components/search/NoSearchResult";
import RecentSearch from "@/components/search/RecentSearch";
import SearchFavourite from "@/components/search/SearchFavourite";
import SearchHeader from "@/components/search/SearchHeader";
import SearchResult from "@/components/search/SearchResult";
import { FeatureMeals } from "@/constnts/constant";
import { FeatureCardProp } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const params = useLocalSearchParams<{ query: string }>();
  function handleSearch(test: string) {
    if (test) router.setParams({ query: test });
  }
  const data = [
    ...FeatureMeals.filter((text) => text.name.startsWith(params.query)),
  ];
  return (
    <SafeAreaView className="bg-secondary h-full px-3 w-fit">
      <>
        <SearchHeader />
        <SearchBar handleSearch={handleSearch} value={params.query} />
        {params.query && (
          <Text className="text-black font-roboto-semibold text-sm">
            {data.length} Results Found
          </Text>
        )}
      </>
      <FlatList
        data={data}
        renderItem={({ item }: { item: FeatureCardProp }) => (
          <SearchResult item={item} />
        )}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-6"
        columnWrapperClassName="flex gap-2  my-2  "
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return <>{params.query ? <NoSearchResult /> : <RecentSearch />}</>;
        }}
        ListFooterComponent={<SearchFavourite />}
      />
    </SafeAreaView>
  );
}
