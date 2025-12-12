import Headers from "@/components/profile/Headers";
import ProfileHeader from "@/components/profile/ProfileHeader";
import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { useUserStorage } from "@/store/useUserStore";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Address() {
  const { user } = useUserStorage();
  const [form, setForm] = useState({
    homeAddress: "",
    otherAddress: "",
  });
  if (!user)
    return (
      <Headers
        from="/profile/address"
        text="Address"
        subText="Edit your address here"
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
          <ProfileHeader>Address</ProfileHeader>
          <Text className="mt-5 font-roboto-medium text-grey text-base">
            Edit your address here
          </Text>
          <View className="gap-6 my-10">
            <CustomInput
              handleChange={(text) => setForm({ ...form, homeAddress: text })}
              value={form.homeAddress}
              label="Home Address"
              placeholder="Enter your address"
              keyboardType="default"
              type="normal"
            />
            <CustomInput
              handleChange={(text) => setForm({ ...form, otherAddress: text })}
              value={form.otherAddress}
              label="Other Address"
              placeholder="Enter your address"
              keyboardType="default"
              type="normal"
            />
          </View>
          <RoundedFullButton className="bg-primary mt-10" onPress={() => {}}>
            <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
              Save Changes
            </Text>
          </RoundedFullButton>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
