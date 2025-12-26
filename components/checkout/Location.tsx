import useGetUserAddress from "@/hooks/useGetUserAddress";
import AddressSkeleton from "@/skeleton/AddressSkeleton";
import { Address } from "@/types";
import { FontAwesome, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import RadioButton from "../ui/RadioButton";
import CheckoutModal from "./CheckoutModal";

export default function Location({
  setSelectedAddress,
  selectedAddress,
}: {
  setSelectedAddress: Dispatch<SetStateAction<string | null>>;
  selectedAddress: string | null;
}) {
  const { address, status, refetch, error } = useGetUserAddress();
  const [showModal, setShowModal] = useState(false);

  const [data, setData] = useState<null | Address>(null);
  function handleToogleModal(item?: Address) {
    if (item) setData(item);
    setShowModal(!showModal);
  }
  if (error)
    return (
      <View className="flex items-center justify-center w-[80%] pt-4 mx-auto gap-4">
        <View className="bg-white dark:bg-white/5 rounded-full flex items-center justify-center size-16">
          <MaterialIcons name="wifi-off" size={35} color="#14b74d" />
        </View>
        <View className="gap-1 flex items-center justify-center">
          <Text className="font-roboto-semibold text-base dark:text-white text-black">
            No connection
          </Text>
          <Text className="text-sm font-roboto text-grey text-center">
            {error.message}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => refetch()}
          className="bg-primary py-3 rounded w-full flex items-center justify-center"
        >
          <Text className="text-white text-base font-roboto-medium">
            Try again
          </Text>
        </TouchableOpacity>
      </View>
    );
  if (status === "pending")
    return (
      <View className="pb-8 mt-1 gap-2.5">
        {Array.from({ length: 1 }).map((_, i) => (
          <AddressSkeleton key={i} />
        ))}
      </View>
    );
  return (
    <View className="gap-2">
      <View className="flex items-center justify-between flex-row">
        <Text className="text-base font-roboto-medium dark:text-white text-black">
          Delivery Location
        </Text>
        <Pressable onPress={() => handleToogleModal()}>
          <Text className="text-base font-roboto-medium text-primary">
            Add New
          </Text>
        </Pressable>
      </View>
      {!address?.length ? (
        <View className="items-center gap-4 w-[80%] self-center my-8   justify-center">
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
        </View>
      ) : (
        <View className="gap-2">
          {address?.map((add) => (
            <LocationCard
              func={handleToogleModal}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              key={add.$id}
              item={add as unknown as Address}
            />
          ))}
        </View>
      )}
      {showModal && (
        <CheckoutModal
          visible={showModal}
          onCancel={() => {
            setShowModal(false);
            setData(null);
          }}
          onConfirm={() => {
            setShowModal(false);
          }}
          data={data}
        />
      )}
    </View>
  );
}
function LocationCard({
  item,
  selectedAddress,
  setSelectedAddress,
  func,
}: {
  item: Address;
  setSelectedAddress: Dispatch<SetStateAction<string | null>>;
  selectedAddress: string | null;
  func: (item: Address) => void;
}) {
  return (
    <View className="border border-grey dark:border-zinc-800 px-2.5 py-2 rounded-lg flex items-start flex-row gap-3">
      <View className="w-fit ">
        <RadioButton
          state={selectedAddress === item.$id}
          setState={() => setSelectedAddress(item.$id)}
        />
      </View>
      <View className="flex-1 gap-1.5">
        <View className="flex items-center flex-row justify-between">
          <Text className="font-roboto-medium text-sm dark:text-secondary text-black">
            {item.type} Address
          </Text>
          <Pressable onPress={() => func(item)}>
            <FontAwesome name="edit" size={18} color="#14AE5C" />
          </Pressable>
        </View>
        <View className="flex items-center flex-row justify-between">
          <View className="flex items-center flex-row gap-1">
            <Text className="font-roboto-medium text-base text-grey">
              {item.street}, {item.city}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
