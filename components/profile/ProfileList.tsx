import { profile } from "@/constnts/constant";
import { logout } from "@/lib/databse";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileList() {
  return (
    <View className="gap-4">
      {profile.map((prof) => (
        <View key={prof.name} className="gap-2">
          <Text className="font-roboto text-base text-grey">
            {prof?.name ?? ""}
          </Text>
          <View className="py-4 bg-[#F3F3F3] rounded-2xl border border-grey px-4">
            {prof.subjects.map((sub) => (
              <TouchableOpacity
                key={sub.name}
                onPress={async () => {
                  if (sub.route === "logout") {
                    await logout();
                    router.push("/(tabs)");
                  } else if (sub.route !== "/") {
                    router.push(sub.route as any);
                  }
                }}
                className="flex items-center flex-row justify-between py-2.5"
              >
                <View className="flex items-center gap-2 flex-row">
                  {sub.icon}
                  <Text className="text-base font-roboto text-black">
                    {sub.name}
                  </Text>
                </View>
                <FontAwesome name="angle-right" size={20} color="black" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
