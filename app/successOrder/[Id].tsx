import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { icons } from "@/constnts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function successOrder() {
  return (
    <SafeAreaView
      edges={["top"]}
      className="px-5 h-full bg-secondary flex justify-center pb-safe gap-6"
    >
      <Image
        source={icons.successOrder}
        resizeMode="cover"
        className="size-[150px] self-center"
      />
      <View className="gap-3 items-center">
        <Text className="text-black font-roboto-semibold text-2xl">
          Thank you for your order
        </Text>
        <Text className="text-base font-roboto text-grey text-center">
          You can track your order
          <Text className="font-roboto-medium text-black">
            {" "}
            #230303-220
          </Text>{" "}
          and see information about your order by checking order page
        </Text>
      </View>
      <View className="gap-[30px]">
        <RenderIconView
          title="Order Confirmed"
          content="We have confirmed your order"
          name={"check-circle-outline"}
        />
        <RenderIconView
          title="Order Processed"
          content="We have received and process your oder, its ready to ger delivered"
          name={"clipboard-text-clock-outline"}
        />
        <RenderIconView
          title="Ready for delivery"
          content="Rider is on it way"
          name={"bike-fast"}
        />
      </View>
      <View className="flex w-full gap-5 ">
        <RoundedFullButton
          onPress={() => router.push("/orders")}
          className="bg-primary "
        >
          <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
            Track my order
          </Text>
        </RoundedFullButton>

        <RoundedFullButton
          onPress={() => router.push("/(tabs)")}
          className="border border-primary bg-transparent "
        >
          <Text className=" text-center py-4 font-roboto-bold text-base text-primary ">
            Back to home
          </Text>
        </RoundedFullButton>
      </View>
    </SafeAreaView>
  );
}
function RenderIconView({
  title,
  name,
  content,
}: {
  title: string;
  content: string;
  name: any;
}) {
  return (
    <View className="flex flex-row items-center gap-4 max-w-[60%]">
      <View className="size-[70px] rounded-lg border border-dashed border-primary bg-primary/10 flex items-center justify-center">
        <MaterialCommunityIcons size={24} color={"#14B74D"} name={name} />
      </View>
      <View className="gap-3">
        <Text className="font-roboto-medium text-base text-black">{title}</Text>
        <Text className="font-roboto text-xs text-grey ">{content}</Text>
      </View>
    </View>
  );
}
