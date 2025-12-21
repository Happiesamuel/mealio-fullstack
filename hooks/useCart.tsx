import { addToCart, getCart } from "@/lib/databse";
import { useCartStorage } from "@/store/useCartStore";
import { useUserStorage } from "@/store/useUserStore";
import { CartApp, Guest } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

export function useAddToCart() {
  const queries = useQueryClient();
  const { guest } = useUserStorage();
  const {
    mutate: addAppCart,
    status,
    error,
  } = useMutation({
    mutationFn: (obj: CartApp) => addToCart(obj),
    onSuccess: () => {
      queries.invalidateQueries({ queryKey: ["cart", guest?.$id] });
    },
  });
  return { addAppCart, status, error };
}
export function useGetCart() {
  const { guest } = useUserStorage();

  const {
    data: cartApp,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["cart", guest?.$id],
    queryFn: () => getCart(guest!.$id),
    enabled: !!guest,
  });

  return { cartApp, status, error, refetch };
}

export default function useSyncCart() {
  const { cartStore, clearCart } = useCartStorage();
  const { guest } = useUserStorage();
  const { addAppCart } = useAddToCart();
  const { cartApp, status } = useGetCart();

  const hasSynced = useRef(false);

  useEffect(() => {
    if (!guest) return;
    if (!cartStore.length) return;
    if (status !== "success") return;
    if (hasSynced.current) return;

    const syncCart = async () => {
      try {
        for (const item of cartStore) {
          const exists = cartApp?.some(
            (serverItem) => serverItem.id === item.id
          );

          if (exists) continue;

          addAppCart({ ...item, guests: guest.$id as unknown as Guest });
        }

        clearCart();
        hasSynced.current = true;
      } catch (error) {
        console.error("Cart sync failed:", error);
      }
    };

    syncCart();
  }, [guest, cartStore, cartApp, status, addAppCart, clearCart]);
}
