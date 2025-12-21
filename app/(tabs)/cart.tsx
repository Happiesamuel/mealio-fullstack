import CartCard from "@/components/cart/CartCard";
import CartFooter from "@/components/cart/CartFooter";
import CartHeader from "@/components/cart/CartHeader";
import CartModal from "@/components/cart/CartModal";
import NoCart from "@/components/cart/NoCart";
import { useClearCart } from "@/hooks/useCart";
import { useCartStorage } from "@/store/useCartStore";
import { useUserStorage } from "@/store/useUserStore";
import { CartDoc } from "@/types";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Cart() {
  const { cart, clearCart } = useCartStorage();
  const { clear, status } = useClearCart();
  const { guest } = useUserStorage();
  const [showModal, setShowModal] = useState(false);

  const cartItems: CartDoc[] =
    (cart as unknown as CartDoc[]) ?? ([] as unknown as CartDoc[]);
  return (
    <SafeAreaView edges={["top"]} className="bg-secondary px-3 h-full">
      <CartHeader />
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-8 mt-6 gap-2.5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return (
            <>
              <NoCart />
            </>
          );
        }}
        ListHeaderComponent={() => {
          if (!cart || cart.length === 0) return null;

          return status === "pending" ? (
            <ActivityIndicator size={15} color="#14b74d" />
          ) : (
            <Pressable
              onPress={() => setShowModal((prev) => !prev)}
              className="self-end"
            >
              <Text className="text-error font-roboto text-sm">Clear all</Text>
            </Pressable>
          );
        }}
        ListFooterComponent={() => <CartFooter />}
      />
      {showModal && (
        <CartModal
          visible={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
            return guest ? clear() : clearCart();
          }}
        >
          <Text className=" font-roboto-medium text-center text-2xl mt-4 mb-6 ">
            Are you sure you want to clear your cart?
          </Text>
        </CartModal>
      )}
    </SafeAreaView>
  );
}
