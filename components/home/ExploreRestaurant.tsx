import { useTheme } from "@/context/ThemeProvider";
import { useZustMeals } from "@/store/useMealStore";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
export default function ExploreRestaurant() {
  const { restaurants } = useZustMeals();
  const { isDark } = useTheme();
  return (
    <View className="gap-1 mt-4">
      <View className="flex items-center justify-between flex-row w-full">
        <Text className="font-roboto-medium text-sm dark:text-secondary text-black">
          Explore Restaurants
        </Text>
        <Pressable onPress={() => router.push("/explore?tab=restaurant")}>
          <FontAwesome
            name="angle-right"
            size={20}
            color={isDark ? "#f7f7f7" : "#191919"}
          />
        </Pressable>
      </View>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/restaurantDetails/${item.id}`)}
            className="gap-2 items-center justify-center"
          >
            <Image
              source={item.image}
              resizeMode="cover"
              className="size-[50px] rounded-full"
            />
            <Text className="font-roboto text-xs text-center dark:text-white/50 text-black">
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        contentContainerClassName="gap-6 my-4 h-fit"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
