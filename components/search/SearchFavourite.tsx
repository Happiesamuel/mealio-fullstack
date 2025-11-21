import { Favourite } from "@/constnts/constant";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function SearchFavourite() {
  return (
    <View className="gap-4">
      <View className="flex items-center justify-between flex-row">
        <Text className="text-sm font-roboto-semibold text-black">
          Recently Favorited
        </Text>
        <Link href={"/"} className="text-sm font-roboto text-primary">
          View all
        </Link>
      </View>
      <View className="gap-5">
        {Favourite.map((favor) => (
          <View
            key={favor.id}
            className="bg-[#EEEEEE] px-2.5 py-2.5 flex items-center flex-row justify-between"
          >
            <View className="flex items-center flex-row gap-2">
              <AntDesign name="clock-circle" size={12} color="#A1A1A1" />
              <Text className="font-roboto text-sm text-grey">
                {favor.name}
              </Text>
            </View>
            <Ionicons name="heart" size={20} color="#14B74D" />
          </View>
        ))}
      </View>
    </View>
  );
}
