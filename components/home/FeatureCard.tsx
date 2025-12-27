import useAllCart from "@/hooks/useAllCart";
import useAllFavourite from "@/hooks/useAllFavourite";
import { FavouriteMeal, Meal } from "@/types";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FavouriteIcon from "../ui/FavouriteIcon";
import QuantityChange from "../ui/QuantityChange";
export default function FeatureCard({ item }: { item: Meal }) {
  const { isInCart, handleQuantity, handleCart, quan, status, quanStat } =
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
      className="gap-1.5 w-[48.8%] p-1.5 mb-1 border dark:!border-zinc-200/10  !border-zinc-200/70  rounded-xl"
    >
      <View className="w-full relative">
        <Image
          className="rounded-lg w-full"
          source={{ uri: item.image }}
          style={{ height: 120 }}
          resizeMode="cover"
        />
        <FavouriteIcon
          handlePress={() => handlePress("meals")}
          isInFavourite={isInFavourite}
        />
      </View>
      <Text
        className="font-roboto-semibold text-sm dark:text-white/80 text-black"
        numberOfLines={1}
      >
        {item.title}
      </Text>
      <Text className="font-roboto text-xs text-grey" numberOfLines={1}>
        {item.description}
      </Text>
      <View className="flex items-center flex-row gap-1">
        <View className="flex items-center flex-row gap-1">
          <AntDesign name="star" size={12} color="#FF8007" />
          <Text className="font-roboto text-xs dark:text-secondary text-black">
            {item.rating.toFixed(1)}
          </Text>
        </View>
        <Text className="font-roboto text-xs text-grey">
          ({item.reviews.length} reviews)
        </Text>
      </View>
      <View className="flex justify-between flex-row items-center">
        <Text className="font-roboto-medium text-sm dark:text-secondary text-black">
          ₦{item.price.toFixed(2)}
        </Text>
        {isInCart ? (
          <QuantityChange
            quanStat={quanStat}
            quan={quan}
            handleQuantity={handleQuantity}
          />
        ) : status === "pending" ? (
          <ActivityIndicator size={15} color={"#14b74d"} />
        ) : (
          <TouchableOpacity
            onPress={handleCart}
            className={cn(
              " rounded-md size-7 flex items-center justify-center ",
              isInCart ? "bg-primary" : "border border-primary/30"
            )}
          >
            <MaterialCommunityIcons
              name="cart-outline"
              size={15}
              color={isInCart ? "white" : "#14b74d"}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}
