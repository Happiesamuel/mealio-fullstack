import { icons } from "@/constnts";
import { payment } from "@/constnts/constant";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import RadioButton from "../ui/RadioButton";
import PaymentModal from "./PaymentModal";
interface PaymentMethodProp {
  name: string;
  pin: string;
  id: string;
  icon: any;
}
export default function PaymentMethod({
  selectedAddress,
  setSelectedAddress,
}: {
  selectedAddress: string | null;
  setSelectedAddress: Dispatch<SetStateAction<string | null>>;
}) {
  const [showModal, setShowModal] = useState(false);
  return (
    <View className="gap-6">
      <View className="gap-2">
        <View className="flex items-center justify-between flex-row">
          <Text className="text-base font-roboto-medium dark:text-white text-black">
            Payment Method
          </Text>
          <Pressable onPress={() => setShowModal(!showModal)}>
            <Text className="text-base font-roboto-medium text-primary">
              Add New
            </Text>
          </Pressable>
        </View>
        <View className="gap-2">
          {payment.map((add) => (
            <PaymentCard
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
              key={add.id}
              item={add}
            />
          ))}
        </View>
      </View>
      <OtherPaymentMethod
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />
      {showModal && (
        <PaymentModal
          visible={showModal}
          onCancel={() => {
            setShowModal(false);
          }}
          onConfirm={() => {
            setShowModal(false);
          }}
        />
      )}
    </View>
  );
}

function OtherPaymentMethod({
  selectedAddress,
  setSelectedAddress,
}: {
  setSelectedAddress: Dispatch<SetStateAction<string | null>>;
  selectedAddress: string | null;
}) {
  return (
    <View className="gap-2">
      <View className="flex items-center justify-between flex-row">
        <Text className="text-base font-roboto-medium dark:text-white text-black">
          Other Payment Method
        </Text>
      </View>
      <View className="gap-2">
        <PaymentCard
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          item={{
            name: "Cash on Delivery",
            pin: "Pay while receiving packages ",
            id: "1",
            icon: icons.cash,
          }}
        />
      </View>
    </View>
  );
}

function PaymentCard({
  item,
  selectedAddress,
  setSelectedAddress,
}: {
  item: PaymentMethodProp;
  setSelectedAddress: Dispatch<SetStateAction<string | null>>;
  selectedAddress: string | null;
}) {
  return (
    <View className="border border-grey dark:border-zinc-800 px-2.5 py-2 rounded-lg flex items-center flex-row gap-3">
      <View className="w-6 ">
        <Image
          source={item.icon}
          resizeMode="contain"
          className="h-[20px]  rounded"
        />
      </View>
      <View className="flex-1 gap-1.5">
        <View className="flex items-center flex-row justify-between">
          <Text className="font-roboto-medium text-sm dark:text-secondary text-black">
            {item.name}
          </Text>
          <RadioButton
            state={selectedAddress === item.name}
            setState={() => setSelectedAddress(item.name)}
          />
        </View>
        <View className="flex items-center flex-row justify-between">
          <View className="flex items-center flex-row gap-1">
            <Text className="font-roboto-medium text-base text-grey">
              {item.pin}
            </Text>
          </View>
        </View>
      </View>
      {/* {showModal && (
        <CartModal
          visible={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            setShowModal(false);
          }}
        />
      )} */}
    </View>
  );
}
