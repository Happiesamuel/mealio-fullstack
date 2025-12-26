import { useTheme } from "@/context/ThemeProvider";
import useCreateAddress from "@/hooks/useCreateAddress";
import useEditAddress from "@/hooks/useEditAddress";
import { useUserStorage } from "@/store/useUserStore";
import { Address } from "@/types";
import { EvilIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomInput from "../ui/CustomInput";
import RoundedFullButton from "../ui/RoundedFullButton";

export default function CheckoutModal({
  visible,
  onCancel,
  onConfirm,
  data,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  data?: Address | null;
}) {
  const { guest } = useUserStorage();
  const { isDark } = useTheme();
  const { updteAdd, status: upStat } = useEditAddress();
  const { create, status, error } = useCreateAddress();
  const [form, setForm] = useState({
    type: data?.type ?? "",
    street: data?.street ?? "",
    city: data?.city ?? "",
  });

  function handleSubmit() {
    if (!form.type || !form.street || !form.city) return;
    if (data) {
      updteAdd(
        { addressId: data.$id, data: form },
        { onSuccess: () => onConfirm?.() }
      );
    } else {
      create(
        { ...form, guests: guest!.$id },
        {
          onSuccess: () => {
            Toast.show({
              type: "success",
              text1: "Sucess",
              text2: "Address created successfully",
            });
            onConfirm?.();
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
  }
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-[92%] bg-white dark:bg-zinc-800 rounded-2xl py-5  shadow-xl">
          <View
            style={{ borderColor: "#A1A1A1", borderBottomWidth: 0.5 }}
            className="flex items-center justify-between  flex-row px-4 mb-4"
          >
            <Text className="font-roboto-bold text-xl dark:text-white text-black mb-4">
              {data ? "Edit" : "Add new"} Address
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
          <View className="px-4">
            {status === "pending" || upStat == "pending" ? (
              <View className=" mt-10 py-3  rounded-full bg-primary items-center">
                <ActivityIndicator size={20} color={"white"} />
              </View>
            ) : (
              <RoundedFullButton
                onPress={handleSubmit}
                className=" mt-10 py-3  rounded-full bg-primary items-center"
              >
                <Text className=" font-roboto-bold text-base text-white">
                  Save Address
                </Text>
              </RoundedFullButton>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
