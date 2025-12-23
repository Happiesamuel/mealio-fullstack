import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import Location from "@/components/checkout/Location";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { useClearCart } from "@/hooks/useCart";
import useCreateOrder from "@/hooks/useCreateOrder";
import { sendOrderPlacedNotification } from "@/lib/notification";
import { useCartStorage } from "@/store/useCartStore";
import { useUserStorage } from "@/store/useUserStore";
import cn from "clsx";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
export function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `ORD-${timestamp}-${random}`;
}
export default function Checkout() {
  const { total } = useCartStorage();
  const { guest } = useUserStorage();
  const { cart } = useCartStorage();
  const { clear, status: clearStat } = useClearCart();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { create, status } = useCreateOrder();
  const select = true;
  async function handleCheckout() {
    if (!selectedAddress || !guest) return;
    try {
      const res = ["r1", "r2", "r3", "r4", "r5"].map((x) => {
        return { id: x, orderId: generateOrderId() };
      });

      const cats = cart.map((x) => {
        const a = res.find((b) => b.id === x.restaurantId);
        return {
          ...x,
          orderId: a?.orderId,
        };
      });
      const successId = generateOrderId();
      const orders = cats.map((item) => ({
        title: item.title,
        image: item.image,
        price: item.price,
        quantity: item.quantity,

        restaurantId: item.restaurantId,
        orderId: item.orderId,
        successId: successId,
        guests: guest.$id,

        orderAddress: selectedAddress,

        status: "Pending",

        createdAt: new Date().toISOString(),
        shippedAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        deliveredAt: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
        // shippedAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        // deliveredAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      }));

      await Promise.all(orders.map((order) => create(order)));
      clear();
      await sendOrderPlacedNotification(
        successId,
        "Mamy's Dishes",
        cats?.at(0)?.orderId
      );
      Toast.show({
        type: "success",
        text1: "Order placed successfully 🎉",
        text2: "Your food is on the way!",
      });

      router.replace(`/successOrder/${successId}`);
    } catch (error: any) {
      console.error("Checkout failed:", error);

      Toast.show({
        type: "error",
        text1: "Checkout failed",
        text2: error?.message || "Something went wrong",
      });
    }
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
            <Location
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            <PaymentMethod />
          </View>
        </View>
        <RoundedFullButton
          onPress={status === "pending" ? () => null : handleCheckout}
          className={cn(
            "bg-primary mt-12",
            select ? "bg-[#95A199]" : "bg-primary"
          )}
        >
          {status === "pending" || clearStat === "pending" ? (
            <View className="py-4">
              <ActivityIndicator size={20} color={"white"} />
            </View>
          ) : (
            <Text className="text-base font-roboto-bold text-white py-4 text-center">
              Pay Now
            </Text>
          )}
        </RoundedFullButton>
      </ScrollView>
    </SafeAreaView>
  );
}
