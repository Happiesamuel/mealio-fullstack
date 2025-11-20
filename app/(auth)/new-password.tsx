import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function NewPassword() {
  return (
    <View className="mt-16">
      <View className="gap-2">
        <Text className=" text-black font-roboto-semibold text-3xl">
          New Password
        </Text>
        <Text className="font-roboto text-base text-grey">
          Create a new Password
        </Text>
      </View>

      <View className="gap-6 my-10">
        <CustomInput
          label="Create Password"
          placeholder="Enter your password"
          type="password"
        />
        <CustomInput
          label="Confirm Password"
          placeholder="Enter your password"
          type="password"
        />
      </View>

      <View className="flex flex-row items-center w-full justify-evenly -bottom-[75%] ">
        <View className="flex-1  items-start w-[100%]">
          <RoundedFullButton
            className="bg-transparent border border-primary w-[75%]"
            onPress={() => router.back()}
          >
            <Text className=" text-center py-4 font-roboto-bold text-base text-primary ">
              Back
            </Text>
          </RoundedFullButton>
        </View>

        <View className="flex-1  items-end w-[100%]">
          <RoundedFullButton
            className="bg-primary w-[75%] "
            onPress={() => router.push("/success")}
          >
            <Text className=" text-center py-4 font-roboto-bold text-base text-secondary  ">
              Continue
            </Text>
          </RoundedFullButton>
        </View>
      </View>
    </View>
  );
}
