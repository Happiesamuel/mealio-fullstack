import { login, signup } from "@/lib/databse";
import { SignupProps } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Models } from "react-native-appwrite";

type AuthType = "sign-up" | "login";
export type LoginData = {
  email: string;
  password: string;
};
export default function useAuth(type: AuthType) {
  const mutationFn = (data: SignupProps | LoginData) => {
    if (type === "sign-up") {
      return signup(data as SignupProps);
    } else {
      const loginData = data as LoginData;
      return login(loginData.email, loginData.password);
    }
  };

  const { mutate, status, error } = useMutation<
    Models.Document | Models.Session,
    Error,
    SignupProps | LoginData
  >({
    mutationFn,
  });

  return { mutate, status, error };
}
