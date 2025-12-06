import { cart } from "@/constnts/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 90 + insets.bottom,
          paddingBottom: insets.bottom,
          padding: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 25,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Home" iconName="home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Explore" iconName="compass" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Cart" iconName="cart" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon title="Orders" iconName="tag" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="Profile"
              iconName="account-circle"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
function TabBarIcon({
  title,
  iconName,
  focused,
}: {
  title: string;
  iconName: any;
  focused: boolean;
}) {
  return (
    <View className="gap-2 flex items-center justify-center relative  ">
      <MaterialCommunityIcons
        name={!focused ? `${iconName}-outline` : iconName}
        size={24}
        color={!focused ? `#A1A1A1` : "#14B74D"}
      />
      <Text
        numberOfLines={1}
        style={{ color: !focused ? `#A1A1A1` : "#14B74D" }}
        className={cn("text-xs font-roboto-bold")}
      >
        {title}
      </Text>
      {iconName === "cart" && (
        <View className="size-5  flex items-center justify-center bg-error rounded-full absolute -top-3.5 -right-2">
          <Text className="text-white text-[10px] font-roboto-semibold">
            {cart.length}
          </Text>
        </View>
      )}
    </View>
  );
}
