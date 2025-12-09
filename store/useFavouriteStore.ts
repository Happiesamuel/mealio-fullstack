import { FavouriteMeal, Restaurant } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FavouriteState {
  items: {
    meals: FavouriteMeal[];
    restaurants: Restaurant[];
  };

  addItem: (
    item: FavouriteMeal | Restaurant,
    type: "meals" | "restaurants"
  ) => void;
  removeItem: (id: string, type: "meals" | "restaurants") => void;

  setFavourite: (items: FavouriteState["items"]) => void;
  clearFavourite: (type: "meals" | "restaurants") => void;
}

export const useFavouriteStore = create<FavouriteState>()(
  persist(
    (set, get) => ({
      items: { meals: [], restaurants: [] },

      addItem: (item, type) =>
        set({
          items: {
            ...get().items,
            [type]: [...get().items[type], item],
          },
        }),

      removeItem: (id, type) =>
        set({
          items: {
            ...get().items,
            [type]: get().items[type].filter((i) => i.id !== id),
          },
        }),

      setFavourite: (items) => set({ items }),

      clearFavourite: (type) => set({ items: { ...get().items, [type]: [] } }),
    }),
    {
      name: "favourite-cart",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export function useFavouriteStorage() {
  const addItem = useFavouriteStore((s) => s.addItem);
  const removeItem = useFavouriteStore((s) => s.removeItem);
  const clearFavourite = useFavouriteStore((s) => s.clearFavourite);
  const setFavourite = useFavouriteStore((s) => s.setFavourite);
  const favourite = useFavouriteStore((s) => s.items);

  return {
    addItem,
    removeItem,
    clearFavourite,
    setFavourite,
    favourite,
  };
}
