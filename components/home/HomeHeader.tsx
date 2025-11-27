import { icons } from "@/constnts";
import { Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function HomeHeader() {
  return (
    <View className="flex flex-row items-center justify-between">
      <View className="flex flex-row gap-2 items-center">
        <Image
          source={icons.defaultProfile}
          className="rounded-full size-12"
          resizeMode="contain"
        />

        <View className="flex flex-col gap-2">
          <Text className="text-grey font-roboto text-xs">Hello,</Text>
          <Text className="font-roboto-medium text-sm text-black">
            Guest102
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/notifications")}
        className="flex items-center justify-center rounded-full relative bg-grey/5 size-12"
      >
        <Fontisto name="bell" size={20} color="#191919" />
        <View className="size-2 rounded-full bg-error absolute right-3.5 top-4" />
      </TouchableOpacity>
    </View>
  );
}
