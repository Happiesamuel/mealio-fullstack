import { images } from "@/constnts";
import React from "react";
import { Image, Text, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function Banner() {
  return (
    <View className="h-[160px] w-full relative">
      <Image
        source={images.banner}
        resizeMode="cover"
        className="size-full rounded-3xl"
      />
      <View className="bg-[#000000]/30 absolute size-full rounded-3xl" />
      <View className="gap-4 absolute top-[40px] px-3.5 max-w-[195px]">
        <View className="gap-2">
          <Text className="text-sm font-roboto-bold text-white">
            Free delivery today
          </Text>
          <Text className="text-[10px] font-roboto  text-secondary">
            For every meals order today, you&apos;ll get free deliveries with no
            hidden charges
          </Text>
        </View>
        <View className="w-[75%]">
          <RoundedFullButton className="bg-white" onPress={() => {}}>
            <Text className="text-sm font-roboto-bold  text-center text-primary py-2 px-4.5">
              Order Now
            </Text>
          </RoundedFullButton>
        </View>
      </View>
    </View>
  );
}
