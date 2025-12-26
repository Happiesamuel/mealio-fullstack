import { useTheme } from "@/context/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function CartHeader() {
  const { isDark } = useTheme();
  return (
    <View className="flex flex-row items-center justify-between my-1 pt-4">
      <Text className="font-roboto-bold text-xl text-black dark:text-white">
        Cart
      </Text>

      <RoundedFullButton
        className="bg-grey/5 dark:bg-white/5 flex items-center justify-center w-[32px] h-[32px] "
        onPress={() => router.push("/favourite")}
      >
        <Ionicons
          name="heart-outline"
          size={18}
          color={isDark ? "#f7f7f7" : "#191919"}
        />
      </RoundedFullButton>
    </View>
  );
}
