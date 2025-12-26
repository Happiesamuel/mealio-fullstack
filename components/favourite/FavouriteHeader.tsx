import { useTheme } from "@/context/ThemeProvider";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function FavouriteHeader() {
  const { isDark } = useTheme();
  return (
    <View className="flex flex-row items-center justify-between pb-2  pt-4">
      <RoundedFullButton
        className="bg-grey/5 dark:bg-white/5 flex items-center justify-center w-[32px] h-[32px] "
        onPress={() =>
          router.canGoBack() ? router.back() : router.replace("/(tabs)")
        }
      >
        <FontAwesome
          name="angle-left"
          size={18}
          color={isDark ? "#f7f7f7" : "#191919"}
        />
      </RoundedFullButton>
      <Text className="font-roboto-bold text-xl text-black dark:text-white  text-center">
        Favorites
      </Text>
      <View className="flex items-center flex-row gap-3.5">
        <RoundedFullButton
          className="bg-grey/5 dark:bg-white/5 flex items-center justify-center w-[32px] h-[32px] "
          onPress={() => router.push("/cart")}
        >
          <MaterialIcons
            name="support-agent"
            size={18}
            color={isDark ? "#f7f7f7" : "#191919"}
          />
        </RoundedFullButton>
        <RoundedFullButton
          className="bg-grey/5 dark:bg-white/5 flex items-center justify-center w-[32px] h-[32px] "
          onPress={() => router.push("/cart")}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={18}
            color={isDark ? "#f7f7f7" : "#191919"}
          />
        </RoundedFullButton>
      </View>
    </View>
  );
}
