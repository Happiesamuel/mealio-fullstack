import { AddressProps, Auth, CartApp, SignupProps } from "@/types";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { ID, OAuthProvider, Query } from "react-native-appwrite";
import {
  account,
  appwriteConfig,
  avatars,
  databases,
  storage,
} from "./appwrite";
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
    throw Error(err as string);
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
      return null;
    }

    return result.documents[0];
  } catch (err: any) {
    console.error("Error fetching guest by email:", err);
    throw new Error(err.message || "Failed to fetch guest");
  }
}

export const login = async (email: string, password: string) => {
  try {
    await account.createEmailPasswordSession(email, password);
    return await getCurrentUser();
  } catch (error) {
    throw new Error(error as string);
  }
};
export async function getCurrentUser() {
  try {
    const user = await account.get();
    return user;
  } catch (err: any) {
    throw err;
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

export async function uploadImage(img: any, userId: string) {
  try {
    const file = {
      uri: img.uri,
      name: img.fileName ?? `photo-${Date.now()}.jpg`,
      type: img.mimeType ?? "image/jpeg",
      size: img.fileSize ?? 0,
    };
    const uploaded = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      file
    );
    const data = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.guestsCollectionId,
      userId,
      {
        avatar: `${appwriteConfig.endpoint}/storage/buckets/${appwriteConfig.bucketId}/files/${uploaded.$id}/view?project=${appwriteConfig.projectId}&mode=admin`,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function updateDoc(obj: {
  userId: string;
  update: { [keys: string]: string | boolean };
}) {
  try {
    const data = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.guestsCollectionId,
      obj.userId,
      obj.update
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export async function emailOTP(
  userId: string,
  otp: string,
  email: string,
  password: string
) {
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
  account.updateEmail(email, password);

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
      email: email,
    }
  );

  return { success: true, message: "OTP verified" };
}

export const createAdress = async (obj: AddressProps) => {
  try {
    const document = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.addressCollectionId,
      ID.unique(),
      obj
    );
    return document;
  } catch (error: any) {
    throw error.message || "Failed to create document";
  }
};
export const getUserAddress = async (userId: string) => {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.addressCollectionId,
      [Query.equal("guests.$id", userId)]
    );
    return result.documents;
  } catch (error: any) {
    throw error.message || "Failed to create document";
  }
};
export async function deleteAddress(addressId: string) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.addressCollectionId,
      addressId
    );
  } catch (error: any) {
    throw error.message || "Failed to delete document";
  }
}
export async function updateAddress(
  addressId: string,
  data: Record<string, any>
) {
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.addressCollectionId,
      addressId,
      data
    );
  } catch (error: any) {
    throw error.message || "Failed to delete document";
  }
}

export async function loginWithGoogle(): Promise<Auth | boolean> {
  try {
    const redirectUri = Linking.createURL("");
    const res = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!res) throw new Error("Failed to login,first");

    const browserRes = await WebBrowser.openAuthSessionAsync(
      res.toString(),
      redirectUri
    );
    if (browserRes.type !== "success")
      throw new Error("Failed to login!,second");

    const url = new URL(browserRes.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();
    if (!secret || !userId) throw new Error("Failed to login,third");

    const session = await account.createSession(userId!, secret!);

    if (!session) throw new Error("Failed to create a session");
    const user = await getCurrentUser();

    if (!user) throw new Error("Failed to create a session");

    const guest = await getGuestByEmail(user.email);
    if (!guest) {
      await account.updatePassword("22222222");
      const avatarUrl = avatars.getInitialsURL(user.name);
      const [firstName, ...lastName] = user.name.split(" ");
      const data = await createGuest(
        user.$id,
        firstName,
        lastName.join(" "),
        user.email,
        avatarUrl,
        "22222222"
      );
      const guest = await updateDoc({
        userId: data.$id,
        update: { isVerified: true },
      });
      return { user, guest } as unknown as Auth;
    } else {
      return { user, guest } as unknown as Auth;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function addToCart(obj: CartApp) {
  try {
    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cartCollectionId,
      ID.unique(),
      obj
    );
  } catch (error) {
    console.error("Add to cart failed:", error);
    throw error;
  }
}

export async function getCart(userId: string) {
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.cartCollectionId,
      [Query.equal("guests.$id", userId), Query.orderDesc("$createdAt")]
    );
    return result.documents;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    throw error;
  }
}

export async function updateCart(id: string, quantity: number) {
  try {
    if (quantity <= 0) {
      return await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.cartCollectionId,
        id
      );
    }

    return await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.cartCollectionId,
      id,
      { quantity }
    );
  } catch (error) {
    console.error("Failed to update cart quantity:", error);
    throw error;
  }
}
