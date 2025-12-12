import { Guest } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Models } from "react-native-appwrite";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Store {
  user: Models.User<Models.Preferences> | null;
  isLoggedIn: boolean;
  setUser: (
    user: Models.User<Models.Preferences> | null,
    guest: Guest | null
  ) => void;
  reset: () => void;
  guest: Guest | null;
}

export const useUserStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      guest: null,

      setUser: (user, guest) => set({ user, isLoggedIn: true, guest: guest }),
      reset: () => set({ user: null, isLoggedIn: false, guest: null }),
    }),
    {
      name: "user-storage", // key in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export function useUserStorage() {
  const user = useUserStore((s) => s.user);
  const guest = useUserStore((s) => s.guest);
  const setUser = useUserStore((s) => s.setUser);
  const isLoggedIn = useUserStore((s) => s.isLoggedIn);
  const reset = useUserStore((s) => s.reset);

  return {
    user,
    isLoggedIn,
    setUser,
    reset,
    guest,
  };
}
