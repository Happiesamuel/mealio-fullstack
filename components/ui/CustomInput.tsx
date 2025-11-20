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
}: {
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  type?: string;
  label: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(type === "password");
  return (
    <View className="gap-2">
      <Text className="font-roboto-medium text-black text-xs">{label}:</Text>
      <View
        className={cn(
          "bg-[#E8E8E8] rounded-2xl  border  font-roboto text-sm flex flex-row items-center justify-between",
          isFocused ? " border-primary" : "border-[#E8E8E8]"
        )}
      >
        <TextInput
          placeholderTextColor={"#8e9aaf"}
          placeholder={placeholder}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={show ? true : false}
          className="py-4  w-[80%] px-4"
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
    </View>
  );
}
