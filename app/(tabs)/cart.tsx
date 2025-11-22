import CartCard from "@/components/cart/CartCard";
import CartFooter from "@/components/cart/CartFooter";
import CartHeader from "@/components/cart/CartHeader";
import NoCart from "@/components/cart/NoCart";
import { cart } from "@/constnts/constant";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Cart() {
  return (
    <SafeAreaView className="bg-secondary px-5 h-full">
      <CartHeader />
      <FlatList
        data={cart}
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
        ListFooterComponent={() => <CartFooter />}
      />
    </SafeAreaView>
  );
}
