import { Ingredients } from "@/types";
import cn from "clsx";
import React, { Dispatch, SetStateAction } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
export default function IngredientsDet({
  ings,
  active,
  setActive,
}: {
  ings: Ingredients[];
  active: string | null;
  setActive: Dispatch<SetStateAction<string | null>>;
}) {
  return (
    <>
      <View className="pt-4">
        <Text className="text-base font-roboto-semibold dark:text-secondary text-black pb-2">
          Key Ingredients
        </Text>
      </View>
      <FlatList
        data={ings}
        horizontal
        showsHorizontalScrollIndicator={false}
        // keyExtractor={(item) => item.id}
        contentContainerClassName="gap-2"
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActive(item!.name)}
            key={item?.name}
            className={cn(
              "size-[100px] flex items-center justify-center gap-1 rounded-xl",
              active === item?.name
                ? "border border-primary bg-primary/10"
                : "bg-[#E0E0E0] dark:bg-white/10"
            )}
          >
            <Image
              resizeMode="contain"
              className="size-[50px]"
              source={{ uri: item?.img }}
            />
            <Text className="font-roboto-medium text-xs text-black dark:text-secondary/80 px-2 text-center">
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </>
  );
}
