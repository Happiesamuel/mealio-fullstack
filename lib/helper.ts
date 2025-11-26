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

export function takePhoto(close: () => void) {
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

      close();

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
