import Headers from "@/components/profile/Headers";
import ProfileHeader from "@/components/profile/ProfileHeader";
import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { createOtp, plunk } from "@/lib/databse";
import { emailInput, emailSchema } from "@/lib/schemas";
import { useUserStorage } from "@/store/useUserStore";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { ZodError } from "zod";

export default function Email() {
  const { user, guest } = useUserStorage();
  const [form, setForm] = useState({
    email: "",
  });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof emailInput, string>>
  >({});

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
      const otp = await plunk(validatedData.email);
      await createOtp(otp.otp, guest!.$id);
      Toast.show({
        type: "success",
        text1: "Email OTP",
        text2: "We've sent you an OTP...Check your email",
      });
      setTimeout(() => {
        router.push(`/profile/security/email/otp?email=${validatedData.email}`);
      }, 1500);
      setErrors({});
      setLoading(false);
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
  if (!user)
    return (
      <Headers
        from="/profile/security/password"
        text="Change Password"
        subText=" Create a new Password"
      />
    );
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

          <View className="gap-6 mt-12 my-4">
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
          <RoundedFullButton
            className="bg-primary mt-10"
            onPress={handleSubmit}
          >
            {loading ? (
              <View className="py-4">
                <ActivityIndicator size={20} color={"white"} />
              </View>
            ) : (
              <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
                Save Changes
              </Text>
            )}
          </RoundedFullButton>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
