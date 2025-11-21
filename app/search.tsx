import SearchBar from "@/components/home/SearchBar";
import NoSearchResult from "@/components/search/NoSearchResult";
import RecentSearch from "@/components/search/RecentSearch";
import SearchFavourite from "@/components/search/SearchFavourite";
import SearchHeader from "@/components/search/SearchHeader";
import SearchResult from "@/components/search/SearchResult";
import { popularMeals } from "@/constnts/constant";
import { ItemProp } from "@/types";
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
    ...popularMeals.filter((text) => text.name.startsWith(params.query)),
  ];
  return (
    <SafeAreaView className="bg-secondary h-full px-3 w-fit">
      <FlatList
        data={data}
        renderItem={({ item }: { item: ItemProp }) => (
          <SearchResult item={item} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerClassName="gap-3.5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return <>{params.query ? <NoSearchResult /> : <RecentSearch />}</>;
        }}
        ListHeaderComponent={() => (
          <>
            <SearchHeader />
            <SearchBar handleSearch={handleSearch} value={params.query} />
            {params.query && (
              <Text className="text-black font-roboto-semibold text-sm">
                {data.length} Results Found
              </Text>
            )}
          </>
        )}
        ListFooterComponent={<SearchFavourite />}
      />
    </SafeAreaView>
  );
}
