import { useTheme } from "@/context/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";

export default function FeturedCardSkeleton() {
  const { isDark } = useTheme();
  return (
    <View className=" w-[49%] p-1.5 mb-1">
      <View className="relative">
        <Skeleton
          width={"100%"}
          height={150}
          colorMode={isDark ? "dark" : "light"}
          radius={12}
          // backgroundColor="#E5E5E5"
        />

        <View className="absolute inset-0 flex items-center justify-center">
          <View
            style={{
              width: 40,
              height: 40,
              borderWidth: 2,
              borderColor: isDark ? "rgb(255 255 255 / 0.5)" : "white",
              borderRadius: "100%",
            }}
            className="rounded-full items-center  justify-center border-2 size-8 border-white dark:border-white/10"
          >
            <Ionicons
              name="restaurant"
              size={20}
              color={isDark ? "rgb(255 255 255 / 0.5)" : "#ffffff"}
            />
          </View>
        </View>
      </View>
      <View className="mt-1">
        <Skeleton
          width={"80%"}
          height={10}
          colorMode={isDark ? "dark" : "light"}
          radius={4}
          // backgroundColor="#E5E5E5"
        />
      </View>
    </View>
  );
}
