import Headers from "@/components/profile/Headers";
import ProfileHeader from "@/components/profile/ProfileHeader";
import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import useEditAddress from "@/hooks/useEditAddress";
import useGetUserAddress from "@/hooks/useGetUserAddress";
import { useUserStorage } from "@/store/useUserStore";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Edit() {
  const { addressId } = useLocalSearchParams<{ addressId: string }>();
  const { address } = useGetUserAddress();
  const { updteAdd, status } = useEditAddress();
  const { user } = useUserStorage();
  const [form, setForm] = useState({
    type: "",
    street: "",
    city: "",
  });
  const newAddress = address?.find((x) => x.$id === addressId);
  useEffect(
    function () {
      setForm({
        type: newAddress?.type || "",
        street: newAddress?.street || "",
        city: newAddress?.city || "",
      });
    },
    [address, newAddress]
  );
  if (!user)
    return (
      <Headers
        from="/profile/address"
        text="Address"
        subText="Edit your address here"
      />
    );

  function handleSubmit() {
    updteAdd(
      { addressId, data: form },
      { onSuccess: () => router.push("/profile/address") }
    );
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          className="bg-secondary dark:bg-[#121212] h-full px-3  "
        >
          <ProfileHeader>Edit Address</ProfileHeader>
          <Text className="mt-5 font-roboto-medium text-grey text-base">
            Edit your address here
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
