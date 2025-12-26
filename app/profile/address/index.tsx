import Headers from "@/components/profile/Headers";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Error from "@/components/ui/Error";
import useDeleteAddress from "@/hooks/useDeleteAddress";
import useGetUserAddress from "@/hooks/useGetUserAddress";
import AddressSkeleton from "@/skeleton/AddressSkeleton";
import { useUserStorage } from "@/store/useUserStore";
import {
  FontAwesome,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Link, router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { address, status, error, refetch } = useGetUserAddress();
  const { deleteAdd, status: deleteStat } = useDeleteAddress();
  const { user } = useUserStorage();
  if (!user) return <Headers from="/profile/address" text="Address" />;

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
    <SafeAreaView
      edges={["top"]}
      className="bg-secondary dark:bg-[#121212] pb-safe px-3 h-full"
    >
      <ProfileHeader>Address</ProfileHeader>
      {newAddress.length && (
        <Text className="mt-3.5 pb-3 font-roboto-medium dark:text-white text-black text-base">
          Address book ({newAddress.length})
        </Text>
      )}
      {error && <Error error={error.message} onPress={refetch} />}
      <FlatList
        data={newAddress}
        renderItem={({ item }) => (
          <View
            key={item.id}
            className="gap-1.5 bg-white dark:bg-white/10 rounded-xl shadow-sm shadow-black p-4"
          >
            <View className="gap-1">
              <Text className="font-roboto-semibold text-base dark:text-white text-black">
                {item.type} Address
              </Text>
              <Text className="font-roboto text-sm text-grey">
                {item.street}
              </Text>
              <View className="flex flex-row items-center justify-between">
                <Text className="font-roboto text-sm text-grey">
                  {item.city}
                </Text>
                <View className="flex items-center flex-row gap-4">
                  <Pressable
                    onPress={() =>
                      router.push(`/profile/address/edit?addressId=${item.id}`)
                    }
                  >
                    <FontAwesome name="edit" size={24} color="#14b74d" />
                  </Pressable>
                  {deleteStat === "pending" ? (
                    <ActivityIndicator size={20} color={"#14b74d"} />
                  ) : (
                    <Pressable onPress={() => deleteAdd(item.id)}>
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        size={24}
                        color="#14b74d"
                      />
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-8 mt-1 gap-2.5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => {
          return status === "pending" ? (
            <View className="pb-8 mt-1 gap-2.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <AddressSkeleton key={i} />
              ))}
            </View>
          ) : (
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
          );
        }}
      />
      {newAddress.length && (
        <View className="flex items-center justify-between flex-row py-3">
          <Link
            href={`/profile/address/address`}
            className="bg-primary rounded py-4 w-full"
          >
            <Text className="text-white font-roboto-medium text-center text-sm">
              Add new address
            </Text>
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
}
