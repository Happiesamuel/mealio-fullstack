import { useGetCart } from "@/hooks/useCart";
import { CartItem } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useUserStorage } from "./useUserStore";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  setCart: (items: CartItem[]) => void;
  setQuantity: (id: string, quan: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set({ items: [...get().items, item] }),

      removeItem: (id) =>
        set({ items: get().items.filter((i) => i.id !== id) }),

      setCart: (items) => set({ items }),

      clearCart: () => set({ items: [] }),
      setQuantity: (id, quan) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: quan } : i
          ),
        })),
    }),
    {
      name: "local-cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
export function useCartStorage() {
  const { cartApp, status: cartAppStatus } = useGetCart();
  const { guest } = useUserStorage();
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const setCart = useCartStore((s) => s.setCart);
  const cartStore = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const cart = guest ? cartApp : cartStore;
  const totalCartQuantity = () =>
    cart?.length ? cart.map((x) => x.quantity).reduce((a, b) => a + b) : 0;
  const totalCartPrice = () =>
    cart?.length ? cart.map((x) => x.price).reduce((a, b) => a + b) : 0;
  const total = () =>
    cart?.length
      ? cart.map((x) => x.quantity * x.price).reduce((a, b) => a + b)
      : 0;
  return {
    addItem,
    removeItem,
    clearCart,
    setCart,
    cart,
    setQuantity,
    totalCartQuantity,
    totalCartPrice,
    total,
    cartAppStatus,
    cartStore,
  };
}
