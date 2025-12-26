import EmptyOrder from "@/components/orders/EmptyOrder";
import OrderCard from "@/components/orders/OrderCard";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrderTabHeader from "@/components/orders/OrderTabHeader";
import NotLoggedIn from "@/components/ui/NotLoggedIn";
import useGetOrder from "@/hooks/useGetOrder";
import { useOrderRealtime } from "@/hooks/useRealTimeOrder";
import { useUserStorage } from "@/store/useUserStore";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const { orders, status } = useGetOrder();
  const { guest } = useUserStorage();
  const { order } = useLocalSearchParams<{ order: string }>();
  const [tabSlug, setTabSlug] = useState(order || "all");
  useOrderRealtime();
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
        : tabSlug === "pending"
          ? orders?.filter((x) => x.status === "Pending")
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
    <SafeAreaView
      edges={["top"]}
      className="bg-secondary dark:bg-[#121212] h-full px-3"
    >
      <OrdersHeader />
      <View className="pb-2">
        <OrderTabHeader tabSlug={tabSlug} setTabSlug={setTabSlug} />
      </View>

      {!guest ? (
        <View>
          <NotLoggedIn from={"orders"} />
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
              <View className="flex flex-1 h-[450px]  gap-2 items-center justify-center w-full  ">
                <ActivityIndicator size={"large"} color="#14B74D" />
                <Text className="text-grey text-sm font-roboto">
                  Loading Details
                </Text>
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
