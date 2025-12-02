import OrderHeader from "@/components/orderDetail/OrderHeader";
import TrackOrder from "@/components/orderDetail/TrackOrder";
import Foot from "@/components/ui/Foot";
import { images } from "@/constnts";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function orderId() {
  const list = [
    {
      name: "Fish and Chips + 3Items",
      date: "31-Dec-2025, 02:00 PM",
      image: images.homeRecipeOne,
      id: "1",
    },
    {
      name: "Fish and Chips + 3Items",
      date: "31-Dec-2025, 02:00 PM",
      image: images.recipieSlideTwo,
      id: "3",
    },
    {
      name: "Fish and Chips + 3Items",
      date: "31-Dec-2025, 02:00 PM",
      image: images.recipieSlideThree,
      id: "4",
    },
  ];
  return (
    <SafeAreaView edges={["top"]} className="h-full bg-secondary px-3">
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
          {list.map((x) => (
            <View
              key={x.id}
              className="border border-grey/50 gap-3 flex items-center justify-center rounded-lg size-[140px] px-2 py-3"
            >
              <Image
                source={x.image}
                className="size-[80%] w-[100px] rounded"
              />
              <Text
                className="font-roboto-semibold text-xs text-black"
                numberOfLines={1}
              >
                {x.name}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View className="flex flex-row items-center  justify-between">
          <Text className="text-base font-roboto-semibold text-black">
            Order #123332133
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
                price={157}
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
                price={0}
                priceClass="text-sm"
                titleClass="text-black text-sm"
              />
              <Foot
                title="Total"
                price={162}
                priceClass="text-[22px]"
                titleClass="text-black text-xl"
              />
            </View>
          </View>
        </View>
        <TrackOrder />
        <View>
          <Text className="text-base text-black font-roboto-semibold">
            Address
          </Text>
          <Text className="text-base text-black font-roboto pt-2">
            Home Address
          </Text>
          <Text className="text-base text-grey font-roboto">
            No 31, prince Salisu elegushi, Arepo, Ogun state.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
