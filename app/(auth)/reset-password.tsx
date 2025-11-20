import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function ResetPassword() {
  return (
    <View className="mt-16">
      <View className="gap-2">
        <Text className=" text-black font-roboto-semibold text-3xl">
          Reset Password
        </Text>
        <Text className="font-roboto text-base text-grey">
          Please enter the email address associated with your account.
        </Text>
      </View>

      <View className="gap-6 my-10">
        <CustomInput
          label="Email"
          placeholder="Your email"
          keyboardType="email-address"
          type="normal"
        />
      </View>

      <View className="flex flex-row items-center w-full justify-evenly -bottom-[100%] ">
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
            onPress={() => router.push("/otp")}
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
