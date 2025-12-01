import OrderCard from "@/components/orders/OrderCard";
import OrdersHeader from "@/components/orders/OrdersHeader";
import { orders } from "@/constnts/constant";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  return (
    <SafeAreaView className="bg-secondary h-full px-3">
      <OrdersHeader />
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderCard item={item} />}
        keyExtractor={(item) => item.orderId}
        contentContainerClassName="pb-8 mt-6 gap-2.5"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}
