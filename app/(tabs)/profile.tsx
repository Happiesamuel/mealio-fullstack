import ProfileList from "@/components/profile/ProfileList";
import { images } from "@/constnts";
import { useBottomSheet } from "@/context/BottomSheetProvider";
import { pickImage } from "@/lib/helper";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const { open } = useBottomSheet();
  const [photo, setPhoto] = useState<string | null>(null);
  const list = [
    {
      name: "Take Photo",
      icon: <Feather name="camera" size={18} color="black" />,
      fun: () => null,
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
    const img = await pickImage();
    if (img) setPhoto(img.uri);
  }
  return (
    <SafeAreaView className="h-full bg-secondary px-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="mt-10 pb-16"
      >
        <Text className="font-roboto-bold text-xl text-black text-center mb-8">
          Profile
        </Text>
        <View className="flex items-center justify-center gap-2">
          <View className="relative size-[130px] flex items-center justify-center ">
            <Image
              resizeMode="cover"
              className=" size-full border-[3px] border-white rounded-full"
              source={photo ? { uri: photo } : images.profileImg}
            />
            <TouchableOpacity
              onPress={openSheet}
              className="bg-primary size-9 flex items-center justify-center rounded-full bottom-2 right-2 absolute "
            >
              <MaterialIcons name="edit" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View className="flex items-center justify-center">
            <Text className="font-roboto-medium text-base text-black">
              Adeola Damilola
            </Text>
            <Text className="font-roboto-medium text-base text-grey">
              Adedamilola1@gmail.com
            </Text>
          </View>
        </View>
        <ProfileList />
      </ScrollView>
    </SafeAreaView>
  );
}
