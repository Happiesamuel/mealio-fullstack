import ProfileHeader from "@/components/profile/ProfileHeader";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import useResendOtp from "@/hooks/useResendOtp";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import useEmailVerification from "@/hooks/useEmailVerification";
import { useUserStorage } from "@/store/useUserStore";
import { Guest } from "@/types";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
export default function OTP() {
  const { guest, user, setUser } = useUserStorage();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const { verify, status, error: verifyErr } = useEmailVerification();
  const { resend, error: resendErr } = useResendOtp();
  const inputs = useRef<(TextInput | null)[]>([]);
  const [timer, setTimer] = useState(60); // 60 seconds
  const [disabled, setDisabled] = useState(true);
  const { email } = useLocalSearchParams<{
    email: string;
  }>();
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
    resend(
      { userId: guest!.$id, email: email },
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
    setError(false);
    verify(
      {
        userId: guest!.$id,
        otp: code,
        email: email,
        password: guest!.password,
      },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "OTP verified",
            text2: "Email changed successfully",
          });
          setUser(user, {
            ...guest,
            email: email,
          } as unknown as Guest);
          router.push("/profile");
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          className="bg-secondary h-full px-3  "
        >
          <ProfileHeader>Change Email</ProfileHeader>

          <View className="flex mt-12  my-6 gap-4">
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
                    "w-12 h-12 border text-xl rounded-lg text-center font-roboto bg-[#E8E8E8]",
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

          <View className="flex-1  items-end w-[100%] ">
            <RoundedFullButton
              className={cn("bg-primary w-full ")}
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
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
