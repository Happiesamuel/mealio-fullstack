import { useFetch } from "@/hooks/useFetch";
import { fetchMealsByArea } from "@/lib/action";
import { OffersSkeleton } from "@/skeleton/OffersSkeleton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SimilarArea({ area }: { area: string }) {
  const {
    data: sims,
    loading,
    error,
    refetch,
  } = useFetch({
    fn: fetchMealsByArea,
    params: { area },
  });
  if (loading) {
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
        data={sims.slice(0, 10)}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerClassName="gap-3.5  "
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => router.push(`/fooddetail/${item.id}`)}
              style={{ width: 140 }}
              className="gap-1"
            >
              <View className="w-full relative">
                <Image
                  className="rounded-lg w-full"
                  source={{ uri: item.img }}
                  style={{ height: 120 }}
                />
                <View
                  className=" flex items-center justify-center  z-10 flex-row absolute  rounded-full"
                  style={{
                    backgroundColor: "#2E2E2E26",
                    width: 32,
                    height: 32,
                    right: 8,
                    top: 8,
                  }}
                >
                  <Ionicons name="heart-outline" size={20} color="white" />
                </View>
              </View>

              <Text
                className="font-roboto-semibold text-sm text-black"
                numberOfLines={1}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
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
