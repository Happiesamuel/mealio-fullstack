import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import useGetGuest from "@/hooks/useGetGuest";
import useUpdatePassword from "@/hooks/useUpdatePssword";
import { login } from "@/lib/databse";
import { resetInput, resetSchema } from "@/lib/schemas";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { ZodError } from "zod";

export default function NewPassword() {
  const { update, status: updateStatus, error } = useUpdatePassword();
  const params = useLocalSearchParams<{ userId: string }>();
  const { data, status } = useGetGuest({ type: "id", value: params.userId });
  const [errors, setErrors] = useState<
    Partial<Record<keyof resetInput, string>>
  >({});
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    try {
      resetSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Record<
          keyof resetInput,
          string[] | undefined
        >;
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field]?.[0] }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const validatedData: resetInput = resetSchema.parse(form);
      setErrors({});
      await login(data?.email, data?.password);
      update(
        {
          newPassword: validatedData.password,
          oldPassword: data?.password,
          userId: params.userId,
        },
        {
          onSuccess: () => {
            Toast.show({
              type: "success",
              text1: "Updted successfully",
              text2: "Login with your new password",
            });
            router.push("/success");
          },
          onError: () => {
            Toast.show({
              type: "error",
              text1: "Failed to change password",
              text2: error?.message.toString(),
            });
          },
        }
      );
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Partial<
          Record<keyof resetInput, string[]>
        >;

        const formattedErrors: Partial<Record<keyof resetInput, string>> = {};
        (Object.keys(fieldErrors) as (keyof resetInput)[]).forEach((key) => {
          if (fieldErrors[key] && fieldErrors[key]?.length > 0) {
            formattedErrors[key] = fieldErrors[key]![0];
          }
        });

        setErrors(formattedErrors);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };
  return (
    <View className="mt-16">
      <View className="gap-2">
        <Text className=" text-black font-roboto-semibold text-3xl">
          New Password
        </Text>
        <Text className="font-roboto text-base text-grey">
          Create a new Password
        </Text>
      </View>

      {status === "pending" ? (
        <View className="flex items-center justify-center h-[200px] w-full">
          <ActivityIndicator size={25} color={"#14b74d"} />
        </View>
      ) : (
        <View className="mt-6 gap-4">
          <CustomInput
            handleChange={(text) => handleChange("password", text)}
            error={errors?.password}
            value={form.password}
            label="Create Password"
            placeholder="Enter your password"
            type="password"
          />
          <CustomInput
            label="Confirm Password"
            handleChange={(text) => handleChange("confirmPassword", text)}
            error={errors?.confirmPassword}
            value={form.confirmPassword}
            placeholder="Enter your password"
            type="password"
          />
          <View className="flex flex-row items-center w-full justify-evenly -bottom-[75%] ">
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
                {updateStatus === "pending" ? (
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
      )}
    </View>
  );
}
