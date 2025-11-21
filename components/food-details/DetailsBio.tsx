import { images } from "@/constnts";
import { AntDesign } from "@expo/vector-icons";
import cn from "clsx";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
export default function DetailsBio() {
  const [quan, setQuan] = useState(1);
  function handleDecrease() {
    if (quan === 1) {
      setQuan(1);
    } else {
      setQuan((i) => (i -= 1));
    }
  }
  function handleIncrease() {
    setQuan((i) => (i += 1));
  }
  return (
    <View>
      <View className="gap-2.5 mt-4">
        <Image
          className="w-full rounded-2xl"
          source={images.homeRecipeOne}
          style={{ height: Dimensions.get("screen").height / 2.5 }}
          resizeMode="stretch"
        />
        <View className="flex items-center justify-between flex-row">
          <Text className="font-roboto-semibold text-[27px] text-black">
            Fish and Chips
          </Text>
          <View className="flex items-center flex-row gap-1">
            <AntDesign name="star" size={16} color="#FF8007" />
            <Text className="font-roboto text-base text-grey">5.0</Text>
          </View>
        </View>
        <View className="flex items-center justify-between flex-row">
          <View className="flex justify-between flex-row items-center">
            <View className="flex items-center flex-row gap-1">
              <AntDesign name="clock-circle" size={16} color="#A1A1A1" />
              <Text className="font-roboto text-base text-grey">
                20-30 mins
              </Text>
            </View>
          </View>
          <View className="flex items-center flex-row gap-4">
            <TouchableOpacity
              className={cn(
                "border  size-9 rounded-lg flex items-center justify-center",
                quan <= 1
                  ? "border-grey bg-transparent"
                  : "border-primary bg-primary/10"
              )}
              onPress={handleDecrease}
            >
              <AntDesign
                name="minus"
                size={14}
                color={quan <= 1 ? "#A1A1A1" : "#14B74D"}
              />
            </TouchableOpacity>
            <Text className="text-2xl font-roboto-semibold text-black">
              {quan}
            </Text>
            <TouchableOpacity
              className="border border-primary bg-primary/10 size-9 rounded-lg flex items-center justify-center"
              onPress={handleIncrease}
            >
              <AntDesign name="plus" size={14} color="#14B74D" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="gap-2.5 my-4">
        <View className="flex gap-2 flex-row">
          <AntDesign name="exclamation-circle" size={15} color="black" />
          <Text className="text-base font-roboto-semibold text-black">
            Description
          </Text>
        </View>
        <Text className="text-base font-roboto text-grey">
          Fresh white fish, hand-battered and fried till golden. Served with
          crunchy fries, tartar sauce, and a zesty lemon wedge. Perfect comfort
          food — made fresh, delivered hot.
        </Text>
      </View>
    </View>
  );
}
