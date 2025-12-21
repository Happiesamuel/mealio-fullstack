import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import Location from "@/components/checkout/Location";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { useCartStorage } from "@/store/useCartStore";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checkout() {
  const { total } = useCartStorage();
  const select = true;
  function handleCheckout() {
    router.push("/successOrder/1");
  }
  const totalPrice = Math.floor(total() - 15 + 20);
  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-secondary h-full px-5 pb-safe w-fit"
    >
      <CheckoutHeader />
      <ScrollView
        contentContainerClassName="pb-12"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-2 mt-8">
          <View className="bg-[#EEEEEE] rounded-lg flex flex-row items-center justify-between px-3 py-4">
            <Text className="font-roboto text-base text-grey">
              Payment amount
            </Text>
            <Text className="font-roboto-semibold text-base text-black">
              ${totalPrice.toFixed(2)}
            </Text>
          </View>
          <View className="gap-6 mt-4">
            <Location />
            <PaymentMethod />
          </View>
        </View>
        <RoundedFullButton
          onPress={handleCheckout}
          className={cn(
            "bg-primary mt-12",
            select ? "bg-[#95A199]" : "bg-primary"
          )}
        >
          <Text className="text-base font-roboto-bold text-white py-4 text-center">
            Pay Now
          </Text>
        </RoundedFullButton>
      </ScrollView>
    </SafeAreaView>
  );
}
