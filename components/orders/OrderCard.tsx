import { Orders } from "@/types";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function OrderCard({ item }: { item: Orders }) {
  return (
    <View className="bg-[#F0F0F0] rounded-xl py-3 px-3 gap-3 border border-grey/50">
      <View className="flex flex-row items-center justify-between">
        <View className="gap-1">
          <Text className="text-base font-roboto-semibold text-black">
            {item.orderId}
          </Text>
          <Text className="text-xs font-roboto text-grey">
            Ordered on {item.date}
          </Text>
        </View>
        <View
          className={cn(
            " rounded-lg border border-grey/50 py-1 px-2 flex flex-row gap-1.5 items-center",
            item.status === "Delivered"
              ? "bg-primary/20"
              : item.status === "Shipped"
                ? "bg-[#0B298A]/20"
                : "bg-error/10"
          )}
        >
          <FontAwesome
            name="check-square"
            size={15}
            color={
              item.status === "Delivered"
                ? "#14B74D"
                : item.status === "Shipped"
                  ? "#0B298A"
                  : "#FF1414"
            }
          />
          <Text
            className={cn(
              " font-roboto text-sm ",
              item.status === "Delivered"
                ? "text-primary"
                : item.status === "Shipped"
                  ? "text-[#0B298A]"
                  : "text-error"
            )}
          >
            {item.status}
          </Text>
        </View>
      </View>
      <View className="flex items-center gap-1.5 flex-row bg-grey/10 rounded px-2.5 py-1.5 ">
        <Image
          source={item.restaurantImage}
          className="w-[75px] h-[60px] rounded-lg"
          resizeMode="cover"
        />
        <View className="gap-1">
          <View className="flex items-center flex-row gap-2">
            <Text
              className="font-roboto-medium text-lg text-black"
              numberOfLines={1}
            >
              {item.restaurantName}
            </Text>
            <MaterialIcons name="verified" size={16} color="#14B74D" />
          </View>
          <View className="flex flex-row items-center gap-1.5">
            <Image
              source={item.orders.at(0)!.image}
              className="w-[35px] h-[28px] rounded-lg"
              resizeMode="cover"
            />
            <View className="gap-0.5">
              <Text className="font-roboto-medium text-sm text-black">
                {item.orders.at(0)!.name}
              </Text>
              <View className="flex items-center flex-row gap-1">
                <AntDesign name="clock-circle" size={10} color="#A1A1A1" />
                <Text className="font-roboto text-xs text-grey">
                  {item.orders.at(0)!.date}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <RoundedFullButton
        className="bg-primary"
        onPress={() => router.push(`/order/5`)}
      >
        <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
          Order Details
        </Text>
      </RoundedFullButton>
    </View>
  );
}
