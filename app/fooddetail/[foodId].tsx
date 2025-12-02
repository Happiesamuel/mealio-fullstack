import DetailsBio from "@/components/food-details/DetailsBio";
import DetailsHeader from "@/components/food-details/DetailsHeader";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { detailsSlide } from "@/constnts/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function FoodDetail() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <SafeAreaView edges={["top"]} className="bg-secondary px-5 h-full">
      <DetailsHeader />
      <ScrollView
        contentContainerClassName="pb-2"
        showsVerticalScrollIndicator={false}
      >
        <DetailsBio />
        <View className="gap-2.5 mb-6">
          <Text className="text-base font-roboto-semibold text-black">
            Add ons
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            contentContainerClassName="gap-2"
          >
            {detailsSlide.map((detail) => (
              <TouchableOpacity
                onPress={() => setActive(detail.name)}
                key={detail.name}
                className={cn(
                  "size-[100px] flex items-center justify-center gap-1 rounded-xl",
                  active === detail.name
                    ? "border border-primary bg-primary/10"
                    : "bg-[#E0E0E0]"
                )}
              >
                <Image
                  resizeMode="contain"
                  className="size-[50px]"
                  source={detail.image}
                />
                <Text className="font-roboto-medium text-xs text-black">
                  {detail.name}
                </Text>
                <Text className="font-roboto-medium text-xs text-grey">
                  ${detail.price}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <View className="flex items-center justify-between flex-row py-3">
        <View className="flex justify-between">
          <Text className="font-roboto text-base text-grey">Total</Text>
          <Text className="font-roboto-medium text-2xl text-black">$250</Text>
        </View>

        <RoundedFullButton className="bg-primary w-[70%] self-end">
          <View className="py-4 flex items-center justify-center flex-row gap-2">
            <MaterialCommunityIcons
              name="cart-outline"
              size={24}
              color={"white"}
            />
            <Text className="font-roboto-bold text-base text-white">
              Add to Cart
            </Text>
          </View>
        </RoundedFullButton>
      </View>
    </SafeAreaView>
  );
}
