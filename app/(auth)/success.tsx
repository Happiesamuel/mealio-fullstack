import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { logout } from "@/lib/databse";
import { router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function success() {
  return (
    <View className="flex-1 h-full items-center justify-center relative">
      <View className="gap-2   flex items-center justify-center px-5">
        <Text className=" text-black dark:text-white font-roboto-semibold text-3xl">
          Password Changed
        </Text>
        <Text className=" text-black dark:text-secondary font-roboto-semibold text-3xl">
          Succesfully
        </Text>
        <Text className="font-roboto text-base text-center text-grey">
          Password Changed Successfully, you can now login with your new
          password
        </Text>
      </View>
      <View className=" -bottom-[35%] w-full">
        <RoundedFullButton
          className="bg-primary w-full"
          onPress={async () => {
            await logout();
            router.push("/login");
          }}
        >
          <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
            Login
          </Text>
        </RoundedFullButton>
      </View>
    </View>
  );
}
