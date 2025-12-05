import { exploreRest } from "@/constnts/constant";
import { Restaurant } from "@/types";
import { create } from "zustand";
interface Store {
  restaurants: Restaurant[];
}
export const useMealStore = create<Store>((set) => ({
  selectedFilters: {
    pricing: null,
    rating: null,
    sort: null,
    categories: [],
  },
  restaurants: exploreRest,
}));
export function useZustMeals() {
  const restaurants = useMealStore((s) => s.restaurants);

  return {
    restaurants,
  };
}
