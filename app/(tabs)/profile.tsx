import ProfileList from "@/components/profile/ProfileList";
import { useBottomSheet } from "@/context/BottomSheetProvider";
import { useTheme } from "@/context/ThemeProvider";
import { logout, uploadImage } from "@/lib/databse";
import { pickImage } from "@/lib/helper";
import { useUserStorage } from "@/store/useUserStore";
import { Guest } from "@/types";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import cn from "clsx";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Profile() {
  const { open, close } = useBottomSheet();
  const { user, reset, guest, setUser } = useUserStorage();
  const [photo, setPhoto] = useState<string | null>(guest?.avatar || null);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const { isDark } = useTheme();

  const list = [
    {
      name: "Take Photo",
      icon: (
        <Feather
          name="camera"
          size={18}
          color={isDark ? "#f7f7f7" : "#191919"}
        />
      ),
      fun: handleTakePhoto,
    },
    {
      name: "Choose photo",
      icon: (
        <FontAwesome
          name="photo"
          size={18}
          color={isDark ? "#f7f7f7" : "#191919"}
        />
      ),
      fun: choosePhoto,
    },
  ];

  const openSheet = () => {
    open(
      <View className=" gap-5 pb-8 ">
        {list.map((lis) => (
          <Pressable
            onPress={() => lis.fun()}
            key={lis.name}
            className="gap-2 flex items-center flex-row"
          >
            {lis.icon}
            <Text className="font-roboto dark:text-white text-black text-xl ">
              {lis.name}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  async function choosePhoto() {
    try {
      const img = await pickImage();
      setLoading(true);
      if (img) {
        close();
        const data = await uploadImage(img, guest!.$id);
        setPhoto(img.uri);
        setUser(user, { ...guest, avatar: data.avatar } as unknown as Guest);
        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Uploaded",
          text2: "Photo uploaded successfully",
        });
      }
      if (!img) setLoading(false);
    } catch (error) {
      const err = error as Error;
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Failed to Upload photo",
        text2: err?.message,
      });
    }
  }

  async function handleTakePhoto() {
    if (!permission) {
      return;
    }

    if (!permission.granted) {
      const result = await requestPermission();
      if (!result.granted) {
        Toast.show({
          type: "error",
          text1: "Permission denied",
          text2: "Camera permission is required",
        });
        return;
      }
    }

    close();
    setShowCamera(true);
  }

  async function takePicture() {
    if (!cameraRef.current) return;

    setLoading(true);

    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.2,
        exif: false,
      });

      if (!photo?.uri) {
        throw new Error("Failed to capture photo");
      }

      console.log("✅ Photo captured:", photo.uri);

      setShowCamera(false);
      const data = await uploadImage(photo, guest!.$id);
      setPhoto(photo.uri);
      setUser(user, { ...guest, avatar: data.avatar } as unknown as Guest);
      Toast.show({
        type: "success",
        text1: "Uploaded",
        text2: "Photo uploaded successfully",
      });
    } catch (error) {
      const err = error as Error;

      Toast.show({
        type: "error",
        text1: "Failed to upload photo",
        text2: err?.message ?? "Camera error",
      });
    } finally {
      setLoading(false);
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function handlePress() {
    setLoading(true);
    if (user) {
      const a = await logout();
      if (a) {
        setPhoto(null);
        reset();
        Toast.show({
          type: "success",
          text1: "Logout successfully",
          text2: "Login to get the best recipe",
        });
        router.push("/(tabs)");
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to logout",
          text2: "No internet connection",
        });
      }
    } else {
      router.push(`/login?from=/profile`);
    }
    setLoading(false);
    try {
    } catch (error) {
      const err = error as Error;
      Toast.show({
        type: "error",
        text1: "Failed to logout",
        text2: err?.message || "",
      });
      setLoading(false);
    }
  }

  return (
    <SafeAreaView
      edges={["top"]}
      className="h-full bg-secondary dark:bg-[#121212] px-5"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="mt-10 pb-16"
      >
        <Text className="font-roboto-bold text-xl text-black dark:text-white text-center mb-8">
          Profile
        </Text>
        <View className="flex items-center justify-center gap-2">
          <View className="relative size-[130px] flex items-center justify-center ">
            {loading && (
              <View className="rounded-full absolute bg-black/30 flex items-center justify-center size-[120px] z-30 ">
                <ActivityIndicator color={"#14b74d"} size={20} />
              </View>
            )}
            {photo ? (
              <Image
                resizeMode="cover"
                className=" size-full border-[3px] border-white rounded-full"
                source={{ uri: photo }}
              />
            ) : (
              <View className=" size-full border-[3px] border-white dark:border-white/50 items-center justify-center rounded-full">
                <MaterialCommunityIcons
                  name="account"
                  size={70}
                  color="#14b74d"
                />
              </View>
            )}
            {user && (
              <TouchableOpacity
                disabled={loading}
                onPress={openSheet}
                className="bg-primary size-9 flex items-center z-50 justify-center rounded-full bottom-2 right-2 absolute "
              >
                <MaterialIcons name="edit" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
          {guest ? (
            <View className="flex items-center justify-center">
              <View className="flex items-center flex-row gap-0.5">
                <Text className="font-roboto-medium dark:text-secondary text-base text-black">
                  {guest?.name}
                </Text>
                {guest?.isVerified && (
                  <MaterialIcons name="verified" size={18} color="#14B74D" />
                )}
              </View>
              <Text className="font-roboto-medium text-base text-grey">
                {guest?.email}
              </Text>
            </View>
          ) : (
            <Text className="font-roboto-medium text-base dark:text-secondary text-black">
              Sign in to access your profile
            </Text>
          )}
        </View>
        <ProfileList />

        <TouchableOpacity
          onPress={async () => await handlePress()}
          className="self-center mt-6"
        >
          {loading ? (
            <ActivityIndicator color={"#14b74d"} size={20} />
          ) : (
            <Text
              className={cn(
                "text-base font-roboto-semibold",
                user ? "text-error" : "text-primary"
              )}
            >
              {user ? "Logout" : "Login"}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <View style={styles.cameraContainer}>
          <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.flipButton}
                onPress={toggleCameraFacing}
              >
                <MaterialIcons name="flip-camera-ios" size={28} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePicture}
                disabled={loading}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowCamera(false)}
              >
                <MaterialIcons name="close" size={28} color="white" />
              </TouchableOpacity>
            </View>
          </CameraView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginHorizontal: 20,
    marginBottom: 40,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  flipButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "white",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
  },
  cancelButton: {
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
