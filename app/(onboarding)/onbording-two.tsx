import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { icons, images } from "@/constnts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function OnBoardingTwo() {
  async function finishOnboarding() {
    await AsyncStorage.setItem("seen_onboard", "true");
    router.replace("/login");
  }
  return (
    <ScrollView
      contentContainerClassName="flex items-center justify-between pb-12 flex-1"
      scrollEnabled
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row items-center gap-2 mt-4">
        <Image source={icons.meal} style={{ width: 25, height: 25 }} />

        <Text className="font-roboto-semibold text-2xl text-black ">
          mealio
        </Text>
      </View>
      <View className="flex w-full items-center justify-center mt-8">
        <Image
          source={images.onboardingTwo}
          resizeMode="contain"
          className="w-[325px] "
        />
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
          <RoundedFullButton onPress={finishOnboarding} className="bg-primary ">
            <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
              Next
            </Text>
          </RoundedFullButton>

          <RoundedFullButton
            onPress={finishOnboarding}
            className="bg-[#A1C249]/5 "
          >
            <Text className=" text-center py-4 font-roboto-bold text-base text-primary ">
              Skip
            </Text>
          </RoundedFullButton>
        </View>
      </View>
    </ScrollView>
  );
}
