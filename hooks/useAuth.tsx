import {
  createOtp,
  getGuestByEmail,
  login,
  logout,
  plunk,
  signup,
} from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { Guest, SignupProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
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

export function useLogin() {
  const { from } = useLocalSearchParams<{ from: string }>();
  const { setUser } = useUserStorage();

  const { mutate, status, error } = useMutation({
    mutationFn: (data: LoginData) => login(data.email, data.password),

    onSuccess: async (data) => {
      const guest = await getGuestByEmail(data!.email);

      if (!guest.isVerified) {
        await logout();
        const otp = await plunk(guest!.email);
        await createOtp(otp.otp, guest!.$id);
        router.push(`/otp?from=sign-up&userId=${guest.$id}`);
      } else {
        Toast.show({
          type: "success",
          text1: "Login successful",
          text2: "Fresh meals are just a tap away!",
        });
        setUser(data, guest as unknown as Guest);
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
