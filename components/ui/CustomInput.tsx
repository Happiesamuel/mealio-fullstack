import { icons } from "@/constnts";
import cn from "clsx";
import React, { useState } from "react";
import {
  Image,
  KeyboardTypeOptions,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
export default function CustomInput({
  placeholder,
  keyboardType,
  type,
  label,
  error,
  value,
  handleChange,
}: {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  type?: string;
  label: string;
  error?: string;
  value: string;
  handleChange(text: string): void;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(type === "password");

  return (
    <View className="gap-2">
      <Text className="font-roboto-medium text-black dark:text-white text-xs">
        {label}:
      </Text>
      <View
        className={cn(
          "bg-[#E8E8E8] dark:bg-white/10 rounded-2xl  border  font-roboto text-sm flex flex-row items-center justify-between",
          isFocused
            ? " border-primary"
            : error
              ? "border-error"
              : "border-[#E8E8E8] dark:border-zinc-700"
        )}
      >
        <TextInput
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={show ? true : false}
          className="py-4  w-[80%] px-4 dark:placeholder:text-grey text-black dark:text-secondary font-roboto"
        />
        {type === "password" && (
          <Pressable onPress={() => setShow(!show)} className="pr-4">
            <Image
              className="size-5 "
              resizeMode="contain"
              source={icons.eye}
              tintColor={"#363853"}
            />
          </Pressable>
        )}
      </View>
      {error && <Text className="font-roboto text-error text-xs">{error}</Text>}
    </View>
  );
}
