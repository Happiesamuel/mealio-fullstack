import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type SearchItem = {
  title: string;
  date: Date;
};
interface SearchState {
  items: SearchItem[];
  addItem: (item: SearchItem) => void;
  removeItem: (title: string) => void;
  setSearch: (items: SearchItem[]) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set({ items: [...get().items, { ...item }] }),

      removeItem: (title) =>
        set({ items: get().items.filter((i) => i.title !== title) }),

      setSearch: (items) => set({ items }),

      clearSearch: () => set({ items: [] }),
    }),
    {
      name: "local-Search",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
export function useSearchStorage() {
  const addItem = useSearchStore((s) => s.addItem);
  const removeItem = useSearchStore((s) => s.removeItem);
  const clearSearch = useSearchStore((s) => s.clearSearch);
  const setSearch = useSearchStore((s) => s.setSearch);
  const search = useSearchStore((s) => s.items);
  return {
    addItem,
    removeItem,
    clearSearch,
    setSearch,
    search,
  };
}
