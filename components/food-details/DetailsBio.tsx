import useAllFavourite from "@/hooks/useAllFavourite";
import { MealDetail, Restaurant } from "@/types";
import { AntDesign, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import cn from "clsx";
import React, { useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import FavouriteIcon from "../ui/FavouriteIcon";
export default function DetailsBio({
  data,
  res,
  handleQuantity,
  quan,
}: {
  data: MealDetail;
  res: Restaurant | undefined;
  handleQuantity(type: string): void;
  quan: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const { handlePress, isInFavourite } = useAllFavourite(data, "meals");
  return (
    <View>
      <View className="gap-2.5 mt-4">
        <Image
          className="w-full rounded-2xl"
          source={{ uri: data?.image }}
          style={{ height: Dimensions.get("screen").height / 2.8 }}
          resizeMode="cover"
        />
        <View className="flex items-start flex-row justify-between ">
          <View className="flex items-center flex-row gap-2">
            <Image
              className="rounded-full size-11"
              source={res?.image}
              resizeMode="cover"
            />
            <View className="gap-1">
              <View className="flex items-center flex-row gap-1.5">
                <Text className="font-roboto-semibold text-base text-black">
                  {res?.name}
                </Text>
                <MaterialIcons name="verified" size={18} color="#14B74D" />
              </View>
              <View className="flex items-center flex-row gap-1">
                <EvilIcons name="location" size={18} color="#A1A1A1" />
                <Text className="font-roboto text-sm text-grey">
                  {res?.location}
                </Text>
              </View>
            </View>
          </View>
          <FavouriteIcon
            handlePress={() => handlePress("meals")}
            isInFavourite={isInFavourite}
          />
        </View>
        <View className="flex items-center gap-2 justify-between flex-row">
          <Text className="font-roboto-semibold text-[24px] max-w-[85%]  text-black">
            {data?.title}
          </Text>
          <View className="flex items-center flex-row gap-1">
            <AntDesign name="star" size={16} color="#FF8007" />
            <Text className="font-roboto text-base text-grey">
              {data.rating}
            </Text>
          </View>
        </View>
        <View className="flex items-center justify-between flex-row">
          <View className="flex justify-between flex-row items-center">
            <View className="flex items-center flex-row gap-1">
              <AntDesign name="clock-circle" size={16} color="#A1A1A1" />
              <Text className="font-roboto text-base text-grey">
                {data.time}
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
              onPress={() => handleQuantity("decrease")}
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
              onPress={() => handleQuantity("increase")}
            >
              <AntDesign name="plus" size={14} color="#14B74D" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="gap-2.5 mt-4">
        <View className="flex gap-2 items-center flex-row">
          <AntDesign name="exclamation-circle" size={15} color="black" />
          <Text className="text-base font-roboto-semibold text-black">
            Description
          </Text>
        </View>
        <View className=" " style={{ width: "100%" }}>
          <Text
            className="text-sm  font-roboto text-zinc-600"
            numberOfLines={expanded ? undefined : 3}
            onTextLayout={(e) => {
              if (e.nativeEvent.lines.length > 3 && !expanded) {
                setShowMore(true);
              }
            }}
          >
            {data.description}
          </Text>
          <TouchableOpacity
            onPress={() => setExpanded(!expanded)}
            className="mt-1"
          >
            <Text
              className={cn(
                "font-roboto text-sm ",
                expanded ? "!text-red-500" : "text-primary"
              )}
            >
              {expanded ? "Show less" : "Read more"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
