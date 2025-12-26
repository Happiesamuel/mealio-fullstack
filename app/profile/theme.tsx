import Switch from "@/components/profile/notification";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { useTheme } from "@/context/ThemeProvider";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Theme() {
  const { setLight, setDark, resetToSystem, theme } = useTheme();

  const lightSwitch = useSharedValue(0);
  const darkSwitch = useSharedValue(0);
  const systemSwitch = useSharedValue(0);

  useEffect(() => {
    if (theme === "system") {
      lightSwitch.value = 0;
      darkSwitch.value = 0;
      systemSwitch.value = 1;
    } else if (theme === "light") {
      lightSwitch.value = 1;
      darkSwitch.value = 0;
      systemSwitch.value = 0;
    } else if (theme === "dark") {
      lightSwitch.value = 0;
      darkSwitch.value = 1;
      systemSwitch.value = 0;
    }
  }, [theme]);

  const handleThemeChange = (val: string) => {
    if (val === "system") {
      resetToSystem();
    } else if (val === "light") {
      setLight();
    } else if (val === "dark") {
      setDark();
    }
  };

  const themeOptions = [
    {
      name: "Light mode",
      val: "light",
      sharedValue: lightSwitch,
    },
    {
      name: "Dark mode",
      val: "dark",
      sharedValue: darkSwitch,
    },
    {
      name: "System Default",
      val: "system",
      sharedValue: systemSwitch,
    },
  ];

  return (
    <SafeAreaView className="bg-secondary dark:bg-[#121212] h-full px-3">
      <ProfileHeader>Theme</ProfileHeader>

      <View className="gap-6 mt-10">
        {themeOptions.map((option) => (
          <View
            key={option.val}
            className="flex flex-row items-center justify-between"
          >
            <Text className="font-roboto text-base text-black dark:text-secondary">
              {option.name}
            </Text>
            <Switch
              value={option.sharedValue}
              onPress={() => handleThemeChange(option.val)}
              style={styles.switch}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  switch: {
    width: 50,
    height: 24,
  },
});
