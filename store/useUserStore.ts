import AsyncStorage from "@react-native-async-storage/async-storage";
import { Models } from "react-native-appwrite";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Store {
  user: Models.User<Models.Preferences> | null;
  isLoggedIn: boolean;
  setUser: (user: Models.User<Models.Preferences> | null) => void;
  reset: () => void;
}

export const useUserStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      setUser: (user) => set({ user, isLoggedIn: true }),
      reset: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "user-storage", // key in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export function useUserStorage() {
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const reset = useUserStore((s) => s.reset);

  return {
    user,
    isLoggedIn,
    setUser,
    reset,
  };
}
