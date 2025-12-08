import { useCartStorage } from "@/store/useCartStore";
import { CartItem, Meal, MealDetail } from "@/types";
import { useEffect, useState } from "react";

export default function useAllCart(item: Meal | MealDetail) {
  const [quan, setQuan] = useState(1);
  const { cart, addItem, removeItem, setQuantity } = useCartStorage();
  const isInCart = cart.some((x) => x.id === item.id);
  useEffect(
    function () {
      if (item) setQuan(cart.find((x) => x.id === item.id)?.quantity ?? 1);
    },
    [item]
  );
  function handleCart() {
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
    addItem(newCart);
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
  return { handleQuantity, handleCart, quan, isInCart };
}
