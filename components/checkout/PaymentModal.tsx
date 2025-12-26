import { useTheme } from "@/context/ThemeProvider";
import { EvilIcons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import RoundedFullButton from "../ui/RoundedFullButton";
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

export default function PaymentModal({
  visible,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const { isDark } = useTheme();
  const handleChange = (form: CreditCardForm) => {
    console.log("Card Form:", form);
  };
  function handleSubmit() {
    onConfirm?.();
  }
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-[92%] bg-white dark:bg-zinc-800  rounded-2xl py-5  shadow-xl">
          <View
            style={{ borderColor: "#A1A1A1", borderBottomWidth: 0.5 }}
            className="flex items-center justify-between  flex-row px-4 mb-4"
          >
            <Text className="font-roboto-bold text-xl dark:text-white text-black mb-4">
              Add New card
            </Text>
            <Pressable onPress={onCancel} className="mb-4">
              <EvilIcons
                name="close-o"
                size={24}
                color={isDark ? "#f7f7f7" : "#191919"}
              />
            </Pressable>
          </View>
          <View className="gap-3 px-4 mt-2">
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
          <View className="px-4">
            <RoundedFullButton
              onPress={handleSubmit}
              className=" mt-10 py-3  rounded-full bg-primary items-center"
            >
              <Text className=" font-roboto-bold text-base text-white">
                Save Card
              </Text>
            </RoundedFullButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}
