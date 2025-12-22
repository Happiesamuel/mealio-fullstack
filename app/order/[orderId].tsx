import OrderHeader from "@/components/orderDetail/OrderHeader";
import TrackOrder from "@/components/orderDetail/TrackOrder";
import Error from "@/components/ui/Error";
import Foot from "@/components/ui/Foot";
import { useGetOrderViaIId, useOrderAddress } from "@/hooks/useGetOrderViaIId";
import { useZustMeals } from "@/store/useMealStore";
import { EvilIcons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
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
        className="h-full bg-secondary pb-safe px-3"
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
        className="h-full bg-secondary pb-safe px-3"
      >
        <OrderHeader /> <Error error={error?.message} onPress={refetch} />
      </SafeAreaView>
    );
  }
  const res = restaurants.find((x) => x.id === orders?.at(0)?.restaurantId);
  const price = orders?.map((x) => x.price).reduce((a, b) => a + b) ?? 0;
  return (
    <SafeAreaView edges={["top"]} className="h-full bg-secondary pb-safe px-3">
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
              className="border border-grey/50 gap-3 flex items-center justify-center rounded-lg size-[140px] px-2 py-3"
            >
              <Image
                source={{ uri: x.image }}
                className="size-[80%] w-[100px] rounded"
              />
              <Text
                className="font-roboto-semibold text-xs text-black"
                numberOfLines={1}
              >
                {x.title}
              </Text>
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
              <Text className="font-roboto-semibold text-base text-black">
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
          <Text className="text-base font-roboto-semibold text-black">
            #{orderId}
          </Text>
          <View
            className={
              " rounded-lg border border-grey/50 bg-primary/20 py-1 px-2 flex flex-row gap-1.5 items-center"
            }
          >
            <FontAwesome name="check-square" size={15} color={"#14B74D"} />
            <Text className={" font-roboto text-sm text-primary  "}>
              Delivered
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
        <TrackOrder />
        {address && (
          <View>
            <Text className="text-base text-black font-roboto-semibold">
              Address
            </Text>
            <Text className="text-base text-black font-roboto pt-2">
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
