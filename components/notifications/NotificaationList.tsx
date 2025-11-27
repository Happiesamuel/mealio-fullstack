import { Notification } from "@/types";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import cn from "clsx";
import React from "react";
import { Image, Text, View } from "react-native";
export default function NotificaationList({ item }: { item: Notification }) {
  return (
    <View className="flex flex-row items-start gap-2 bg-white p-3 rounded-lg border border-[#999999]/20">
      <ImageIcon item={item} />
      <View className="gap-1 flex-1">
        <Text className="text-black text-base font-roboto">{item.title}</Text>
        <Text className="text-grey text-sm font-roboto max-w-[90%]">
          {item.content}
        </Text>
        <Text className="font-roboto text-grey text-xs self-end ">
          {item.time}
        </Text>
      </View>
    </View>
  );
}
function ImageIcon({ item }: { item: Notification }) {
  return item.image !== "" ? (
    <Image
      source={item.image}
      className="rounded-full size-6"
      resizeMode="cover"
    />
  ) : (
    <View
      className={cn(
        "rounded-full flex items-center justify-center size-6 text-white",
        item.status === "success"
          ? "bg-primary"
          : item.status === "delivery"
            ? "bg-[#F79E1B]"
            : ""
      )}
    >
      {item.status === "success" ? (
        <AntDesign name="check" size={12} color="white" />
      ) : item.status === "delivery" ? (
        <FontAwesome5 name="shipping-fast" size={12} color="white" />
      ) : (
        ""
      )}
    </View>
  );
}
