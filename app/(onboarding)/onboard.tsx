import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { icons, images } from "@/constnts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default function OnBoard() {
  async function finishOnboarding() {
    await AsyncStorage.setItem("seen_onboard", "true");
    router.replace("/login");
  }
  return (
    <View className=" h-full">
      <ScrollView
        contentContainerClassName="pb-12 min-h-full"
        scrollEnabled
        showsVerticalScrollIndicator={false}
      >
        <View className="flex items-center justify-between flex-1 ">
          <View className="flex-row items-center gap-2 mt-4">
            <Image source={icons.meal} style={{ width: 25, height: 25 }} />

            <Text className="font-roboto-semibold text-2xl text-black ">
              mealio
            </Text>
          </View>
          <View className="flex-1 w-full items-center justify-center mt-16">
            <View className="w-full flex items-center justify-center">
              <Image
                source={images.onboardingOne}
                resizeMode="contain"
                className="w-[98%] "
              />
            </View>
            <View className="gap-4 flex items-center mt-12">
              <Text className="text-2xl text-black  font-roboto-semibold">
                Welcome to Mealio 🍽️
              </Text>
              <Text className="font-roboto text-xl text-grey text-center ">
                Discover your favorite meals and get them delivered fast and
                fresh.
              </Text>
            </View>
          </View>
          <View className="w-full items-center gap-5 mt-12">
            <View className="flex gap-1.5 items-center justify-center flex-row  w-full">
              <View className="w-8 h-1.5 rounded-full !bg-primary" />
              <View className="w-8 h-1.5 rounded-full !bg-grey/30" />
            </View>
            <View className="flex w-full gap-6 ">
              <RoundedFullButton
                onPress={() => router.push("/onbording-two")}
                className="bg-primary "
              >
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
        </View>
      </ScrollView>
    </View>
  );
}
