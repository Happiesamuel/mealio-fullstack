import ProfileHeader from "@/components/profile/ProfileHeader";
import { Feather } from "@expo/vector-icons";
import cn from "clsx";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Preference() {
  const [active, setActive] = useState("email");
  const pref: { name: string; slug: string }[] = [
    { name: "Email", slug: "email" },
    { name: "Phone number", slug: "phone" },
  ];
  return (
    <SafeAreaView className="bg-secondary h-full px-3">
      <ProfileHeader>Preference</ProfileHeader>
      <View className="gap-6 mt-10">
        {pref.map((pre) => (
          <TouchableOpacity
            className="flex items-center justify-between flex-row"
            onPress={() => setActive(pre.slug)}
            key={pre.name}
          >
            <Text
              className={
                (cn("text-base  "),
                active === pre.slug
                  ? "text-black font-roboto"
                  : "text-grey font-roboto")
              }
            >
              {pre.name}
            </Text>
            {active === pre.slug && (
              <Feather name="check" size={18} color="black" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
