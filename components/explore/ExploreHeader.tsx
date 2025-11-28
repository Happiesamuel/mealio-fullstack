import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function ExploreHeader() {
  return (
    <View className="flex flex-row items-center justify-between pt-4">
      <Text className="font-roboto-bold text-xl text-black">Explore</Text>
      <View className="gap-7 flex items-center flex-row">
        <RoundedFullButton
          className="bg-grey/5 flex items-center justify-center w-[32px] h-[32px] "
          onPress={() => router.push("/search")}
        >
          <Ionicons name="search-sharp" size={18} color="black" />
        </RoundedFullButton>
        <RoundedFullButton
          className="bg-grey/5 flex items-center justify-center w-[32px] h-[32px] "
          onPress={() => router.push("/favourite")}
        >
          <Ionicons name="heart-outline" size={18} color="black" />
        </RoundedFullButton>
      </View>
    </View>
  );
}
