import { images } from "@/constnts";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function OnBoardingTwo() {
  return (
    <>
      <Image
        source={images.icon}
        resizeMode="contain"
        className="w-[105px] mt-10"
      />
      <View className="flex w-full items-center justify-center">
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
        <View className="w-full items-center gap-5 mt-12">
          <View className="flex gap-1.5 items-center justify-center flex-row  w-full">
            <View className="w-8 h-1.5 rounded-full !bg-grey/30 " />
            <View className="w-8 h-1.5 rounded-full !bg-primary" />
          </View>
          <View className="flex w-full gap-6 ">
            <TouchableOpacity
              onPress={() => router.push("/login")}
              className="bg-primary rounded-full w-full"
            >
              <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
                Next
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/login")}
              className="bg-[#A1C249]/5 rounded-full w-full"
            >
              <Text className=" text-center py-4 font-roboto-bold text-base text-primary ">
                Skip
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
