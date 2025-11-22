import { address } from "@/constnts/constant";
import { LocationProp } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Pressable, Text, View } from "react-native";
import RadioButton from "../ui/RadioButton";
import CheckoutModal from "./CheckoutModal";

export default function Location() {
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [data, setData] = useState<null | LocationProp>(null);
  function handleToogleModal(item?: LocationProp) {
    if (item) setData(item);
    setShowModal(!showModal);
  }
  return (
    <View className="gap-2">
      <View className="flex items-center justify-between flex-row">
        <Text className="text-base font-roboto-medium text-black">
          Delivery Location
        </Text>
        <Pressable onPress={() => handleToogleModal()}>
          <Text className="text-base font-roboto-medium text-primary">
            Add New
          </Text>
        </Pressable>
      </View>
      <View className="gap-2">
        {address.map((add) => (
          <LocationCard
            func={handleToogleModal}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            key={add.id}
            item={add}
          />
        ))}
      </View>
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
  item: LocationProp;
  setSelectedAddress: Dispatch<SetStateAction<string | null>>;
  selectedAddress: string | null;
  func: (item: LocationProp) => void;
}) {
  return (
    <View className="border border-grey px-2.5 py-2 rounded-lg flex items-start flex-row gap-3">
      <View className="w-fit ">
        <RadioButton
          state={selectedAddress === item.name}
          setState={() => setSelectedAddress(item.name)}
        />
      </View>
      <View className="flex-1 gap-1.5">
        <View className="flex items-center flex-row justify-between">
          <Text className="font-roboto-medium text-sm text-black">
            {item.name}
          </Text>
          <Pressable onPress={() => func(item)}>
            <FontAwesome name="edit" size={18} color="#14AE5C" />
          </Pressable>
        </View>
        <View className="flex items-center flex-row justify-between">
          <View className="flex items-center flex-row gap-1">
            <Text className="font-roboto-medium text-base text-grey">
              {item.street}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
