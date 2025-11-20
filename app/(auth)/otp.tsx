import RoundedFullButton from "@/components/ui/RoundedFullButton";
import cn from "clsx";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }

    setError(false);
  };

  const verify = () => {
    const code = otp.join("");

    if (code !== "154806") {
      setError(true);
    }
  };
  const setInputRef = (index: number): React.RefCallback<TextInput> => {
    return (ref) => {
      inputs.current[index] = ref;
    };
  };
  return (
    <View className="mt-16">
      <View className="gap-2">
        <Text className=" text-black font-roboto-semibold text-3xl">
          We sent you a code
        </Text>
        <Text className="font-roboto text-base text-grey">
          Enter the verification sent to your mail
        </Text>
      </View>

      <View className="flex  my-6 gap-4">
        <View className="flex-row justify-between ">
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={setInputRef(i)}
              maxLength={1}
              keyboardType="number-pad"
              value={digit}
              onFocus={() => setFocusedIndex(i)}
              onBlur={() => setFocusedIndex(null)}
              onChangeText={(text) => handleChange(text, i)}
              className={cn(
                "w-12 h-12 border text-3xl rounded-lg text-center bg-[#E8E8E8]",
                error
                  ? "border-red-500"
                  : focusedIndex === i
                    ? "border-primary"
                    : "border-transparent"
              )}
            />
          ))}
        </View>
        <TouchableOpacity className=" self-end ">
          <Text className="font-roboto-bold text-base text-primary">
            Resend Code
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center w-full justify-evenly -bottom-[100%] ">
        <View className="flex-1  items-start w-[100%]">
          <RoundedFullButton
            className="bg-transparent border border-primary w-[75%]"
            onPress={() => router.back()}
          >
            <Text className=" text-center py-4 font-roboto-bold text-base text-primary ">
              Back
            </Text>
          </RoundedFullButton>
        </View>

        <View className="flex-1  items-end w-[100%] ">
          <RoundedFullButton
            className="bg-primary w-[75%] "
            onPress={() => router.push("/new-password")}
          >
            <Text className=" text-center py-4 font-roboto-bold text-base text-secondary  ">
              Continue
            </Text>
          </RoundedFullButton>
        </View>
      </View>
    </View>
  );
}
