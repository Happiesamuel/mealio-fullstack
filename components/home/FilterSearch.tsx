import { cusine } from "@/constnts/constant";
import { FontAwesome } from "@expo/vector-icons";
import cn from "clsx";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RadioButton from "../ui/RadioButton";
import RoundedFullButton from "../ui/RoundedFullButton";
export default function FilterSearch({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose?(): void;
}) {
  const [relevance, setRelevance] = useState(false);
  const [pricing, setPricing] = useState<string | null>(null);
  const [rating, setRating] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<string | null>(null);
  const [offers, setOffers] = useState<string | null>(null);
  const [cusines, setCusines] = useState<string[]>([]);
  function handleCuisine(cuis: string) {
    const exist = cusines.some((x) => x === cuis);
    if (exist) {
      setCusines((i) => [...i.filter((x) => x !== cuis)]);
    } else {
      setCusines((i) => [...i, cuis]);
    }
  }
  return (
    <FilterModal visible={visible} onClose={onClose}>
      <View className="gap-2">
        <Text className="font-roboto-bold text-xl text-black">Sort By </Text>
        <RadioButton
          state={relevance}
          setState={() => setRelevance(!relevance)}
          text="Relevance"
        />
      </View>
      <View className="gap-2">
        <Text className="font-roboto-bold text-xl text-black">Pricing: </Text>
        <RadioButton
          state={pricing === "high-low"}
          setState={() => setPricing("high-low")}
          text="High  -  Low"
        />
        <RadioButton
          state={pricing === "low-high"}
          setState={() => setPricing("low-high")}
          text="Low  -  High"
        />
      </View>
      <View className="gap-2">
        <Text className="font-roboto-bold text-xl text-black">Ratings: </Text>
        <RadioButton
          state={rating === "high-low"}
          setState={() => setRating("high-low")}
          text="High  -  Low"
        />
        <RadioButton
          state={rating === "low-high"}
          setState={() => setRating("low-high")}
          text="Low  -  High"
        />
      </View>
      <View className="gap-2">
        <Text className="font-roboto-bold text-xl text-black">Cuisine:</Text>
        <View className="flex flex-row flex-wrap gap-2">
          {cusine.map((cuis) => {
            const exist = cusines.some((x) => x === cuis.slug);
            return (
              <TouchableOpacity
                key={cuis.slug}
                onPress={() => handleCuisine(cuis.slug)}
                className={cn(
                  " w-[100px] h-9 rounded-xl flex items-center justify-center",
                  exist ? "bg-primary " : "border border-grey"
                )}
              >
                <Text
                  className={cn(
                    "text-sm font-roboto ",
                    exist ? "text-white " : "text-black"
                  )}
                >
                  {cuis.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View className="gap-2">
        <Text className="font-roboto-bold text-xl text-black">
          Delivery Time:
        </Text>
        <RadioButton
          state={delivery === "30mins"}
          setState={() => setDelivery("30mins")}
          text="Under 30mins"
        />
        <RadioButton
          state={delivery === "30-40mins"}
          setState={() => setDelivery("30-40mins")}
          text="30 - 40mins"
        />
        <RadioButton
          state={delivery === "40mins+"}
          setState={() => setDelivery("40mins+")}
          text="40+ mins"
        />
      </View>
      <View className="gap-2">
        <Text className="font-roboto-bold text-xl text-black">Offers:</Text>
        <RadioButton
          state={offers === "free-delivery"}
          setState={() => setOffers("free-delivery")}
          text="Free Delivery"
        />
        <RadioButton
          state={offers === "discount-meals"}
          setState={() => setOffers("discount-meals")}
          text="Discounted meals"
        />
      </View>
      <View className="gap-4 mt-6">
        <RoundedFullButton className="bg-primary">
          <Text className="text-base font-roboto-bold text-white py-4 text-center">
            Apply Filter
          </Text>
        </RoundedFullButton>
        <RoundedFullButton className="bg-transparent border border-primary">
          <Text className="text-base font-roboto-bold text-primary py-4 text-center">
            Apply Filter
          </Text>
        </RoundedFullButton>
      </View>
    </FilterModal>
  );
}
function FilterModal({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose?(): void;
  children: React.ReactNode;
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end   ">
        <ScrollView
          contentContainerClassName="pb-16"
          showsVerticalScrollIndicator={false}
          className="bg-secondary  p-5 pb-16  h-[100%] "
        >
          <View className="flex flex-row items-center justify-between pt-4 pb-2 my-1">
            <RoundedFullButton
              className="bg-grey/5 flex items-center justify-center w-[32px] h-[32px] "
              onPress={onClose}
            >
              <FontAwesome name="angle-left" size={18} color="black" />
            </RoundedFullButton>
            <Text className="font-roboto-bold text-xl text-black">Filter</Text>
            <Pressable className="">
              <Text className="text-black font-roboto-semibold text-base">
                Reset
              </Text>
            </Pressable>
          </View>
          <View className="mt-4 gap-4">{children}</View>
        </ScrollView>
      </View>
    </Modal>
  );
}
