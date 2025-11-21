import { recentSerch } from "@/constnts/constant";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function RecentSearch() {
  return (
    <View className="gap-4">
      <View className="flex items-center justify-between flex-row">
        <Text className="text-sm font-roboto-semibold text-black">
          Recently Search
        </Text>
        <Pressable>
          <Text className="text-sm font-roboto text-error">Clear all</Text>
        </Pressable>
      </View>
      <View className="gap-5">
        {recentSerch.map((favor) => (
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
            <MaterialIcons name="clear" size={12} color="#A1A1A1" />
          </View>
        ))}
      </View>
    </View>
  );
}
