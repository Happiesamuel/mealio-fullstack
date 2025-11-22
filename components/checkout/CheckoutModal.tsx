import { address } from "@/constnts/constant";
import { LocationProp } from "@/types";
import { EvilIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
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
  data?: LocationProp | null;
}) {
  const [form, setForm] = useState({
    street: data?.street || "",
    addressType: data?.name || "",
    landmark: "",
  });
  function handleSubmit() {
    if (data) {
      const o = address.map((add) => {
        return add.id === data.id
          ? { id: data.id, street: form.street, name: form.addressType }
          : { ...add };
      });
    } else {
      address.push({
        id: new Date().toString(),
        street: form.street,
        name: form.addressType,
      });
    }
    // console.log(address);
    onConfirm?.();
  }
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-[92%] bg-white rounded-2xl py-5  shadow-xl">
          <View
            style={{ borderColor: "#A1A1A1", borderBottomWidth: 0.5 }}
            className="flex items-center justify-between  flex-row px-4 mb-4"
          >
            <Text className="font-roboto-bold text-xl text-black mb-4">
              Add new Address
            </Text>
            <Pressable onPress={onCancel} className="mb-4">
              <EvilIcons name="close-o" size={24} color="black" />
            </Pressable>
          </View>
          <View className="gap-3 px-4 mt-2">
            <CustomInput
              handleChange={(text) => setForm({ ...form, street: text })}
              value={form.street}
              label="Street Name"
              placeholder="Your street name"
              keyboardType="default"
              type="normal"
            />
            <CustomInput
              handleChange={(text) => setForm({ ...form, addressType: text })}
              value={form.addressType}
              label="Address Type"
              placeholder="e.g Office address"
              keyboardType="default"
              type="normal"
            />
            <CustomInput
              handleChange={(text) => setForm({ ...form, landmark: text })}
              value={form.landmark}
              label="Landmark"
              placeholder="Enter landmark area"
              keyboardType="default"
              type="normal"
            />
          </View>
          <View className="px-4">
            <RoundedFullButton
              onPress={handleSubmit}
              className=" mt-10 py-3  rounded-full bg-primary items-center"
            >
              <Text className=" font-roboto-bold text-base text-white">
                Save Address
              </Text>
            </RoundedFullButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}
