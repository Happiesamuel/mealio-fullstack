import { MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
export default function PromoCode() {
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [text, setText] = useState("");
  function handlePress() {
    if (!text) return;
    setShow(true);
    setErr("expired");
  }
  return (
    <View className="mb-8">
      <View className="bg-[#E8E8E8] dark:bg-white/10 mb-2 px-4 rounded-2xl flex flex-row items-center justify-between">
        <View className="gap-2 flex items-center flex-row flex-1 py-2">
          <MaterialCommunityIcons
            name="ticket-confirmation-outline"
            size={14}
            color="#A1A1A1"
          />
          <TextInput
            className="font-roboto text-sm dark:placeholder:text-grey dark:text-secondary text-black  w-[90%]"
            placeholder="Promo Code"
            onChangeText={(text) => setText(text)}
            value={text}
          />
        </View>
        <Pressable
          className="bg-primary rounded-xl py-2 px-4"
          onPress={() => handlePress()}
        >
          <Text className="text-base font-roboto-bold text-white text-center">
            Apply
          </Text>
        </Pressable>
      </View>
      {show && (
        <View
          className={cn(
            "border-l-8 rounded-sm flex items-center flex-row gap-2 py-3 pl-2",
            !err
              ? "bg-[#F1FBF2] border-l-primary"
              : "border-l-error bg-[#F6E6E5]"
          )}
        >
          <MaterialCommunityIcons
            name={!err ? "check-bold" : "close-thick"}
            size={18}
            color={!err ? "#14B74D" : "#FF1414"}
          />
          <Text
            className={cn(
              "font-roboto-semibold text-xs",
              !err ? "text-primary" : "text-error"
            )}
          >
            Promo Code {err}
          </Text>
        </View>
      )}
    </View>
  );
}
