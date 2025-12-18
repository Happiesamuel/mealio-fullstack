import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { createOtp, getGuestByEmail, plunk } from "@/lib/databse";
import { emailInput, emailSchema } from "@/lib/schemas";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { ZodError } from "zod";

export default function ResetPassword() {
  const [form, setForm] = useState({
    email: "",
  });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof emailInput, string>>
  >({});
  useEffect(
    function () {
      if (err)
        Toast.show({
          type: "error",
          text1: "Failed ",
          text2: err?.toString(),
        });
    },
    [err]
  );
  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    try {
      emailSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Record<
          keyof emailInput,
          string[] | undefined
        >;
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field]?.[0] }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setErr(null);
      setLoading(true);
      const validatedData: emailInput = emailSchema.parse(form);
      const user = await getGuestByEmail(validatedData.email);
      if (user) {
        const otp = await plunk(user?.email);
        await createOtp(otp.otp, user!.$id);
        Toast.show({
          type: "success",
          text1: "Email OTP",
          text2: "We've sent you an OTP...Check your email",
        });
        setTimeout(() => {
          router.push(`/otp?from=reset-password&userId=${user!.$id}`);
        }, 1500);
        setErrors({});
      } else {
        Toast.show({
          type: "error",
          text1: "Failed",
          text2: "User not found",
        });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Partial<
          Record<keyof emailInput, string[]>
        >;

        const formattedErrors: Partial<Record<keyof emailInput, string>> = {};
        (Object.keys(fieldErrors) as (keyof emailInput)[]).forEach((key) => {
          if (fieldErrors[key] && fieldErrors[key]?.length > 0) {
            formattedErrors[key] = fieldErrors[key]![0];
          }
        });
        setLoading(false);
        setErrors(formattedErrors);
      } else {
        const e = err as Error;
        setLoading(false);
        setErr(e.message);
      }
    }
  };

  return (
    <View className="mt-16">
      <View className="gap-2">
        <Text className=" text-black font-roboto-semibold text-3xl">
          Reset Password
        </Text>
        <Text className="font-roboto text-base text-grey">
          Please enter the email address associated with your account.
        </Text>
      </View>

      <View className="gap-6 my-10">
        <CustomInput
          handleChange={(text) => handleChange("email", text)}
          error={errors?.email}
          value={form.email}
          label="Email"
          placeholder="Your email"
          keyboardType="email-address"
          type="normal"
        />
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

        <View className="flex-1  items-end w-[100%]">
          <RoundedFullButton
            className="bg-primary w-[75%] "
            onPress={handleSubmit}
          >
            {loading ? (
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
