import Headers from "@/components/profile/Headers";
import ProfileHeader from "@/components/profile/ProfileHeader";
import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import useUpdatePassword from "@/hooks/useUpdatePssword";
import { changeInput, changeSchema } from "@/lib/schemas";
import { useUserStorage } from "@/store/useUserStore";
import { Guest } from "@/types";
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

export default function Password() {
  const { update, status: updateStatus, error } = useUpdatePassword();
  const { user, guest, setUser } = useUserStorage();
  const [errors, setErrors] = useState<
    Partial<Record<keyof changeInput, string>>
  >({});
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    try {
      changeSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Record<
          keyof changeInput,
          string[] | undefined
        >;
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field]?.[0] }));
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const validatedData: changeInput = changeSchema.parse(form);
      setErrors({});
      if (validatedData.oldPassword !== guest?.password) {
        Toast.show({
          type: "error",
          text1: "Incorrect",
          text2: "Old password is wrong!",
        });
      } else
        update(
          {
            newPassword: validatedData.newPassword,
            oldPassword: validatedData.oldPassword,
            userId: guest!.$id,
          },
          {
            onSuccess: () => {
              Toast.show({
                type: "success",
                text1: "Updted successfully",
                text2: "Login with your new password",
              });
              setUser(user, {
                ...guest,
                password: validatedData.newPassword,
              } as unknown as Guest);
              router.push("/profile");
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
          Record<keyof changeInput, string[]>
        >;

        const formattedErrors: Partial<Record<keyof changeInput, string>> = {};
        (Object.keys(fieldErrors) as (keyof changeInput)[]).forEach((key) => {
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
      className="bg-secondary dark:bg-[#121212]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          className="bg-secondary dark:bg-[#121212] h-full px-3  "
        >
          <ProfileHeader>Change Password</ProfileHeader>
          <Text className="mt-5 font-roboto-medium text-grey text-base">
            Create a new Password
          </Text>
          <View className="gap-6 my-10">
            <CustomInput
              handleChange={(text) => handleChange("oldPassword", text)}
              error={errors?.oldPassword}
              value={form.oldPassword}
              label="Old Password"
              placeholder="Enter your password"
              type="password"
            />
            <CustomInput
              label="New Password"
              handleChange={(text) => handleChange("newPassword", text)}
              error={errors?.newPassword}
              value={form.newPassword}
              placeholder="Enter your password"
              type="password"
            />
            <CustomInput
              label="Confirm New Password"
              handleChange={(text) => handleChange("confirmNewPassword", text)}
              error={errors?.confirmNewPassword}
              value={form.confirmNewPassword}
              placeholder="Enter your password"
              type="password"
            />
          </View>
          <RoundedFullButton
            className="bg-primary mt-10"
            onPress={handleSubmit}
          >
            {updateStatus === "pending" ? (
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
