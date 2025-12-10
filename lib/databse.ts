import { ID } from "react-native-appwrite";
import { account } from "./appwrite";

export const signup = async (email: string, password: string, name: string) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);

    return user;
  } catch (error: any) {
    console.error("Signup Error:", error);
    throw error.message || "Sign up failed";
  }
};
export const login = async (email: string, password: string) => {
  try {
    const session = await account.createSession(email, password);
    return session;
  } catch (error: any) {
    console.error("Login Error:", error);
    throw error.message || "Sign up failed";
  }
};
