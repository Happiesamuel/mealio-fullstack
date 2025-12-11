import { SignupProps } from "@/types";
import { ID, Query } from "react-native-appwrite";
import { account, appwriteConfig, avatars, databases } from "./appwrite";

export async function plunk(to: string) {
  try {
    const response = await fetch(
      "https://plunk-email.vercel.app/api/sendEmail",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: to }),
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    throw Error("Error sending OTP:", err as Error);
  }
}
export async function createOtp(code: string, guestId: string) {
  const expirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  const response = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.otpCollectionId,
    ID.unique(),
    {
      otpCode: code,
      expirationTime: expirationTime.toISOString(),
      isUsed: false,
      guests: guestId,
    }
  );
  return {
    message: "OTP sent",
    otp: code,
    success: true,
    document: response,
  };
}
export async function validateOTP(userId: string, otp: string) {
  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.otpCollectionId,
    [
      Query.equal("guests.$id", userId),
      Query.equal("otpCode", otp),
      Query.equal("isUsed", false),
    ]
  );

  if (result.documents.length === 0) {
    throw new Error("OTP may be invalid or expired");
  }

  const otpDoc = result.documents[0];

  if (new Date(otpDoc.expirationTime) < new Date()) {
    throw new Error("OTP expired");
  }

  await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.otpCollectionId,
    otpDoc.$id,
    {
      isUsed: true,
    }
  );
  await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.guestsCollectionId,
    userId,
    {
      isVerified: true,
    }
  );

  return { success: true, message: "OTP verified" };
}
export const recreateOtp = async (email: string, userId: string) => {
  try {
    const otp = await plunk(email);
    await createOtp(otp.otp, userId);
  } catch (error: any) {
    throw error.message || "Failed to resend OTP ";
  }
};
export const signup = async (data: SignupProps) => {
  const { email, password, firstName, lastName } = data;
  try {
    const name = `${firstName} ${lastName}`;
    const user = await account.create(ID.unique(), email, password, name);
    const avatarUrl = avatars.getInitialsURL(name);

    const guest = await createGuest(
      user.$id,
      firstName,
      lastName,
      email,
      avatarUrl,
      password
    );
    const otp = await plunk(guest.email);
    await createOtp(otp.otp, guest.$id);
    return guest;
  } catch (error: any) {
    console.error("Signup Error:", error);
    throw error.message || "Sign up failed";
  }
};
export async function getGuestById(userId: string) {
  try {
    const guestDoc = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.guestsCollectionId,
      userId
    );
    return guestDoc;
  } catch (err: any) {
    console.error("Error fetching guest:", err);
    throw new Error(err.message || "Failed to fetch guest");
  }
}
export async function getGuestByEmail(email: string) {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.guestsCollectionId,
      [Query.equal("email", email)]
    );

    if (result.documents.length === 0) {
      throw new Error("User not found");
    }

    return result.documents[0];
  } catch (err: any) {
    console.error("Error fetching guest by email:", err);
    throw new Error(err.message || "Failed to fetch guest");
  }
}

export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error as string);
  }
};
export async function getCurrentUser() {
  try {
    const user = await account.get();
    return user;
  } catch (err: any) {
    console.error("No logged in user:", err);
    return null; // not logged in
  }
}

export async function logout() {
  try {
    await account.deleteSession("current"); // logs out current session
    return true;
  } catch (err: any) {
    console.error("Failed to logout:", err);
  }
}
export async function changePassword(
  newPassword: string,
  oldPassword: string,
  userId: string
) {
  try {
    console.log(newPassword, oldPassword, userId);
    await account.updatePassword(newPassword, oldPassword);
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.guestsCollectionId,
      userId,
      {
        password: newPassword,
      }
    );

    return { success: true, message: "Password updated successfully" };
  } catch (err: any) {
    console.log(err);
    throw new Error(err.message || "Failed to update password");
  }
}
export const createGuest = async (
  userId: string,
  firstName: string,
  lastName: string,
  email: string,
  avatar: URL,
  password: string
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
        password,
      }
    );
    return document;
  } catch (error: any) {
    throw error.message || "Failed to create document";
  }
};
