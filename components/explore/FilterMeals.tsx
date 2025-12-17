import { useCategoriesQuery } from "@/hooks/useCategories";
import cn from "clsx";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import RadioButton from "../ui/RadioButton";
import RoundedFullButton from "../ui/RoundedFullButton";
export default function FilterMeals({
  close,
  params,
}: {
  close(): void;
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
  const { data: categories, status } = useCategoriesQuery();

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

    close();
  }

  return (
    <View className="gap-5 pb-8">
      <View className="gap-2">
        <Text className="font-roboto-bold text-xl text-center text-black">
          Filter By
        </Text>
      </View>
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
        <Text className="font-roboto-bold text-xl text-black">Categories:</Text>
        <View className="flex flex-row flex-wrap gap-2">
          {status === "pending" ? (
            <View className="flex gap-2 items-center justify-center w-full  ">
              <ActivityIndicator size={"large"} color="#14B74D" />
            </View>
          ) : (
            categories.map((cuis: { name: string; id: string }) => {
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
        <RoundedFullButton onPress={() => handleApply()} className="bg-primary">
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
  );
}
