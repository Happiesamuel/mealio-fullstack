import { ID } from "react-native-appwrite";
import { account, appwriteConfig, avatars, databases } from "./appwrite";

export const signup = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  try {
    const name = `${firstName} ${lastName}`;
    const user = await account.create(ID.unique(), email, password, name);
    const avatarUrl = avatars.getInitials(name);
    const guest = await createGuest(
      user.$id,
      firstName,
      lastName,
      email,
      avatarUrl
    );
    return guest;
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

export const createGuest = async (
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  avatar: Promise<ArrayBuffer>
) => {
  try {
    const name = `${firstName} ${lastName}`;
    const document = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.guestsCollectionId,
      ID.unique(),
      {
        name,
        email,
        avatar,
        guestId: userId,
        isVerified: false,
      }
    );
    return document;
  } catch (error: any) {
    throw error.message || "Failed to create document";
  }
};
