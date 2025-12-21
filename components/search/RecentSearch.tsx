import { useSearchStorage } from "@/store/useSearchStore";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function RecentSearch() {
  const { search, clearSearch, removeItem } = useSearchStorage();
  return search.length ? (
    <View className="gap-4">
      <View className="flex items-center justify-between flex-row">
        <Text className="text-sm font-roboto-semibold text-black">
          Recently Search
        </Text>
        <Pressable onPress={() => clearSearch()}>
          <Text className="text-sm font-roboto text-error">Clear all</Text>
        </Pressable>
      </View>
      <View className="gap-5">
        {search
          // .sort((a, b) => b?.date?.getTime() - a?.date?.getTime())
          .slice(0, 5)
          .map((favor) => (
            <View
              key={favor.title}
              className="bg-[#EEEEEE] px-2.5 py-2.5 flex items-center flex-row justify-between"
            >
              <View className="flex items-center flex-row gap-2">
                <AntDesign name="clock-circle" size={12} color="#A1A1A1" />
                <Text className="font-roboto text-sm text-grey">
                  {favor.title}
                </Text>
              </View>
              <Pressable onPress={() => removeItem(favor.title)}>
                <MaterialIcons name="clear" size={12} color="#A1A1A1" />
              </Pressable>
            </View>
          ))}
      </View>
    </View>
  ) : (
    ""
  );
}
