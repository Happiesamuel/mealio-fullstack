import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function CartModal({
  visible,
  onCancel,
  onConfirm,
  children,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center ">
        <View className="w-[80%] bg-white dark:bg-zinc-900 rounded-2xl py-8 items-center shadow-xl px-6">
          <FontAwesome name="trash" size={48} color="#FD3F3F" />

          {children}

          <View className="flex-row w-[85%] justify-between">
            <RoundedFullButton
              onPress={onConfirm}
              className="border border-error py-2 rounded-full w-[45%] items-center"
            >
              <Text className="text-error font-roboto-bold text-base">
                Remove
              </Text>
            </RoundedFullButton>

            <Pressable
              onPress={onCancel}
              className="bg-green-600 py-2 rounded-full w-[45%] items-center"
            >
              <Text className="text-white font-roboto-bold text-base">
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
