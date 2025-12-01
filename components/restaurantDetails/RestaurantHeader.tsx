import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function RestaurantHeader() {
  const [open, setOpen] = useState(false);
  return (
    <View className="flex relative flex-row items-center justify-between my-1 pt-4">
      <RoundedFullButton
        className="bg-grey/5 flex items-center justify-center w-[32px] h-[32px] "
        onPress={() => router.back()}
      >
        <FontAwesome name="angle-left" size={18} color="black" />
      </RoundedFullButton>
      <Text className="font-roboto-bold text-xl text-black">Details</Text>
      <View className="flex items-center flex-row gap-3.5">
        <RoundedFullButton className="bg-grey/5 flex items-center justify-center w-[32px] h-[32px] ">
          <MaterialIcons name="support-agent" size={18} color="black" />
        </RoundedFullButton>
        <RoundedFullButton
          className="bg-grey/5 flex items-center justify-center w-[32px] h-[32px] "
          onPress={() => setOpen((v) => !v)}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={18}
            color="black"
          />
        </RoundedFullButton>
      </View>
      {open && (
        <View
          className="absolute right-0 top-12 z-50 mt-2 w-52 bg-[#D4D4D4] rounded-xl shadow-lg p-3"
          style={{ elevation: 8 }}
        >
          <Pressable className="flex-row items-center gap-2 py-2.5">
            <MaterialCommunityIcons name="share-variant" size={20} />
            <Text className="text-base font-roboto text-black">
              Share Restaurant
            </Text>
          </Pressable>

          <Pressable className="flex-row items-center gap-2 py-2.5">
            <MaterialCommunityIcons name="heart-outline" size={20} />
            <Text className="text-base font-roboto text-black">
              Add to Favorites
            </Text>
          </Pressable>

          <Pressable className="flex-row items-center gap-2 py-2.5">
            <MaterialCommunityIcons name="alert-circle-outline" size={20} />
            <Text className="text-base font-roboto text-black">
              Report Restaurant
            </Text>
          </Pressable>

          <Pressable className="flex-row items-center gap-2 py-2.5">
            <MaterialCommunityIcons name="headphones" size={20} />
            <Text className="text-base font-roboto text-black">
              Help and Support
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
