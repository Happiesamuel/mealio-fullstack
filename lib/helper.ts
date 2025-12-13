import * as ImagePicker from "expo-image-picker";

export async function pickImage() {
  // Ask permission first
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    alert("Permission to access photos is required!");
    return null;
  }

  // Open gallery
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (result.canceled) return null;

  return result.assets[0]; // contains uri, width, height, etc.
}

export function takePhoto() {
  return () =>
    new Promise<ImagePicker.ImagePickerAsset | null>(async (resolve) => {
      // Request permission
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        alert("Camera permission is required!");
        close();
        resolve(null);
        return;
      }

      // Launch camera
      const res = await ImagePicker.launchCameraAsync({
        quality: 1,
      });

      if (res.canceled) {
        resolve(null);
      } else {
        resolve(res.assets[0]); // fully typed { uri, width, height, ... }
      }
    });
}
export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
}
export function formatReviewDate(isoDate: string) {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // convert to 12-hour format
  const formattedHours = String(hours).padStart(2, "0");

  return `${day}/${month}/${year} ${formattedHours}:${minutes}${ampm.toLowerCase()}`;
}
export function randomReviews() {
  const users = ["Samuel", "Jane", "Ugo", "Chika", "Tolu", "Grace"];
  const comments = [
    "Absolutely loved this dish! The flavors were perfectly balanced, and every bite was a delight. Highly recommend trying it if you get the chance.",
    "This meal exceeded my expectations. The ingredients were fresh, and the seasoning was spot on. Will definitely order again!",
    "Really enjoyed the dish, although I felt it could use a little more spice. Overall, it was well-prepared and satisfying.",
    "Perfectly cooked and beautifully presented! Every detail from the aroma to the taste was impressive. Five stars!",
    "The meal was delicious and hearty. It felt like home-cooked food with a professional touch. Can't wait to try more dishes from here.",
    "Loved the textures and combinations of flavors. The dish was creative yet comforting, and it made my dining experience memorable.",
    "Tasty, flavorful, and generous portion sizes. Everything from the presentation to the taste was excellent. Highly recommend to anyone!",
    "A truly delightful meal! The chef has done an amazing job blending the flavors. I would definitely come back just for this.",
    "Good overall, though a bit on the salty side for my taste. Still, the dish was enjoyable and filling.",
    "Amazing attention to detail and wonderful flavor profile. Each bite was better than the last. Definitely a five-star experience!",
  ];

  return Array.from({ length: 5 }).map((_, i) => ({
    id: `rev-${Date.now()}-${i}`,
    user: users[Math.floor(Math.random() * users.length)],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    comment: comments[Math.floor(Math.random() * comments.length)],
    date: new Date(Date.now() - Math.random() * 10_000_000_000).toISOString(),
    avatar: `https://i.pravatar.cc/150?img=${1 + Math.floor(Math.random() * 5)}`,
  }));
}
