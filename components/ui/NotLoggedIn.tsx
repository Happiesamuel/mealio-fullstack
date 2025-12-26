import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function NotLoggedIn({ from }: { from: string }) {
  return (
    <View className="items-center gap-4 w-[80%] self-center mt-24 justify-center">
      <View className="flex bg-primary rounded-full  items-center justify-center size-16">
        <FontAwesome5 name="user-shield" size={24} color="white" />
      </View>
      <View className="gap-0.5 flex items-center">
        <Text className="font-roboto-semibold text-black dark:text-secondary text-base text-center">
          Please sign in to access this content
        </Text>
        <Text className="font-roboto text-grey text-sm text-center">
          If you are not registered just sign in with your email
        </Text>
      </View>
      <Link
        href={`/login?from=${from}`}
        className="bg-primary rounded py-4 w-full"
      >
        <Text className="text-white font-roboto-medium text-center text-sm">
          Sign In
        </Text>
      </Link>
    </View>
  );
}
