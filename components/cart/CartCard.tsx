import { AntDesign, FontAwesome } from "@expo/vector-icons";
import cn from "clsx";
import React, { useState } from "react";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import CartModal from "./CartModal";
interface CartProp {
  name: string;
  price: number;
  image: any;
  id: string;
  quantity: number;
}
export default function CartCard({ item }: { item: CartProp }) {
  const [quan, setQuan] = useState(item.quantity || 1);
  const [showModal, setShowModal] = useState(false);
  function handleDecrease() {
    if (quan === 1) {
      setQuan(1);
    } else {
      setQuan((i) => (i -= 1));
    }
  }
  function handleIncrease() {
    setQuan((i) => (i += 1));
  }
  return (
    <View className="bg-[#EEEEEE] px-2.5 py-2 rounded-xl flex items-center flex-row gap-2">
      <View className="w-[25%]">
        <Image
          source={item.image}
          resizeMode="cover"
          className="h-[50px] w-full rounded"
        />
      </View>
      <View className="flex-1 gap-2.5">
        <View className="flex items-center flex-row justify-between">
          <Text className="font-roboto text-sm text-black">{item.name}</Text>
          <Pressable onPress={() => setShowModal(!showModal)}>
            <FontAwesome name="trash" size={18} color="#FD3F3F" />
          </Pressable>
        </View>
        <View className="flex items-center flex-row justify-between">
          <View className="flex items-center flex-row gap-1">
            <Text className="font-roboto-medium text-sm text-black">
              ${item.price.toFixed(2)}
            </Text>
          </View>
          <View className="flex items-center flex-row gap-2">
            <TouchableOpacity
              className={cn(
                "border  size-[22px] rounded-lg flex items-center justify-center",
                quan <= 1
                  ? "border-grey bg-transparent"
                  : "border-primary bg-primary/10"
              )}
              onPress={handleDecrease}
            >
              <AntDesign
                name="minus"
                size={11}
                color={quan <= 1 ? "#A1A1A1" : "#14B74D"}
              />
            </TouchableOpacity>
            <Text className="text-sm font-roboto-semibold text-black">
              {quan}
            </Text>
            <TouchableOpacity
              className="border border-primary bg-primary/10 size-[22px] rounded-lg flex items-center justify-center"
              onPress={handleIncrease}
            >
              <AntDesign name="plus" size={11} color="#14B74D" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showModal && (
        <CartModal
          visible={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
          }}
        />
      )}
    </View>
  );
}
