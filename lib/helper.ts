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
