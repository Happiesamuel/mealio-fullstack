import useAllCart from "@/hooks/useAllCart";
import useAllFavourite from "@/hooks/useAllFavourite";
import { FavouriteMeal, Meal } from "@/types";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import FavouriteIcon from "../ui/FavouriteIcon";
import QuantityChange from "../ui/QuantityChange";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function RestaurantMenu({ item }: { item: Meal }) {
  const { isInCart, handleQuantity, handleCart, quan, quanStat } =
    useAllCart(item);
  const { handlePress, isInFavourite } = useAllFavourite(
    item as unknown as FavouriteMeal,
    "meals"
  );
  return (
    <TouchableOpacity
      onPress={() =>
        router.push(`/fooddetail/${item.id}?res=${item.restaurantId}`)
      }
      className="gap-2 w-[48%] mb-2.5"
    >
      <View className="w-full relative">
        <Image
          className="rounded-lg w-full"
          source={{ uri: item.image }}
          style={{ height: 160 }}
          resizeMode="cover"
        />
        <FavouriteIcon
          handlePress={() => handlePress("meals")}
          isInFavourite={isInFavourite}
        />
      </View>
      <Text className="font-roboto-semibold text-sm text-black">
        {item.title}
      </Text>
      <View className="flex justify-between flex-row items-center">
        <View className="flex items-center flex-row gap-1">
          <AntDesign name="clock-circle" size={12} color="#A1A1A1" />
          <Text className="font-roboto text-xs text-grey">{item.time}</Text>
        </View>
        <View className="flex items-center flex-row gap-1">
          <AntDesign name="star" size={12} color="#FF8007" />
          <Text className="font-roboto text-xs text-grey">
            {item.rating.toFixed(1)}
          </Text>
        </View>
      </View>
      <View className="flex justify-between flex-row items-center">
        <Text className="font-roboto-medium text-sm text-black">
          ${item.price.toFixed(2)}
        </Text>
        {isInCart ? (
          <QuantityChange
            quanStat={quanStat}
            quan={quan}
            handleQuantity={handleQuantity}
          />
        ) : (
          <RoundedFullButton
            onPress={handleCart}
            className={cn(
              "bg-primary flex flex-row w-fit px-3 items-center py-1.5 justify-center gap-2"
            )}
          >
            <MaterialCommunityIcons
              name={`cart-outline`}
              size={14}
              color={"white"}
            />
            <Text className="text-xs font-roboto-bold text-white text-center">
              Order Now
            </Text>
          </RoundedFullButton>
        )}
      </View>
    </TouchableOpacity>
  );
}
