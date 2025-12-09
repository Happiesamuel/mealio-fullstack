import { useFavouriteStorage } from "@/store/useFavouriteStore";
import { router } from "expo-router";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CartModal from "../cart/CartModal";

export default function FavouriteTabHeader({
  tabSlug,
  setTabSlug,
}: {
  tabSlug: string;
  setTabSlug: Dispatch<SetStateAction<string>>;
}) {
  const [showModal, setShowModal] = useState(false);

  const { clearFavourite } = useFavouriteStorage();
  const tabs = [
    { name: "Meals", slug: "meals" },
    { name: "Restaurant", slug: "restaurant" },
  ];

  // Store the measured widths of each tab
  const tabWidths = useRef<{ [key: string]: number }>({});

  // Shared values for underline
  const translateX = useSharedValue(0);
  const underlineWidth = useSharedValue(0);

  function handlePress(slug: string) {
    setTabSlug(slug);
    router.setParams({ tab: slug });

    const width = tabWidths.current[slug] || 0;
    const offset = Object.keys(tabWidths.current)
      .filter((key) => key !== slug)
      .reduce((acc, key) => {
        if (
          tabs.findIndex((t) => t.slug === key) <
          tabs.findIndex((t) => t.slug === slug)
        ) {
          return acc + tabWidths.current[key] + 17; // 32 = margin/padding between tabs
        }
        return acc;
      }, 0);

    translateX.value = withTiming(offset, { duration: 250 });
    underlineWidth.value = withTiming(width, { duration: 250 });
  }

  const animatedStyle = useAnimatedStyle(() => ({
    width: underlineWidth.value,
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className="flex flex-row items-center justify-between">
      <View className="relative flex-row justify-start gap-5">
        {tabs.map((tab) => (
          <Pressable
            key={tab.slug}
            onPress={() => handlePress(tab.slug)}
            className="py-2"
          >
            <Text
              className={`text-base font-roboto-medium ${
                tab.slug === tabSlug ? "text-black" : "text-gray-400"
              }`}
              onLayout={(e) => {
                tabWidths.current[tab.slug] = e.nativeEvent.layout.width;
                if (tab.slug === tabSlug) {
                  underlineWidth.value = e.nativeEvent.layout.width;
                }
              }}
            >
              {tab.name}
            </Text>
          </Pressable>
        ))}

        <Animated.View
          style={[
            {
              position: "absolute",
              bottom: 0,
              height: 2,
              backgroundColor: "#14B74D",
            },
            animatedStyle,
          ]}
        />
      </View>
      <Pressable onPress={() => setShowModal(!showModal)}>
        <Text className="font-roboto-medium text-base text-primary">
          Clear all
        </Text>
      </Pressable>
      {showModal && (
        <CartModal
          visible={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
            return tabSlug === "meals"
              ? clearFavourite("meals")
              : clearFavourite("restaurants");
          }}
        >
          <Text className=" font-roboto-medium text-center text-2xl mt-4 mb-6 ">
            Are you sure you want to clear all your favourite{" "}
            {tabSlug === "meals" ? "meal" : "restaurant"}
          </Text>
        </CartModal>
      )}
    </View>
  );
}
