import ProfileHeader from "@/components/profile/ProfileHeader";
import CustomInput from "@/components/ui/CustomInput";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Password() {
  const [form, setForm] = useState({
    password: "",
    newPassword: "",
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          className="bg-secondary h-full px-3  "
        >
          <ProfileHeader>Change Password</ProfileHeader>
          <Text className="mt-5 font-roboto-medium text-grey text-base">
            Create a new Password
          </Text>
          <View className="gap-6 my-10">
            <CustomInput
              handleChange={(text) => setForm({ ...form, password: text })}
              value={form.password}
              label="Old Password"
              placeholder="Enter your password"
              type="password"
            />
            <CustomInput
              label="New Password"
              handleChange={(text) => setForm({ ...form, newPassword: text })}
              value={form.newPassword}
              placeholder="Enter your password"
              type="password"
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
