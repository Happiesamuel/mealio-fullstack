import ProfileHeader from "@/components/profile/ProfileHeader";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
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
  //   const [form, setForm] = useState({
  //     homeAddress: "",
  //     otherAddress: "",
  //   });
  const handleChange = (form: CreditCardForm) => {
    console.log("Card Form:", form);
  };
  function handleSubmit() {}
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          className="bg-secondary h-full px-3  "
        >
          <ProfileHeader>Payment Method</ProfileHeader>
          <Text className="mt-5 font-roboto-medium text-grey text-base">
            Edit your payment here
          </Text>
          <View className="gap-6 my-5">
            <LiteCreditCardInput
              onChange={handleChange}
              inputStyle={{
                color: "#1A1A1A",
                fontSize: 14,
                marginRight: 10,
                paddingHorizontal: 16,
                backgroundColor: "#E8E8E8",
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
