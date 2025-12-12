import { useCategoriesQuery } from "@/hooks/useCategories";
import { FontAwesome } from "@expo/vector-icons";
import cn from "clsx";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
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
  close,
  params,
}: {
  visible: boolean;
  close?(): void;
  params: {
    pricing: string;
    rating: string;
    sort: string;
    categories: string;
  };
}) {
  const [pricing, setPricing] = useState<string | null>(params.pricing || null);
  const [rating, setRating] = useState<string | null>(params.rating || null);
  const [sort, setSort] = useState<string | null>(params.sort || null);
  const [cusines, setCusines] = useState<string[]>(
    params.categories ? JSON.parse(params.categories) : []
  );
  const { data: categories, status, error } = useCategoriesQuery();

  function handleCuisine(cuis: string) {
    const exist = cusines.some((x) => x === cuis);
    if (exist) {
      setCusines((i) => [...i.filter((x) => x !== cuis)]);
    } else {
      setCusines((i) => [...i, cuis]);
    }
  }
  function handleApply() {
    const newParams: any = {};

    if (pricing && pricing !== "") {
      newParams.pricing = pricing;
    } else {
      newParams.pricing = undefined;
    }

    if (rating && rating !== "") {
      newParams.rating = rating;
    } else {
      newParams.rating = undefined;
    }

    if (sort && sort !== "") {
      newParams.sort = sort;
    } else {
      newParams.sort = undefined;
    }

    if (cusines.length > 0) {
      newParams.categories = JSON.stringify(cusines);
    } else {
      newParams.categories = undefined;
    }

    router.setParams(newParams);

    close?.();
  }
  if (error) return null;
  return (
    <FilterModal visible={visible} onClose={close}>
      <View className="gap-2">
        <View className="gap-2">
          <Text className="font-roboto-bold text-xl text-black">Pricing: </Text>
          <RadioButton
            state={pricing === "desc"}
            setState={() => {
              return pricing === "desc" ? setPricing(null) : setPricing("desc");
            }}
            text="High  -  Low"
          />
          <RadioButton
            state={pricing === "asc"}
            setState={() => {
              return pricing === "asc" ? setPricing(null) : setPricing("asc");
            }}
            text="Low  -  High"
          />
        </View>
        <View className="gap-2">
          <Text className="font-roboto-bold text-xl text-black">Ratings: </Text>
          <RadioButton
            state={rating === "desc"}
            setState={() => {
              return rating === "desc" ? setRating(null) : setRating("desc");
            }}
            text="High  -  Low"
          />
          <RadioButton
            state={rating === "asc"}
            setState={() => {
              return rating === "asc" ? setRating(null) : setRating("asc");
            }}
            text="Low  -  High"
          />
        </View>
        <View className="gap-2">
          <Text className="font-roboto-bold text-xl text-black">
            Categories:
          </Text>
          <View className="flex flex-row flex-wrap gap-2">
            {status === "pending" ? (
              <View className="flex gap-2 items-center justify-center w-full  ">
                <ActivityIndicator size={"large"} color="#14B74D" />
              </View>
            ) : (
              categories?.map((cuis: { name: string; id: string }) => {
                const exist = cusines.some((x) => x === cuis.name);
                return (
                  <TouchableOpacity
                    key={cuis.id}
                    onPress={() => handleCuisine(cuis.name)}
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
              })
            )}
          </View>
        </View>
        <View className="gap-2">
          <Text className="font-roboto-bold text-xl text-black">Sort:</Text>
          <RadioButton
            state={sort === "asc"}
            setState={() => {
              return sort === "asc" ? setSort(null) : setSort("asc");
            }}
            text="A - Z (a - z)"
          />
          <RadioButton
            state={sort === "desc"}
            setState={() => {
              return sort === "desc" ? setSort(null) : setSort("desc");
            }}
            text="Z - A (z - a)"
          />
        </View>

        <View className="gap-4 mt-6">
          <RoundedFullButton
            onPress={() => handleApply()}
            className="bg-primary"
          >
            <Text className="text-base font-roboto-bold text-white py-4 text-center">
              Apply Filter
            </Text>
          </RoundedFullButton>
          <RoundedFullButton
            onPress={close}
            className="bg-transparent border border-primary"
          >
            <Text className="text-base font-roboto-bold text-primary py-4 text-center">
              Cancel
            </Text>
          </RoundedFullButton>
        </View>
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
