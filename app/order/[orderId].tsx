import OrderHeader from "@/components/orderDetail/OrderHeader";
import Foot from "@/components/ui/Foot";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function orderId() {
  return (
    <SafeAreaView className="h-full bg-secondary px-3">
      <OrderHeader />
      <View className="flex flex-row items-center justify-between">
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
    </SafeAreaView>
  );
}
