import Headers from "@/components/profile/Headers";
import ProfileHeader from "@/components/profile/ProfileHeader";
import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import useCreateAddress from "@/hooks/useCreateAddress";
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

export default function Address() {
  const { user, guest } = useUserStorage();
  const { create, status, error } = useCreateAddress();
  const [form, setForm] = useState({
    type: "",
    street: "",
    city: "",
  });
  if (!user)
    return (
      <Headers
        from="/profile/address"
        text="Address"
        subText="Edit your address here"
      />
    );
  function handleSubmit() {
    create(
      { ...form, guests: guest!.$id },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: "Sucess",
            text2: "Address created successfully",
          });
          router.push("/profile");
        },
        onError: () => {
          Toast.show({
            type: "error",
            text1: "Failed to create address",
            text2: error?.message.toString(),
          });
        },
      }
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          className="bg-secondary h-full px-3 dark:bg-[#121212] "
        >
          <ProfileHeader>Create Address</ProfileHeader>
          <Text className="mt-5 font-roboto-medium text-grey text-base">
            Create your address here
          </Text>
          <View className="gap-6 my-10">
            <CustomInput
              handleChange={(text) => setForm({ ...form, type: text })}
              value={form.type}
              label="Address Type"
              placeholder="e.g Home "
              keyboardType="default"
              type="normal"
            />
            <CustomInput
              handleChange={(text) => setForm({ ...form, street: text })}
              value={form.street}
              label="Street Name"
              placeholder="e.g 12 ABCD street"
              keyboardType="default"
              type="normal"
            />
            <CustomInput
              handleChange={(text) => setForm({ ...form, city: text })}
              value={form.city}
              label="City"
              placeholder="Enter your city"
              keyboardType="default"
              type="normal"
            />
          </View>
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
    </KeyboardAvoidingView>
  );
}
