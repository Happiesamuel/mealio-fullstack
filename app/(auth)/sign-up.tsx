import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { icons } from "@/constnts";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

export default function SignUp() {
  return (
    <View className="mt-16">
      <View className="gap-2">
        <Text className=" text-black font-roboto-semibold text-3xl">
          Sign up
        </Text>
        <Text className="font-roboto text-base text-grey">
          Enter your details below
        </Text>
      </View>

      <View className="gap-6 my-10">
        <CustomInput
          label="Email"
          placeholder="Your email"
          keyboardType="email-address"
          type="normal"
        />
        <CustomInput
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <CustomInput
          label="Confirm Password"
          placeholder="Enter your password"
          type="password"
        />
      </View>

      <RoundedFullButton className="bg-primary" onPress={() => {}}>
        <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
          Create Account
        </Text>
      </RoundedFullButton>

      <View className="w-full flex-row items-center justify-center my-6">
        <View className="h-[0.5px] bg-grey flex-1" />
        <Text className="px-4 text-grey font-roboto text-xs">
          or continue with
        </Text>
        <View className="h-[0.5px] bg-grey flex-1" />
      </View>

      <View className="flex w-full gap-6 items-center">
        <RoundedFullButton onPress={() => {}} className="bg-[#F2F4ED]">
          <View className="flex items-center py-4 justify-center gap-2 flex-row">
            <Image
              source={icons.google}
              resizeMode="contain"
              className="size-4"
            />
            <Text className="text-primary font-roboto-bold text-base">
              Continue with Google
            </Text>
          </View>
        </RoundedFullButton>
        <RoundedFullButton onPress={() => {}} className="bg-[#F2F4ED]">
          <View className="flex items-center py-4 justify-center gap-2 flex-row">
            <Image
              source={icons.apple}
              resizeMode="contain"
              className="size-4"
            />
            <Text className="text-primary font-roboto-bold text-base">
              Continue with Apple
            </Text>
          </View>
        </RoundedFullButton>
        <Text className="text-base font-roboto-bold text-black">
          Already have an account?{" "}
          <Link className="text-primary" href="/login">
            Login
          </Link>
        </Text>
      </View>
    </View>
  );
}
