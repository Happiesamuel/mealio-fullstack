import { useCartStorage } from "@/store/useCartStore";
import { useUserStorage } from "@/store/useUserStore";
import { CartItem, CartProp, Guest, Meal, MealDetail } from "@/types";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useAddToCart } from "./useCart";

export default function useAllCart(item: Meal | MealDetail | CartProp) {
  const [quan, setQuan] = useState(1);
  const { cart, addItem, removeItem, setQuantity, cartAppStatus } =
    useCartStorage();
  const { guest } = useUserStorage();
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
        { ...newCart, guests: guest.$id as unknown as Guest },
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
  function handleQuantity(type: string) {
    if (type === "decrease") {
      if (quan === 1) {
        setQuan(1);
        removeItem(item.id);
      } else {
        setQuan((i) => (i -= 1));
        setQuantity(item.id, quan - 1);
      }
    } else {
      setQuan((i) => (i += 1));
      setQuantity(item.id, quan + 1);
    }
  }
  return {
    handleQuantity,
    handleCart,
    quan,
    isInCart,
    removeItem,
    status,
    cartAppStatus,
  };
}
