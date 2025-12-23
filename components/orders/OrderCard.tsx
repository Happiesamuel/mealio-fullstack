import { formatDateExact, formatOrder } from "@/lib/helper";
import { sendOrderPlacedNotification } from "@/lib/notification";
import { useMealStore } from "@/store/useMealStore";
import { OrderCard as Ordered } from "@/types";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function OrderCard({ item }: { item: Ordered }) {
  const { items, status, orderId } = item;
  const { restaurants } = useMealStore();
  async function handleOrder() {
    await sendOrderPlacedNotification("#37843848343", "Mama fav", "5");
  }
  const res = restaurants.find((x) => x.id === items.at(0)!.restaurantId);
  return (
    <View className="bg-[#F0F0F0] rounded-xl py-3 px-3 gap-3 border border-grey/50">
      <View className="flex flex-row items-center justify-between">
        <View className="gap-1">
          <Text className="text-base font-roboto-semibold text-black">
            #{orderId}
          </Text>
          <Text className="text-xs font-roboto text-grey">
            Ordered on {formatDateExact(items.at(0)!.$createdAt)}
          </Text>
        </View>
        <View
          className={cn(
            " rounded-lg border border-grey/50 py-1 px-2 flex flex-row gap-1.5 items-center",
            status === "Delivered"
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
          source={res?.image}
          className="w-[75px] h-[60px] rounded-lg"
          resizeMode="cover"
        />
        <View className="gap-1">
          <View className="flex items-center flex-row gap-2">
            <Text
              className="font-roboto-medium text-lg text-black"
              numberOfLines={1}
            >
              {res?.name}
            </Text>
            <MaterialIcons name="verified" size={16} color="#14B74D" />
          </View>
          <View className="flex flex-row items-center gap-1.5">
            <Image
              source={{ uri: items.at(0)!.image }}
              className="w-[35px] h-[28px] rounded-lg"
              resizeMode="cover"
            />
            <View className="gap-0.5">
              <View className="flex flex-row items-center gap-1">
                <Text
                  className="font-roboto-medium text-sm text-black flex-1 max-w-[100px]"
                  numberOfLines={1}
                >
                  {items.at(0)!.title}
                </Text>
                <Text className="font-roboto-medium text-sm text-black">
                  {items.length > 1
                    ? `+ ${items.length - 1} ${items.length - 1 === 1 ? "item" : "items"}`
                    : ""}
                </Text>
              </View>
              <View className="flex items-center flex-row gap-1">
                <AntDesign name="clock-circle" size={10} color="#A1A1A1" />
                <Text className="font-roboto text-xs text-grey">
                  {formatOrder(items.at(0)!.$createdAt)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <RoundedFullButton
        className="bg-primary"
        // onPress={handleOrder}
        onPress={() => router.push(`/order/${orderId}`)}
      >
        <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
          Order Details
        </Text>
      </RoundedFullButton>
    </View>
  );
}
