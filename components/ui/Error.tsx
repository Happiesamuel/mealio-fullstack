import useGetUser from "@/hooks/useGetUser";
import { getGuestByEmail } from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { Guest } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Error({
  error,
  onPress,
}: {
  error?: string;
  onPress?: () => void;
}) {
  const { refetch } = useGetUser();
  const { setUser, reset } = useUserStorage();

  const handleTryAgain = async () => {
    if (onPress) onPress();

    try {
      const { data: fetchedUser } = await refetch();

      if (fetchedUser) {
        const guest = await getGuestByEmail(fetchedUser.email);
        setUser(fetchedUser, guest as unknown as Guest);
      } else {
        reset();
      }
    } catch (err: any) {
      console.log("Failed to refetch user:", err.message || err);
    }
  };

  return (
    <View className="flex items-center justify-center w-[80%] pt-24 mx-auto gap-4">
      <View className="bg-white rounded-full flex items-center justify-center size-24">
        <MaterialIcons name="wifi-off" size={50} color="#14b74d" />
      </View>
      <View className="gap-2 flex items-center justify-center">
        <Text className="font-roboto-semibold text-base text-black">
          No connection
        </Text>
        <Text className="text-sm font-roboto text-grey text-center">
          {error}
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleTryAgain}
        className="bg-primary py-3 mt-4 rounded w-full flex items-center justify-center"
      >
        <Text className="text-white text-base font-roboto-medium">
          Try again
        </Text>
      </TouchableOpacity>
    </View>
  );
}
