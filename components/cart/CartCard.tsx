import useAllCart from "@/hooks/useAllCart";
import { useDeleteCart } from "@/hooks/useCart";
import { useUserStorage } from "@/store/useUserStore";
import { CartDoc, CartProp } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QuantityChange from "../ui/QuantityChange";
import CartModal from "./CartModal";

export default function CartCard({ item }: { item: CartDoc }) {
  const [showModal, setShowModal] = useState(false);
  const { deleteItem, status } = useDeleteCart();
  const { guest } = useUserStorage();
  const { handleQuantity, quan, removeItem, quanStat } = useAllCart(
    item as unknown as CartProp
  );
  return (
    <View className="bg-[#EEEEEE] dark:bg-white/10 px-2.5 py-2 rounded-xl flex items-center flex-row gap-2">
      <TouchableOpacity
        onPress={() =>
          router.push(`/fooddetail/${item.id}?res=${item.restaurantId}`)
        }
        className="w-[25%]"
      >
        <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          className="h-[50px] w-full rounded"
        />
      </TouchableOpacity>
      <View className="flex-1 gap-2.5">
        <View className="flex items-center flex-row justify-between">
          <Text className="font-roboto text-sm dark:text-secondary text-black w-[80%]">
            {item.title}
          </Text>
          {status === "pending" ? (
            <ActivityIndicator size={15} color="#14b74d" />
          ) : (
            <Pressable onPress={() => setShowModal(!showModal)}>
              <FontAwesome name="trash" size={18} color="#FD3F3F" />
            </Pressable>
          )}
        </View>
        <View className="flex items-center flex-row justify-between">
          <View className="flex items-center flex-row gap-2">
            <Text className="font-roboto-medium text-xs text-grey">
              ${item.price.toFixed(2)} * {quan}
            </Text>
            <Text className="font-roboto-medium text-sm dark:text-secondary text-black">
              ${Math.floor(item.price * quan).toFixed(2)}
            </Text>
          </View>
          <QuantityChange
            quanStat={quanStat}
            quan={quan}
            handleQuantity={handleQuantity}
          />
        </View>
      </View>
      {showModal && (
        <CartModal
          visible={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
            return guest ? deleteItem(item.$id) : removeItem(item.id);
          }}
        >
          <Text className=" font-roboto-medium text-2xl mt-4 mb-6">
            Remove Item?
          </Text>
        </CartModal>
      )}
    </View>
  );
}
