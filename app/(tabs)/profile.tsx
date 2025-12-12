import ProfileList from "@/components/profile/ProfileList";
import { useBottomSheet } from "@/context/BottomSheetProvider";
import { logout, uploadImage } from "@/lib/databse";
import { pickImage, takePhoto } from "@/lib/helper";
import { useUserStorage } from "@/store/useUserStore";
import {
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import cn from "clsx";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
export default function Profile() {
  const { open, close } = useBottomSheet();
  const { user, reset, guest } = useUserStorage();
  const [photo, setPhoto] = useState<string | null>(guest?.avatar || null);
  const [loading, setLoading] = useState(false);
  const list = [
    {
      name: "Take Photo",
      icon: <Feather name="camera" size={18} color="black" />,
      fun: handleTakePhoto,
    },
    {
      name: "Choose photo",
      icon: <FontAwesome name="photo" size={18} color="black" />,
      fun: choosePhoto,
    },
  ];

  const openSheet = () => {
    open(
      <View className=" gap-5">
        {list.map((lis) => (
          <Pressable
            onPress={() => lis.fun()}
            key={lis.name}
            className="gap-2 flex items-center flex-row"
          >
            {lis.icon}
            <Text className="font-roboto text-black text-xl ">{lis.name}</Text>
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
        await uploadImage(img, guest!.$id);
        setPhoto(img.uri);

        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Uploded",
          text2: "Photo uploaded successfully",
        });
      }
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
    try {
      const img = await takePhoto(() => null)();
      setLoading(true);
      if (img) {
        close();
        await uploadImage(img, guest!.$id);

        setPhoto(img.uri);

        setLoading(false);
        Toast.show({
          type: "success",
          text1: "Uploded",
          text2: "Photo uploaded successfully",
        });
      }
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
  async function handlePress() {
    setLoading(true);
    if (user) {
      const a = await logout();
      if (a) {
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
    <SafeAreaView edges={["top"]} className="h-full bg-secondary px-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="mt-10 pb-16"
      >
        <Text className="font-roboto-bold text-xl text-black text-center mb-8">
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
              <View className=" size-full border-[3px] border-white items-center justify-center rounded-full">
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
              <Text className="font-roboto-medium text-base text-black">
                {guest?.name}
              </Text>
              <Text className="font-roboto-medium text-base text-grey">
                {guest?.email}
              </Text>
            </View>
          ) : (
            <Text className="font-roboto-medium text-base text-black">
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
    </SafeAreaView>
  );
}
