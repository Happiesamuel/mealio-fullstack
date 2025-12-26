import Headers from "@/components/profile/Headers";
import ProfileHeader from "@/components/profile/ProfileHeader";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import { useTheme } from "@/context/ThemeProvider";
import { useUserStorage } from "@/store/useUserStore";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { SafeAreaView } from "react-native-safe-area-context";
type CreditCardForm = {
  valid: boolean;
  values: {
    number: string;
    expiry: string;
    cvc: string;
    type?: string;
    name?: string;
    postalCode?: string;
  };
  status: {
    number: string;
    expiry: string;
    cvc: string;
    name?: string;
    postalCode?: string;
  };
};

export default function Payment() {
  const { user } = useUserStorage();
  const { isDark } = useTheme();
  const handleChange = (form: CreditCardForm) => {
    console.log("Card Form:", form);
  };
  function handleSubmit() {}
  if (!user)
    return (
      <Headers
        from="/profile/payment"
        text="Payment Method"
        subText="Edit your payment here"
      />
    );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-secondary dark:bg-[#121212]"
    >
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          className="bg-secondary dark:bg-[#121212] h-full px-3  "
        >
          <ProfileHeader>Payment Method</ProfileHeader>
          <Text className="mt-5 font-roboto-medium text-grey text-base">
            Edit your payment here
          </Text>
          <View className="gap-6 my-5">
            <LiteCreditCardInput
              onChange={handleChange}
              inputStyle={{
                color: isDark ? "#ffffff" : "#1A1A1A",
                fontSize: 14,
                marginRight: 10,
                paddingHorizontal: 16,
                backgroundColor: isDark ? "rgb(255 255 255 / 0.1)" : "#E8E8E8",
                borderRadius: 16,
              }}
            />
          </View>
          <RoundedFullButton
            className="bg-primary mt-10"
            onPress={handleSubmit}
          >
            <Text className=" text-center py-4 font-roboto-bold text-base text-secondary ">
              Save Changes
            </Text>
          </RoundedFullButton>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
