import CartCard from "@/components/cart/CartCard";
import CartFooter from "@/components/cart/CartFooter";
import CartHeader from "@/components/cart/CartHeader";
import CartModal from "@/components/cart/CartModal";
import NoCart from "@/components/cart/NoCart";
import { useCartStorage } from "@/store/useCartStore";
import { CartDoc } from "@/types";
import React, { useState } from "react";
import { FlatList, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Cart() {
  const { cart, clearCart } = useCartStorage();

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
          return (
            cart?.length && (
              <Pressable
                onPress={() => setShowModal(!showModal)}
                className="self-end"
              >
                <Text className="text-error font-roboto tex-sm">Clear all</Text>
              </Pressable>
            )
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
            clearCart();
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
