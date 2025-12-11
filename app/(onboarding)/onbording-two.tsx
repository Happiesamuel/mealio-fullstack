import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { icons, images } from "@/constnts";
import { setSeenOnboard } from "@/constnts/onboard";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function OnBoardingTwo() {
  const router = useRouter();

  const handleFinish = async () => {
    await setSeenOnboard();
    router.replace("/(tabs)");
  };
  return (
    <ScrollView
      contentContainerClassName="pb-12 flex-1"
      scrollEnabled
      showsVerticalScrollIndicator={false}
    >
      <View className="flex items-center justify-between flex-1">
        <View className="flex-row items-center gap-2 mt-4">
          <Image source={icons.meal} style={{ width: 25, height: 25 }} />

          <Text className="font-roboto-semibold text-2xl text-black ">
            mealio
          </Text>
        </View>
        <View className="flex w-full items-center justify-center mt-8">
          <View className="w-full flex items-center justify-center">
            <Image
              source={images.onboardingTwo}
              resizeMode="contain"
              className="w-[98%] "
            />
          </View>
          <View className="gap-4 flex items-center mt-12">
            <Text className="text-2xl text-black  font-roboto-semibold">
              Order Easily, Eat Happily
            </Text>
            <Text className="font-roboto text-xl text-grey text-center ">
              Track your orders in real-time and enjoy quick, secure checkout.
            </Text>
          </View>
        </View>
        <View className="w-full items-center gap-5 mt-12">
          <View className="flex gap-1.5 items-center justify-center flex-row  w-full">
            <View className="w-8 h-1.5 rounded-full !bg-grey/30 " />
            <View className="w-8 h-1.5 rounded-full !bg-primary" />
          </View>
          <View className="flex w-full gap-6 ">
            <RoundedFullButton onPress={handleFinish} className="bg-primary ">
              <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
                Next
              </Text>
            </RoundedFullButton>

            <RoundedFullButton
              onPress={handleFinish}
              className="bg-[#A1C249]/5 "
            >
              <Text className=" text-center py-4 font-roboto-bold text-base text-primary ">
                Skip
              </Text>
            </RoundedFullButton>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
