import {
  createOtp,
  getGuestByEmail,
  login,
  loginWithGoogle,
  logout,
  plunk,
  signup,
} from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { Auth, Guest, SignupProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import { useCrateNotification } from "./useNotifications";
export type LoginData = {
  email: string;
  password: string;
};

export function useSignup() {
  const { mutate, status, error } = useMutation({
    mutationFn: (data: SignupProps) => signup(data),
  });
  return { mutate, status, error };
}

export function useLoginProvider() {
  const { setUser } = useUserStorage();
  const { from } = useLocalSearchParams<{ from: string }>();
  const { create } = useCrateNotification();

  const { mutate, status, error } = useMutation({
    mutationFn: () => loginWithGoogle(),

    onSuccess: async (data: Auth | boolean) => {
      if (typeof data === "boolean") return;
      setUser(data.user, data.guest as unknown as Guest);
      Toast.show({
        type: "success",
        text1: "Login successful",
        text2: "Fresh meals are just a tap away!",
      });

      create(
        {
          title: "Welcome back",
          content: `Fresh meals are just a tap away!. Don't mss the chance`,
          status: "login",
          image: null,
          guests: data.guest!.$id,
          createdAt: new Date().toISOString(),
        },
        {
          onSuccess: () =>
            Toast.show({
              type: "success",
              text1: "1 new notification",
            }),
        }
      );
      router.push(from ? (from as any) : "/(tabs)");
    },

    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Failed to login",
        text2: error.message,
      });
    },
  });
  return { mutate, status, error };
}
export function useLogin() {
  const { from } = useLocalSearchParams<{ from: string }>();
  const { setUser } = useUserStorage();
  const { create } = useCrateNotification();

  const { mutate, status, error } = useMutation({
    mutationFn: (data: LoginData) => login(data.email, data.password),

    onSuccess: async (data) => {
      const guest = await getGuestByEmail(data!.email);

      if (!guest!.isVerified) {
        await logout();
        const otp = await plunk(guest!.email);
        await createOtp(otp.otp, guest!.$id);
        router.push(`/otp?from=sign-up&userId=${guest!.$id}`);
      } else {
        Toast.show({
          type: "success",
          text1: "Login successful",
          text2: "Fresh meals are just a tap away!",
        });

        setUser(data, guest as unknown as Guest);

        create(
          {
            title: "Welcome back",
            content: `Fresh meals are just a tap away!. Don't mss the chance`,
            status: "login",
            image: null,
            guests: guest!.$id,
            createdAt: new Date().toISOString(),
          },
          {
            onSuccess: () =>
              Toast.show({
                type: "success",
                text1: "1 new notification",
              }),
          }
        );
        router.push(from ? (from as any) : "/(tabs)");
      }
    },

    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Failed to login",
        text2: error.message,
      });
    },
  });
  return { mutate, status, error };
}
