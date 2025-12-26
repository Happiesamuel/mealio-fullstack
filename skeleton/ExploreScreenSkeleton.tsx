import { useTheme } from "@/context/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { View } from "react-native";

export default function ExploreScreenSkeleton() {
  const { isDark } = useTheme();
  return (
    <View className="flex flex-row items-start justify-between gap-5">
      <View className="relative w-[166px] h-[129px]">
        <Skeleton
          width={"100%"}
          height={"100%"}
          colorMode={isDark ? "dark" : "light"}
          radius={12}
          backgroundColor="#E5E5E5"
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
            className="rounded-full items-center  justify-center border-2 border-white"
          >
            <Ionicons name="restaurant" size={20} color="#ffffff" />
          </View>
        </View>
      </View>
      <View className="mt-1 gap-2">
        <Skeleton
          width={"100%"}
          height={10}
          colorMode={isDark ? "dark" : "light"}
          radius={4}
          backgroundColor="#E5E5E5"
        />
        <Skeleton
          width={"50%"}
          height={10}
          colorMode={isDark ? "dark" : "light"}
          radius={4}
          backgroundColor="#E5E5E5"
        />
        <Skeleton
          width={"30%"}
          height={10}
          colorMode={isDark ? "dark" : "light"}
          radius={4}
          backgroundColor="#E5E5E5"
        />
      </View>
    </View>
  );
}
