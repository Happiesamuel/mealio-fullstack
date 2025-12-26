import { useTheme } from "@/context/ThemeProvider";
import { logout } from "@/lib/databse";
import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfileList() {
  const { isDark } = useTheme();
  const profile = [
    {
      name: "General",
      subjects: [
        {
          name: "Edit Profile",
          icon: (
            <FontAwesome5
              name="user"
              size={16}
              color={isDark ? "#f7f7f7" : "#191919"}
            />
          ),
          route: "/profile/edit",
        },
        {
          name: "Addresses",
          icon: (
            <FontAwesome6
              name="contact-book"
              size={16}
              color={isDark ? "#f7f7f7" : "#191919"}
            />
          ),
          route: "/profile/address",
        },
        {
          name: "Payment Method",
          icon: (
            <Ionicons
              name="wallet-outline"
              size={16}
              color={isDark ? "#f7f7f7" : "#191919"}
            />
          ),
          route: "/profile/payment",
        },
        {
          name: "Notifications",
          icon: (
            <Fontisto
              name="bell"
              size={16}
              color={isDark ? "#f7f7f7" : "#191919"}
            />
          ),
          route: "/profile/notification",
        },
        {
          name: "Preferences",
          icon: (
            <MaterialIcons
              name="room-preferences"
              size={16}
              color={isDark ? "#f7f7f7" : "#191919"}
            />
          ),
          route: "/profile/preference",
        },
        {
          name: "Security",
          icon: (
            <MaterialCommunityIcons
              name="security"
              size={16}
              color={isDark ? "#f7f7f7" : "#191919"}
            />
          ),
          route: "/profile/security",
        },
        {
          name: "Theme",
          icon: (
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={16}
              color={isDark ? "#f7f7f7" : "#191919"}
            />
          ),
          route: "/profile/theme",
        },
      ],
    },
    {
      name: "Help & Support",
      subjects: [
        {
          name: "Contact Support",
          icon: (
            <MaterialIcons
              name="support-agent"
              size={16}
              color={isDark ? "#f7f7f7" : "#191919"}
            />
          ),
          route: "/",
        },
        {
          name: "FAQ",
          icon: (
            <MaterialCommunityIcons
              name="message-question-outline"
              size={16}
              color={isDark ? "#f7f7f7" : "#191919"}
            />
          ),
          route: "/",
        },
      ],
    },
  ];

  return (
    <View className="gap-4">
      {profile.map((prof) => (
        <View key={prof.name} className="gap-2">
          <Text className="font-roboto text-base text-grey">
            {prof?.name ?? ""}
          </Text>
          <View className="py-4 bg-[#F3F3F3] dark:bg-white/10 dark:border-zinc-800 rounded-2xl border border-grey px-4">
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
                  <Text className="text-base dark:text-secondary font-roboto text-black">
                    {sub.name}
                  </Text>
                </View>
                <FontAwesome
                  name="angle-right"
                  size={20}
                  color={isDark ? "#f7f7f7" : "#191919"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}
