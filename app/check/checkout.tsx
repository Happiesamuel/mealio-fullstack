import CheckoutHeader from "@/components/checkout/CheckoutHeader";
import Location from "@/components/checkout/Location";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import useCreateOrder from "@/hooks/useCreateOrder";
import { useCartStorage } from "@/store/useCartStore";
import { useUserStorage } from "@/store/useUserStore";
import cn from "clsx";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export function generateOrderId() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `ORD-${timestamp}-${random}`;
}
export default function Checkout() {
  const { total } = useCartStorage();
  const { guest } = useUserStorage();
  const { cart } = useCartStorage();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { create, status } = useCreateOrder();
  const select = true;
  function handleCheckout() {
    if (!selectedAddress) return;
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
    const newCart = cats.map((cat) => {
      return {
        title: cat.title,
        image: cat.image,
        price: cat.price,
        quantity: cat.quantity,
        restaurantId: cat.restaurantId,
        orderAddress: selectedAddress,
        guests: guest?.$id,
        orderId: cat.orderId,
        status: "Delivered",
      };
    });

    for (const item of newCart) {
      create(item);
    }
    // router.push("/successOrder/1");
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
          onPress={handleCheckout}
          className={cn(
            "bg-primary mt-12",
            select ? "bg-[#95A199]" : "bg-primary"
          )}
        >
          {" "}
          {status === "pending" ? (
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

// restartid, status, address, guest
//what i ordered e.g name,image,price,quantity
