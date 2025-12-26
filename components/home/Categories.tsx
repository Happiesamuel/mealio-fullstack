import { useTheme } from "@/context/ThemeProvider";
import { useCategoriesQuery } from "@/hooks/useCategories";
import cn from "clsx";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
export default function Categories({
  fil,
  handlePressFilter,
}: {
  fil: string;
  handlePressFilter: (slug: string) => void;
}) {
  const { data: categories, status: catStatus } = useCategoriesQuery();
  const { isDark } = useTheme();
  const newData = categories
    ? [{ name: "All", id: "2", image: "" }, ...categories]
    : [];
  return (
    <FlatList
      horizontal
      data={newData}
      keyExtractor={(item) => item.name}
      ListEmptyComponent={() => {
        if (catStatus === "pending")
          return (
            <View className="flex-row flex-wrap items-center gap-5 mt-4 mb-2">
              {[...Array(4)].map((_, index) => (
                <Skeleton
                  width={60}
                  height={20}
                  colorMode={isDark ? "dark" : "light"}
                  radius={6}
                  backgroundColor={isDark ? "#121212" : "#E5E5E5"}
                  key={index}
                />
              ))}
            </View>
          );
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePressFilter(item.name)}
          className={cn(
            "px-3 py-1 rounded-lg h-fit",
            fil === item.name ? "bg-primary" : "bg-[#EEEEEE] dark:bg-white/5"
          )}
        >
          <Text
            className={cn(
              "font-roboto-semibold text-sm ",
              fil === item.name
                ? "text-white"
                : "text-[#767676] dark:text-white/70"
            )}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
      contentContainerClassName="gap-5 mt-4  h-fit"
      showsHorizontalScrollIndicator={false}
    />
  );
}
