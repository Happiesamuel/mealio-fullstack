import { formatTimeAgo } from "@/lib/helper";
import { Notification, NotificationList } from "@/types";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import cn from "clsx";
import React from "react";
import { Image, Text, View } from "react-native";
export default function NotificaationList({
  item,
}: {
  item: NotificationList;
}) {
  return (
    <View className="flex flex-row items-start gap-2 bg-white dark:bg-white/10 p-3 rounded-lg border dark:border-zinc-800  border-[#999999]/20">
      <ImageIcon item={item} />
      <View className="gap-1 flex-1">
        <Text className="text-black text-base dark:text-secondary font-roboto">
          {item.title}
        </Text>
        <Text className="text-grey text-sm font-roboto max-w-[90%]">
          {item.content}
        </Text>
        <Text className="font-roboto text-grey text-xs self-end ">
          {formatTimeAgo(item.createdAt)}
        </Text>
      </View>
    </View>
  );
}
function ImageIcon({ item }: { item: Notification }) {
  return item.image ? (
    <Image
      source={{ uri: item.image }}
      className="rounded-full size-7"
      resizeMode="cover"
    />
  ) : (
    <View
      className={cn(
        "rounded-full flex items-center justify-center size-7 text-white",
        item.status === "order-created"
          ? "bg-[#F79E1B]"
          : item.status === "success-delivery" || item.status === "login"
            ? "bg-primary"
            : item.status === "delivery"
              ? "bg-[#F79E1B]"
              : ""
      )}
    >
      {item.status === "login" ? (
        <Ionicons name="logo-mastodon" size={14} color="white" />
      ) : item.status === "order-created" ? (
        <MaterialCommunityIcons name="food-turkey" size={14} color="white" />
      ) : item.status === "success-delivery" ? (
        <AntDesign name="check" size={12} color="white" />
      ) : item.status === "delivery" ? (
        <FontAwesome5 name="shipping-fast" size={12} color="white" />
      ) : (
        ""
      )}
    </View>
  );
}
