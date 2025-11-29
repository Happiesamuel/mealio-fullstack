import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { LayoutChangeEvent, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Tab = {
  name: string;
  slug: string;
};

type Props = {
  tabSlug: string;
  setTabSlug: React.Dispatch<React.SetStateAction<string>>;
};

export default function RestaurantTabHeader({ tabSlug, setTabSlug }: Props) {
  const tabs: Tab[] = [
    { name: "Menu", slug: "menu" },
    { name: "Offers", slug: "offers" },
    { name: "Reviews", slug: "reviews" },
  ];

  const positions = useRef<Record<string, number>>({});
  const widths = useRef<Record<string, number>>({});
  const [ready, setReady] = useState(false);

  const underlineX = useSharedValue(0);
  const underlineW = useSharedValue(0);

  // Move underline whenever the selected tab changes
  useEffect(() => {
    if (!ready) return;

    const x = positions.current[tabSlug] || 0;
    const w = widths.current[tabSlug] || 0;

    underlineX.value = withTiming(x, { duration: 250 });
    underlineW.value = withTiming(w, { duration: 250 });
  }, [tabSlug, ready]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: underlineW.value,
    transform: [{ translateX: underlineX.value }],
  }));

  // Check if all tabs measured
  function checkReady() {
    if (Object.keys(widths.current).length === tabs.length) {
      setReady(true);
    }
  }

  // Type for layout handler
  function handleLayout(slug: string, e: LayoutChangeEvent) {
    const { x, width } = e.nativeEvent.layout;
    positions.current[slug] = x;
    widths.current[slug] = width;
    checkReady();
  }

  return (
    <View className="relative flex-row items-center justify-between w-full px-5 mb-3">
      {tabs.map((tab) => (
        <Pressable
          key={tab.slug}
          onPress={() => {
            setTabSlug(tab.slug);
            router.setParams({ detail: tab.slug });
          }}
          onLayout={(e) => handleLayout(tab.slug, e)}
          className="py-1"
        >
          <Text
            className={`text-base font-roboto-medium ${
              tab.slug === tabSlug ? "text-black" : "text-gray-400"
            }`}
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
  );
}
