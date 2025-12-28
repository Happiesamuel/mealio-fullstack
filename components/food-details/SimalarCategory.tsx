import { useSimilarCategory } from "@/hooks/useSimilarCategory";
import { PopularCardSkeleton } from "@/skeleton/PopularCardSkeleton";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SimilarCard } from "./SimilarCard";

export default function SimalarCategory({ cat }: { cat: string }) {
  const { data, status, error } = useSimilarCategory(cat, "cat");
  if (status === "pending") {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-5"
      >
        {[...Array(6)].map((_, index) => (
          <PopularCardSkeleton key={index} />
        ))}
      </ScrollView>
    );
  }
  return (
    <View className="gap-2">
      <Text className="text-base font-roboto-semibold dark:text-secondary text-black">
        Similar Category foods
      </Text>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerClassName="gap-3.5  "
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <SimilarCard item={item} />;
        }}
        ListEmptyComponent={() => {
          return (
            <View className="p-4">
              <Text className="dark:text-secondary text-black text-center font-roboto">
                No result
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
