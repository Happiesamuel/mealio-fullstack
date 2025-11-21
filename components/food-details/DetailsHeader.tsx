import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function DetailsHeader() {
  return (
    <View className="flex flex-row items-center justify-between my-1">
      <RoundedFullButton
        className="bg-grey/5 flex items-center justify-center w-[32px] h-[32px] "
        onPress={() => router.back()}
      >
        <FontAwesome name="angle-left" size={18} color="black" />
      </RoundedFullButton>
      <Text className="font-roboto-bold text-xl text-black">Details</Text>
      <RoundedFullButton
        className="bg-grey/5 flex items-center justify-center w-[32px] h-[32px] "
        onPress={() => router.push("/cart")}
      >
        <Ionicons name="heart-outline" size={18} color="black" />
      </RoundedFullButton>
    </View>
  );
}
