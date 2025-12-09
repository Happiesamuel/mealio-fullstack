import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";

export default function FavouriteIcon({
  handlePress,
  isInFavourite,
}: {
  handlePress: () => void;
  isInFavourite: boolean;
}) {
  return (
    <Pressable
      onPress={handlePress}
      className=" flex items-center justify-center  z-10 flex-row absolute  rounded-full"
      style={{
        backgroundColor: "#2E2E2E26",
        width: 32,
        height: 32,
        right: 8,
        top: 8,
      }}
    >
      <Ionicons
        name={isInFavourite ? "heart" : "heart-outline"}
        size={20}
        color={isInFavourite ? "#ff1414" : "white"}
      />
    </Pressable>
  );
}
