import { useSimilarCategory } from "@/hooks/useSimilarCategory";
import { OffersSkeleton } from "@/skeleton/OffersSkeleton";
import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import { SimilarAreaCard } from "./SimilarCard";

export default function SimilarArea({ area }: { area: string }) {
  const { data, status, error } = useSimilarCategory(area, "area");
  if (status === "pending") {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-5"
      >
        {[...Array(6)].map((_, index) => (
          <OffersSkeleton key={index} />
        ))}
      </ScrollView>
    );
  }
  return (
    <View className="gap-2">
      <Text className="text-base font-roboto-semibold text-black">
        Similar {area} foods
      </Text>
      <FlatList
        data={data}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerClassName="gap-3.5  "
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <SimilarAreaCard item={item} />;
        }}
        ListEmptyComponent={() => {
          return (
            <View className="p-4">
              <Text>No result</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
