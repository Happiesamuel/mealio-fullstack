import { useCartStorage } from "@/store/useCartStore";
import { useUserStorage } from "@/store/useUserStore";
import { CartDoc, CartItem, CartProp, Meal, MealDetail } from "@/types";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useAddToCart, useUpdateCart } from "./useCart";

export default function useAllCart(item: Meal | MealDetail | CartProp) {
  const [quan, setQuan] = useState(1);
  const { cart, addItem, removeItem, setQuantity, cartAppStatus } =
    useCartStorage();
  const { guest } = useUserStorage();
  const { updateQuan, status: quanStat } = useUpdateCart();
  const { addAppCart, status } = useAddToCart();
  const isInCart = cart?.some((x) => x.id === item.id);
  useEffect(
    function () {
      if (item) setQuan(cart?.find((x) => x.id === item.id)?.quantity ?? 1);
    },
    [item]
  );
  async function handleCart() {
    if (isInCart) return;
    const { price, rating, title, id, restaurantId, image } = item;
    const newCart: CartItem = {
      price,
      rating,
      title,
      id,
      restaurantId,
      image,
      quantity: 1,
    };
    if (!guest) {
      addItem(newCart);
    } else {
      addAppCart(
        { ...newCart, guests: guest.$id as string },
        {
          onSuccess: () => {
            Toast.show({
              type: "success",
              text1: "item added successfully",
              text2: "Check your cart to complete your order",
            });
          },
          onError: () => {
            Toast.show({
              type: "error",
              text1: "Failed",
              text2: "Failed to add to cart",
            });
          },
        }
      );
    }
  }
  function handleQuantity(type: "increase" | "decrease") {
    const delta = type === "increase" ? 1 : -1;
    const newQuantity = Math.max(1, quan + delta);

    if (!guest) {
      if (type === "decrease" && quan === 1) {
        removeItem(item.id);
        setQuan(1);
        return;
      }

      setQuan(newQuantity);
      setQuantity(item.id, newQuantity);
      return;
    }

    const ite = cart?.find((x) => x.id === item.id) as CartDoc | undefined;

    const toast = {
      onSuccess: () =>
        Toast.show({
          type: "success",
          text1: "Item updated successfully",
          text2: "Check your cart to complete your order",
        }),
      onError: () =>
        Toast.show({
          type: "error",
          text1: "Failed",
          text2: "Failed to update quantity",
        }),
    };

    if (!ite) {
      setQuan(newQuantity);
      return;
    }

    if (type === "decrease" && quan === 1) {
      setQuan(1);
      updateQuan({ id: ite.$id, quantity: 0 }, toast);
      return;
    }

    setQuan(newQuantity);
    updateQuan({ id: ite.$id, quantity: newQuantity }, toast);
  }

  return {
    handleQuantity,
    handleCart,
    quan,
    isInCart,
    removeItem,
    status,
    cartAppStatus,
    quanStat,
  };
}
