import OrderHeader from "@/components/orderDetail/OrderHeader";
import TrackOrder from "@/components/orderDetail/TrackOrder";
import Error from "@/components/ui/Error";
import Foot from "@/components/ui/Foot";
import { useGetOrderViaIId, useOrderAddress } from "@/hooks/useGetOrderViaIId";
import { useZustMeals } from "@/store/useMealStore";
import { EvilIcons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function OrderId() {
  const { orders, status, refetch, error } = useGetOrderViaIId();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { address, status: addStat } = useOrderAddress();
  const { restaurants } = useZustMeals();

  if (status === "pending" || addStat === "pending")
    return (
      <SafeAreaView
        edges={["top"]}
        className="h-full bg-secondary dark:bg-[#121212] pb-safe px-3"
      >
        <OrderHeader />
        <View className="flex flex-1 gap-2 items-center justify-center w-full  ">
          <ActivityIndicator size={"large"} color="#14B74D" />
          <Text className="text-grey text-sm font-roboto">Loading Details</Text>
        </View>
      </SafeAreaView>
    );

  if (error) {
    return (
      <SafeAreaView
        edges={["top"]}
        className="h-full bg-secondary dark:bg-[#121212]  pb-safe px-3"
      >
        <OrderHeader /> <Error error={error?.message} onPress={refetch} />
      </SafeAreaView>
    );
  }
  const res = restaurants.find((x) => x.id === orders?.at(0)?.restaurantId);
  const price =
    orders?.map((x) => x.quantity * x.price).reduce((a, b) => a + b) ?? 0;

  return (
    <SafeAreaView
      edges={["top"]}
      className="h-full bg-secondary dark:bg-[#121212] pb-safe px-3"
    >
      <OrderHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled
        contentContainerClassName="pb-8"
      >
        <ScrollView
          contentContainerClassName="gap-4 items-center mt-3 mb-4"
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled
        >
          {orders?.map((x) => (
            <View
              key={x.$id}
              className="border border-grey/50 dark:border-zinc-800 gap-3 flex items-center justify-center rounded-lg size-[140px] px-2 py-3"
            >
              <Image
                source={{ uri: x.image }}
                className="size-[80%] w-[100px] rounded"
              />
              <View className="flex flex-row items-center gap-1 px-2">
                <Text
                  className="font-roboto-semibold text-xs dark:text-secondary/80 text-black"
                  numberOfLines={1}
                >
                  {x.title}
                </Text>
                {x.quantity > 1 && (
                  <Text
                    className="font-roboto-semibold text-xs dark:text-secondary/80 text-black"
                    numberOfLines={1}
                  >
                    * {x.quantity}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
        <View className="flex items-center flex-row gap-2 mb-2">
          <Image
            className="rounded-full size-11"
            source={res?.image}
            resizeMode="cover"
          />
          <View className="gap-1">
            <View className="flex items-center flex-row gap-1.5">
              <Text className="font-roboto-semibold dark:text-white text-base text-black">
                {res?.name}
              </Text>
              <MaterialIcons name="verified" size={18} color="#14B74D" />
            </View>
            <View className="flex items-center flex-row gap-1">
              <EvilIcons name="location" size={18} color="#A1A1A1" />
              <Text className="font-roboto text-sm text-grey">
                {res?.location}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex flex-row items-center  justify-between">
          <Text className="text-base font-roboto-semibold dark:text-white text-black">
            #{orderId}
          </Text>
          <View
            className={cn(
              " rounded-lg border border-grey/50 py-1 px-2 flex flex-row gap-1.5 items-center",
              orders?.at(0)?.status === "Delivered"
                ? "bg-primary/20 border-primary"
                : orders?.at(0)?.status === "Shipped"
                  ? "bg-[#0B298A]/20 border-[#0B298A]"
                  : "bg-error/10 border-error"
            )}
          >
            <FontAwesome
              name="check-square"
              size={15}
              color={
                orders?.at(0)?.status === "Delivered"
                  ? "#14B74D"
                  : orders?.at(0)?.status === "Shipped"
                    ? "#0B298A"
                    : "#FF1414"
              }
            />
            <Text
              className={cn(
                " font-roboto text-sm ",
                orders?.at(0)?.status === "Delivered"
                  ? "text-primary"
                  : orders?.at(0)?.status === "Shipped"
                    ? "text-[#0B298A]"
                    : "text-error"
              )}
            >
              {orders?.at(0)?.status}
            </Text>
          </View>
        </View>
        <View className="gap-3 mt-4">
          <View className="">
            <View className="gap-2.5">
              <Foot
                title="Subtotal"
                price={price}
                priceClass="text-sm"
                titleClass="text-grey text-sm"
              />
              <Foot
                title="Delivery Fees"
                price={20}
                priceClass="text-sm"
                titleClass="text-grey text-sm"
              />
              <Foot
                title="Discount"
                price={15}
                priceClass="text-sm"
                titleClass="text-black text-sm"
              />
              <Foot
                title="Total"
                price={Math.floor(price - 15 + 20)}
                priceClass="text-[22px]"
                titleClass="text-black text-xl"
              />
            </View>
          </View>
        </View>
        <TrackOrder
          shippedAt={orders?.at(0)?.shippedAt}
          createdAt={orders?.at(0)?.createdAt}
          deliveredAt={orders?.at(0)?.deliveredAt}
          status={orders?.at(0)?.status}
        />
        {address && (
          <View>
            <Text className="text-base text-black dark:text-white font-roboto-semibold">
              Address
            </Text>
            <Text className="text-base text-black dark:text-secondary font-roboto pt-2">
              {address?.type} Address
            </Text>
            <Text className="text-base text-grey font-roboto">
              {address?.street}, {address?.city}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
