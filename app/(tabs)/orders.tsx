import EmptyOrder from "@/components/orders/EmptyOrder";
import OrderCard from "@/components/orders/OrderCard";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrderTabHeader from "@/components/orders/OrderTabHeader";
import useGetOrder from "@/hooks/useGetOrder";
import { useUserStorage } from "@/store/useUserStore";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const { orders, status } = useGetOrder();
  const { guest } = useUserStorage();
  const { order } = useLocalSearchParams<{ order: string }>();
  const [tabSlug, setTabSlug] = useState(order || "all");
  useEffect(() => {
    if (order) {
      setTabSlug(order);
    }
  }, [order]);

  const filOrders =
    tabSlug === "ongoing"
      ? orders?.filter((x) => x.status === "Shipped")
      : tabSlug === "completed"
        ? orders?.filter((x) => x.status === "Delivered")
        : tabSlug === "failed"
          ? orders?.filter((x) => x.status === "Failed")
          : orders;
  const newOrder = [...new Set(filOrders?.map((x) => x.orderId))].map((id) => {
    const ord = filOrders?.filter((y) => y.orderId === id);
    return {
      orderId: id,
      items: ord,
      status: ord?.at(0)?.status,
    };
  });

  const orderItems: any = newOrder;

  return (
    <SafeAreaView edges={["top"]} className="bg-secondary h-full px-3">
      <OrdersHeader />
      <View className="pb-2">
        <OrderTabHeader tabSlug={tabSlug} setTabSlug={setTabSlug} />
      </View>

      {!guest ? (
        <View>
          <Text>no user</Text>
        </View>
      ) : (
        <FlatList
          data={orderItems}
          renderItem={({ item }) => <OrderCard item={item} />}
          keyExtractor={(item) => item.orderId}
          contentContainerClassName="pb-8 mt-6 gap-2.5"
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return status === "pending" ? (
              <View>
                <Text>Pending</Text>
              </View>
            ) : (
              <EmptyOrder />
            );
          }}
        />
      )}
    </SafeAreaView>
  );
}
