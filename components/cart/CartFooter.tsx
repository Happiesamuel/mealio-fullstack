import { useCartStorage } from "@/store/useCartStore";
import { useUserStorage } from "@/store/useUserStore";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Foot from "../ui/Foot";
import RoundedFullButton from "../ui/RoundedFullButton";
import PromoCode from "./PromoCode";
export default function CartFooter() {
  const { totalCartPrice, total, cart } = useCartStorage();
  const { guest } = useUserStorage();
  function handleCheckout() {
    router.push("/check/checkout");
  }
  const price = totalCartPrice();
  const totalPrice = total();
  return (
    <View className="gap-3 mt-4">
      <View className="">
        <PromoCode />

        <View className="gap-2.5">
          <Foot
            title="Subtotal"
            price={price ? price : 0}
            priceClass="text-sm"
            titleClass="text-grey text-sm"
          />
          <Foot
            title="Delivery Fees"
            price={price ? 20 : 0}
            priceClass="text-sm"
            titleClass="text-grey text-sm"
          />
          <Foot
            title="Discount"
            price={price ? 15 : 0}
            priceClass="text-sm"
            titleClass="text-black text-sm"
          />
          <Foot
            title="Total"
            price={totalPrice ? Math.floor(totalPrice - 15 + 20) : 0}
            priceClass="text-[22px]"
            titleClass="text-black text-xl"
          />
        </View>
      </View>
      <RoundedFullButton
        onPress={
          !guest
            ? () => router.push(`/login?from=cart`)
            : cart?.length
              ? handleCheckout
              : () => null
        }
        className={cn(" mt-8", !cart?.length ? "bg-[#95A199]" : "bg-primary")}
      >
        <Text className="text-base font-roboto-bold text-white py-4 text-center">
          Checkout Now
        </Text>
      </RoundedFullButton>
    </View>
  );
}
