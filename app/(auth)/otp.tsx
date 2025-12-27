import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { useLogin } from "@/hooks/useAuth";
import useOtpVerification from "@/hooks/useOtpVerification";
import useResendOtp from "@/hooks/useResendOtp";
import { getGuestById } from "@/lib/databse";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
export default function OTP() {
  const { from, userId } = useLocalSearchParams<{
    from: "reset-password" | "sign-up";
    userId: string;
  }>();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const { verify, status, error: verifyErr } = useOtpVerification();
  const { resend, error: resendErr } = useResendOtp();
  const inputs = useRef<(TextInput | null)[]>([]);
  const { mutate } = useLogin();
  const [timer, setTimer] = useState(60); // 60 seconds
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (disabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setDisabled(false);
            return 60; // reset timer for next use
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [disabled]);

  const handlePress = async () => {
    const guest = await getGuestById(userId);
    resend(
      { userId: guest.$id, email: guest.email },
      {
        onSuccess: (data) => {
          Toast.show({
            type: "success",
            text1: "OTP verified",
            text2: "OTP has been sent to your email",
          });
          setDisabled(true);
          setTimer(60);
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Failed",
            text2: resendErr?.message,
          });
        },
      }
    );
  };

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

  const verifyFun = async () => {
    const code = otp.join("");
    const guest = await getGuestById(userId);
    setError(false);
    verify(
      { userId, otp: code },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "OTP verified",
            text2:
              from === "sign-up" ? "Welcome to Mealio" : "Reset your password",
          });
          from === "sign-up" &&
            mutate({ email: guest.email, password: guest.password });
          router.push(
            from === "sign-up" ? "/(tabs)" : `/new-password?userId=${userId}`
          );
        },
        onError: () => {
          setError(true);
          Toast.show({
            type: "error",
            text1: "Failed",
            text2: verifyErr?.message,
          });
        },
      }
    );
  };
  const setInputRef = (index: number): React.RefCallback<TextInput> => {
    return (ref) => {
      inputs.current[index] = ref;
    };
  };
  return (
    <View className="mt-16">
      <View className="gap-2">
        <Text className=" text-black dark:text-white font-roboto-semibold text-3xl">
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
                "w-12 h-12 border text-xl rounded-lg text-center font-roboto bg-[#E8E8E8] dark:bg-white/10 text-black dark:text-secondary ",
                error
                  ? "border-red-500"
                  : focusedIndex === i
                    ? "border-primary"
                    : "border-transparent"
              )}
            />
          ))}
        </View>
        <TouchableOpacity
          className="self-end"
          onPress={handlePress}
          disabled={disabled}
        >
          <Text
            className={`font-roboto-bold text-base ${
              disabled ? "text-gray-400" : "text-primary"
            }`}
          >
            {disabled ? `Resend Code (${timer}s)` : "Resend Code"}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center w-full justify-evenly -bottom-[100%] ">
        {from !== "sign-up" && (
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
        )}

        <View className="flex-1  items-end w-[100%] ">
          <RoundedFullButton
            className={cn(
              "bg-primary  ",
              from === "sign-up" ? "w-full" : "w-[75%]"
            )}
            onPress={() => (status === "pending" ? null : verifyFun())}
          >
            {status === "pending" ? (
              <View className="py-4">
                <ActivityIndicator size={20} color={"white"} />
              </View>
            ) : (
              <Text className=" text-center py-4 font-roboto-bold text-base text-secondary  ">
                Continue
              </Text>
            )}
          </RoundedFullButton>
        </View>
      </View>
    </View>
  );
}
