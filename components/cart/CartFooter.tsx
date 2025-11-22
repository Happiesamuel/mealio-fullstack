import { cart } from "@/constnts/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";
export default function CartFooter() {
  function handleCheckout() {
    router.push("/check/checkout");
  }
  return (
    <View className="gap-3 mt-4">
      <View className="">
        <View className="bg-[#E8E8E8] mb-8 px-4 rounded-2xl flex flex-row items-center justify-between">
          <View className="gap-2 flex items-center flex-row flex-1 py-2">
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              size={14}
              color="#A1A1A1"
            />
            <TextInput
              className="font-roboto text-sm  w-[90%]"
              placeholder="Promo Code"
              placeholderTextColor={"#8E9AAF"}
            />
          </View>
          <Pressable
            className="bg-primary rounded-xl py-2 px-4"
            onPress={() => {}}
          >
            <Text className="text-base font-roboto-bold text-white text-center">
              Apply
            </Text>
          </Pressable>
        </View>
        <View className="gap-2.5">
          <Foot
            title="Subtotal"
            price={157}
            priceClass="text-sm"
            titleClass="text-grey text-sm"
          />
          <Foot
            title="Delivery Fees"
            price={20}
            priceClass="text-sm"
            titleClass="text-grey text-sm"
          />
          <Foot
            title="Discount"
            price={0}
            priceClass="text-sm"
            titleClass="text-black text-sm"
          />
          <Foot
            title="Total"
            price={162}
            priceClass="text-[22px]"
            titleClass="text-black text-xl"
          />
        </View>
      </View>
      <RoundedFullButton
        onPress={cart.length ? handleCheckout : () => null}
        className={cn(
          "bg-primary mt-8",
          !cart.length ? "bg-[#95A199]" : "bg-primary"
        )}
      >
        <Text className="text-base font-roboto-bold text-white py-4 text-center">
          Checkout Now
        </Text>
      </RoundedFullButton>
    </View>
  );
}
function Foot({
  title,
  price,
  priceClass,
  titleClass,
}: {
  price: number;
  title: string;
  priceClass: string;
  titleClass: string;
}) {
  return (
    <View className="flex items-center justify-between  flex-row">
      <Text className={cn("font-roboto text-black", titleClass)}>{title}</Text>
      <Text className={cn("font-roboto-semibold text-black", priceClass)}>
        ${price.toFixed(2)}
      </Text>
    </View>
  );
}
