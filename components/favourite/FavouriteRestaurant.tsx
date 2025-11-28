import { ResturntProp } from "@/types";
import {
  AntDesign,
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import cn from "clsx";
import React from "react";
import { Image, Text, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";
export default function FavouriteRestaurant({ item }: { item: ResturntProp }) {
  return (
    <View className="flex flex-col border border-zinc-200 rounded-xl p-2 bg-zinc-200/10  justify-between gap-3">
      <View className="w-full h-[160px]">
        <Image
          resizeMode="cover"
          source={item.image}
          className="size-full rounded-t-xl"
        />
      </View>
      <View className="gap-4 flex-1">
        <View className="gap-1">
          <View className="flex items-center flex-row gap-2">
            <Text
              className="font-roboto-medium text-lg text-black"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <MaterialIcons name="verified" size={16} color="#14B74D" />
          </View>
          <View className="flex items-center justify-between flex-row">
            <View className="flex gap-4 flex-row items-center">
              <View className="flex items-center flex-row gap-1">
                <EvilIcons name="location" size={12} color="#A1A1A1" />
                <Text className="font-roboto text-xs text-grey">
                  {item.location}
                </Text>
              </View>
              <View className="flex items-center flex-row gap-1">
                <AntDesign name="star" size={12} color="#FF8007" />
                <Text className="font-roboto text-xs text-grey">
                  {item.rating.toFixed(1)}
                </Text>
              </View>
            </View>
            <View className="flex flex-row items-center gap-4">
              <RoundedFullButton className="bg-grey/5 flex items-center justify-center w-[32px] h-[32px] ">
                <Ionicons name="heart-outline" size={18} color="black" />
              </RoundedFullButton>
              <RoundedFullButton
                onPress={() => null}
                className={cn(
                  "bg-grey/5 flex flex-row w-[30px] h-[30px]  items-center justify-center gap-2"
                )}
              >
                <MaterialCommunityIcons
                  name={`cart-outline`}
                  size={14}
                  color={"black"}
                />
              </RoundedFullButton>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
