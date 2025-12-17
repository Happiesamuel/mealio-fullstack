import Headers from "@/components/profile/Headers";
import ProfileHeader from "@/components/profile/ProfileHeader";
import useGetUserAddress from "@/hooks/useGetUserAddress";
import { useUserStorage } from "@/store/useUserStore";
import { FontAwesome6 } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { address, status } = useGetUserAddress();
  const { user, guest } = useUserStorage();
  if (!user) return <Headers from="/profile/address" text="Address" />;
  if (status === "pending")
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  const newAddress =
    address?.map((add) => {
      return {
        city: add.city,
        street: add.street,
        type: add.type,
        id: add.$id,
      };
    }) ?? [];
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          className="bg-secondary h-full px-3  "
        >
          <ProfileHeader>Address</ProfileHeader>
          <Text className="mt-5 font-roboto-medium text-grey text-base">
            View all address
          </Text>
          {!newAddress.length ? (
            <View className="items-center gap-4 w-[80%] self-center mt-24 justify-center">
              <View className="flex bg-primary rounded-full  items-center justify-center size-16">
                <FontAwesome6 name="address-card" size={24} color="white" />
              </View>
              <View className="gap-0.5 flex items-center">
                <Text className="font-roboto-semibold text-black text-base text-center">
                  No address found
                </Text>
                <Text className="font-roboto text-grey text-sm text-center">
                  You don&apos;t have an address
                </Text>
              </View>
              <Link
                href={`/profile/address/address`}
                className="bg-primary rounded py-4 w-full"
              >
                <Text className="text-white font-roboto-medium text-center text-sm">
                  Create address
                </Text>
              </Link>
            </View>
          ) : (
            <View>
              {newAddress.map((add) => (
                <View key={add.id} className="">
                  <Text className="font-roboto-bold">{guest?.name}</Text>
                  <View>
                    <Text>{add.type}</Text>
                    <Text>{add.street}</Text>
                    <Text>{add.city}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
