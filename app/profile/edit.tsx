import Headers from "@/components/profile/Headers";
import ProfileHeader from "@/components/profile/ProfileHeader";
import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { useTheme } from "@/context/ThemeProvider";
import useUpdate from "@/hooks/useUpdate";
import { editInput, editSchema } from "@/lib/schemas";
import { useUserStorage } from "@/store/useUserStore";
import { Guest } from "@/types";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { ZodError } from "zod";

export default function Edit() {
  const { user, guest, setUser } = useUserStorage();
  const { status, error: updateErr, update } = useUpdate();
  const { isDark } = useTheme();
  const [errors, setErrors] = useState<
    Partial<Record<keyof editInput, string>>
  >({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
  });
  useEffect(
    function () {
      if (guest?.name) {
        const [firstName, lastName] = guest!.name.split(" ");
        setForm({ firstName, lastName });
      }
    },
    [guest, user]
  );
  if (!user && !guest)
    return (
      <Headers
        from="/profile/edit"
        text="Edit Profile"
        subText="Edit your profile here"
      />
    );

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    try {
      editSchema.pick({ [field]: true }).parse({ [field]: value });
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Record<
          keyof editInput,
          string[] | undefined
        >;
        setErrors((prev) => ({ ...prev, [field]: fieldErrors[field]?.[0] }));
      }
    }
  };
  const handleSubmit = () => {
    try {
      const validatedData: editInput = editSchema.parse(form);
      setErrors({});

      update(
        {
          userId: guest!.$id,
          update: {
            name: `${validatedData.firstName} ${validatedData.lastName}`,
          },
        },
        {
          onError: () => {
            Toast.show({
              type: "error",
              text1: "Failed to update",
              text2: updateErr?.message,
            });
          },
          onSuccess: (data) => {
            setUser(user, data as unknown as Guest);
            router.push("/profile");
          },
        }
      );
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldErrors = err.flatten().fieldErrors as Partial<
          Record<keyof editInput, string[]>
        >;

        const formattedErrors: Partial<Record<keyof editInput, string>> = {};
        (Object.keys(fieldErrors) as (keyof editInput)[]).forEach((key) => {
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
    <KeyboardAvoidingView
      className="bg-secondary dark:bg-[#121212]"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          className="bg-secondary dark:bg-[#121212] h-full px-3  "
        >
          <ProfileHeader>Edit Profile</ProfileHeader>
          <Text className="mt-5 font-roboto-medium text-grey text-base">
            Edit your profile here
          </Text>
          <View className="gap-6 my-10">
            <CustomInput
              error={errors?.firstName}
              handleChange={(text) => handleChange("firstName", text)}
              value={form.firstName}
              label="First Name"
              placeholder="Your name"
              keyboardType="default"
              type="normal"
            />
            <CustomInput
              error={errors?.lastName}
              handleChange={(text) => handleChange("lastName", text)}
              value={form.lastName}
              label="Last Name"
              placeholder="Your name"
              keyboardType="default"
              type="normal"
            />
          </View>
          {/* <CountryPicker /> */}
          <RoundedFullButton
            className="bg-primary mt-10"
            onPress={handleSubmit}
          >
            {status === "pending" ? (
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
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#121212" : "#f7f7f7"}
      />
    </KeyboardAvoidingView>
  );
}
