import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { icons } from "@/constnts";
import { useLoginProvider, useSignup } from "@/hooks/useAuth";
import { SignupInput, signupSchema } from "@/lib/schemas";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { ZodError } from "zod";

export default function SignUp() {
  const { mutate, status, error } = useSignup();
  const { mutate: provider } = useLoginProvider();
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupInput, string>>
  >({});
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    try {
      signupSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Record<
          keyof SignupInput,
          string[] | undefined
        >;
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field]?.[0] }));
      }
    }
  };

  const handleSubmit = () => {
    try {
      const validatedData: SignupInput = signupSchema.parse(form);
      setErrors({});
      const { confirmPassword, ...rest } = validatedData;
      mutate(rest, {
        onSuccess: (data) => {
          Toast.show({
            type: "success",
            text1: "Signup successful",
            text2: "Fresh meals are just a tap away!",
          });
          router.push(`/otp?from=sign-up&userId=${data.$id}`);
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Failed to signup",
            text2: error?.toString(),
          });
        },
      });
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Partial<
          Record<keyof SignupInput, string[]>
        >;

        const formattedErrors: Partial<Record<keyof SignupInput, string>> = {};
        (Object.keys(fieldErrors) as (keyof SignupInput)[]).forEach((key) => {
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
          Sign up
        </Text>
        <Text className="font-roboto text-base text-grey">
          Enter your details below
        </Text>
      </View>

      <View className="gap-3 my-10">
        <CustomInput
          handleChange={(text) => handleChange("firstName", text)}
          value={form.firstName}
          label="First name"
          placeholder="Your first name"
          keyboardType="default"
          type="normal"
          error={errors?.firstName}
        />
        <CustomInput
          handleChange={(text) => handleChange("lastName", text)}
          value={form.lastName}
          label="Last name"
          placeholder="Your last name"
          keyboardType="default"
          type="normal"
          error={errors?.lastName}
        />

        <CustomInput
          handleChange={(text) => handleChange("email", text)}
          value={form.email}
          label="Email"
          placeholder="Your email"
          keyboardType="email-address"
          type="normal"
          error={errors?.email}
        />
        <CustomInput
          label="Password"
          value={form.password}
          placeholder="Enter your password"
          type="password"
          handleChange={(text) => handleChange("password", text)}
          error={errors?.password}
        />
        <CustomInput
          handleChange={(text) => handleChange("confirmPassword", text)}
          value={form.confirmPassword}
          label="Confirm Password"
          placeholder="Enter your password"
          type="password"
          error={errors?.confirmPassword}
        />
      </View>

      <RoundedFullButton
        className="bg-primary"
        onPress={() => (status === "pending" ? null : handleSubmit())}
      >
        {status === "pending" ? (
          <View className="py-4">
            <ActivityIndicator size={20} color={"white"} />
          </View>
        ) : (
          <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
            Create Account
          </Text>
        )}
      </RoundedFullButton>

      <View className="w-full flex-row items-center justify-center my-6">
        <View className="h-[0.5px] bg-grey flex-1" />
        <Text className="px-4 text-grey font-roboto text-xs">
          or continue with
        </Text>
        <View className="h-[0.5px] bg-grey flex-1" />
      </View>

      <View className="flex w-full gap-6 items-center">
        <RoundedFullButton onPress={provider} className="bg-[#F2F4ED]">
          <View className="flex items-center py-4 justify-center gap-2 flex-row">
            <Image
              source={icons.google}
              resizeMode="contain"
              className="size-4"
            />
            <Text className="text-primary font-roboto-bold text-base">
              Continue with Google
            </Text>
          </View>
        </RoundedFullButton>
        <Text className="text-base font-roboto-bold text-black">
          Already have an account?{" "}
          <Link className="text-primary" href="/login">
            Login
          </Link>
        </Text>
      </View>
    </View>
  );
}
