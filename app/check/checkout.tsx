import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import Location from "@/components/checkout/Location";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import cn from "clsx";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checkout() {
  const select = true;
  function handleCheckout() {
    router.push("/successOrder/1");
  }
  return (
    <SafeAreaView className="bg-secondary h-full px-5 w-fit">
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
              $100.00
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
