import CountryPicker from "@/components/profile/CountryPicker";
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

export default function Edit() {
  const { user } = useUserStorage();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
  });
  if (!user)
    return (
      <Headers
        from="/profile/edit"
        text="Edit Profile"
        subText="Edit your profile here"
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
          <ProfileHeader>Edit Profile</ProfileHeader>
          <Text className="mt-5 font-roboto-medium text-grey text-base">
            Edit your profile here
          </Text>
          <View className="gap-6 my-10">
            <CustomInput
              handleChange={(text) => setForm({ ...form, firstName: text })}
              value={form.firstName}
              label="First Name"
              placeholder="Your name"
              keyboardType="default"
              type="normal"
            />
            <CustomInput
              handleChange={(text) => setForm({ ...form, lastName: text })}
              value={form.lastName}
              label="Last Name"
              placeholder="Your name"
              keyboardType="default"
              type="normal"
            />
            <CustomInput
              handleChange={(text) => setForm({ ...form, email: text })}
              value={form.email}
              label="Email"
              placeholder="Your email"
              keyboardType="email-address"
              type="normal"
            />
          </View>
          <CountryPicker />
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
