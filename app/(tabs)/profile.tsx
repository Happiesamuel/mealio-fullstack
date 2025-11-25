import { images } from "@/constnts";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView className="h-full bg-secondary px-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="mt-10"
      >
        <Text className="font-roboto-bold text-xl text-black text-center mb-8">
          Profile
        </Text>
        <View className="flex items-center justify-center gap-2">
          <View className="relative size-[130px] flex items-center justify-center ">
            <Image
              resizeMode="cover"
              className=" size-full border-[3px] border-white rounded-full"
              source={images.profileImg}
            />
            <TouchableOpacity className="bg-primary size-9 flex items-center justify-center rounded-full bottom-2 right-2 absolute ">
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
      </ScrollView>
    </SafeAreaView>
  );
}
