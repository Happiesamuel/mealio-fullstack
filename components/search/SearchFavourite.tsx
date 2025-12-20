import { useFavouriteStorage } from "@/store/useFavouriteStore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function SearchFavourite() {
  const { favourite } = useFavouriteStorage();
  const arr = [
    ...favourite.meals.map((x) => {
      return { name: x.title, date: x.date };
    }),
    ...favourite.restaurants.map((x) => {
      return { name: x.name, date: x.date };
    }),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((x) => x.name)
    .slice(0, 5);
  console.log(arr);
  return arr.length ? (
    <View className="gap-4 mt-4">
      <View className="flex items-center justify-between flex-row">
        <Text className="text-sm font-roboto-semibold text-black">
          Recently Favorited
        </Text>
        <Link href={"/favourite"} className="text-sm font-roboto text-primary">
          View all
        </Link>
      </View>
      <View className="gap-5">
        {arr.map((favor) => (
          <View
            key={favor}
            className="bg-[#EEEEEE] px-2.5 py-2.5 flex items-center flex-row justify-between"
          >
            <View className="flex items-center flex-row gap-2">
              <AntDesign name="clock-circle" size={12} color="#A1A1A1" />
              <Text className="font-roboto text-sm text-grey">{favor}</Text>
            </View>
            <Ionicons name="heart" size={20} color="#14B74D" />
          </View>
        ))}
      </View>
    </View>
  ) : (
    ""
  );
}
