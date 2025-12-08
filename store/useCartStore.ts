import { CartItem } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

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
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const setCart = useCartStore((s) => s.setCart);
  const cart = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const totalCartQuantity = () =>
    cart.map((x) => x.quantity).reduce((a, b) => a + b);
  const totalCartPrice = () => cart.map((x) => x.price).reduce((a, b) => a + b);
  return {
    addItem,
    removeItem,
    clearCart,
    setCart,
    cart,
    setQuantity,
    totalCartQuantity,
    totalCartPrice,
  };
}
