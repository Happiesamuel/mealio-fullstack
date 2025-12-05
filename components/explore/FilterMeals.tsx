import { useMeals } from "@/store/useMealStore";
import cn from "clsx";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RadioButton from "../ui/RadioButton";
import RoundedFullButton from "../ui/RoundedFullButton";
export default function FilterMeals() {
  const [pricing, setPricing] = useState<string | null>(null);
  const [rating, setRating] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const [cusines, setCusines] = useState<string[]>([]);
  const { categories } = useMeals();
  function handleCuisine(cuis: string) {
    const exist = cusines.some((x) => x === cuis);
    if (exist) {
      setCusines((i) => [...i.filter((x) => x !== cuis)]);
    } else {
      setCusines((i) => [...i, cuis]);
    }
  }
  return (
    <View className="gap-5">
      <View className="gap-2">
        <Text className="font-roboto-bold text-xl text-center text-black">
          Filter By
        </Text>
      </View>
      <View className="gap-2">
        <Text className="font-roboto-bold text-xl text-black">Pricing: </Text>
        <RadioButton
          state={pricing === "desc"}
          setState={() => setPricing("desc")}
          text="High  -  Low"
        />
        <RadioButton
          state={pricing === "asc"}
          setState={() => setPricing("asc")}
          text="Low  -  High"
        />
      </View>
      <View className="gap-2">
        <Text className="font-roboto-bold text-xl text-black">Ratings: </Text>
        <RadioButton
          state={rating === "desc"}
          setState={() => setRating("desc")}
          text="High  -  Low"
        />
        <RadioButton
          state={rating === "asc"}
          setState={() => setRating("asc")}
          text="Low  -  High"
        />
      </View>
      <View className="gap-2">
        <Text className="font-roboto-bold text-xl text-black">Categories:</Text>
        <View className="flex flex-row flex-wrap gap-2">
          {categories.map((cuis) => {
            const exist = cusines.some((x) => x === cuis.id);
            return (
              <TouchableOpacity
                key={cuis.id}
                onPress={() => handleCuisine(cuis.id)}
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
        <Text className="font-roboto-bold text-xl text-black">Sort:</Text>
        <RadioButton
          state={sort === "asc"}
          setState={() => setSort("asc")}
          text="A - Z (a - z)"
        />
        <RadioButton
          state={sort === "desc"}
          setState={() => setSort("desc")}
          text="Z - A (z - a)"
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
            Cancel
          </Text>
        </RoundedFullButton>
      </View>
    </View>
  );
}
