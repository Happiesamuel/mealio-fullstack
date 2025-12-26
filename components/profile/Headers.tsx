import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NotLoggedIn from "../ui/NotLoggedIn";
import ProfileHeader from "./ProfileHeader";

export default function Headers({
  text,
  subText,
  from,
}: {
  text: string;
  subText?: string;
  from: string;
}) {
  return (
    <SafeAreaView className="bg-secondary dark:bg-[#121212] h-full px-3  ">
      <ProfileHeader>{text}</ProfileHeader>
      {subText && (
        <Text className="mt-5 font-roboto-medium text-grey text-base">
          {subText}
        </Text>
      )}
      <NotLoggedIn from={from} />
    </SafeAreaView>
  );
}
