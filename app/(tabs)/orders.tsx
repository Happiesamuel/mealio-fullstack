import EmptyOrder from "@/components/orders/EmptyOrder";
import OrderCard from "@/components/orders/OrderCard";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrderTabHeader from "@/components/orders/OrderTabHeader";
import { orders } from "@/constnts/constant";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const { order } = useLocalSearchParams<{ order: string }>();
  const [tabSlug, setTabSlug] = useState(order || "all");
  useEffect(() => {
    if (order) {
      setTabSlug(order);
    }
  }, [order]);
  const filOrders =
    tabSlug === "ongoing"
      ? orders.filter((x) => x.status === "Shipped")
      : tabSlug === "completed"
        ? orders.filter((x) => x.status === "Delivered")
        : tabSlug === "failed"
          ? orders.filter((x) => x.status === "Failed")
          : orders;
  return (
    <SafeAreaView edges={["top"]} className="bg-secondary h-full px-3">
      <OrdersHeader />
      <View className="pb-2">
        <OrderTabHeader tabSlug={tabSlug} setTabSlug={setTabSlug} />
      </View>
      <FlatList
        data={filOrders}
        renderItem={({ item }) => <OrderCard item={item} />}
        keyExtractor={(item) => item.orderId}
        contentContainerClassName="pb-8 mt-6 gap-2.5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => <EmptyOrder />}
      />
    </SafeAreaView>
  );
}
