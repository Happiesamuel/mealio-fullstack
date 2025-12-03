import { spoonFetch } from "@/lib/action";
import { useEffect } from "react";
import { create } from "zustand";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  pricePerServing: number;
  cookingMinutes?: number;
  preparationMinutes?: number;
}

interface MealStore {
  popular: Recipe[];
  featured: Recipe[];
  forYou: Recipe[];
  offers: any[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
}

export const useMealStore = create<MealStore>((set) => ({
  popular: [],
  featured: [],
  forYou: [],
  offers: [],
  loading: false,
  error: null,
  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const pop = await spoonFetch("/recipes/complexSearch", {
        number: 20,
        sort: "popularity",
        addRecipeInformation: true,
      });
      const feat = await spoonFetch("/recipes/random", { number: 10 });
      const you = await spoonFetch("/recipes/complexSearch", {
        number: 8,
        cuisine: "international",
        addRecipeInformation: true,
      });
      const todayOffers = (feat.recipes || feat)
        .slice(0, 3)
        .map((r: any, i: number) => ({
          id: r.id || i,
          title: r.title,
          image: r.image,
          originalPrice: 1200 + i * 150,
          discountPercent: [10, 15, 20][i % 3],
        }));

      set({
        popular: pop.results || pop,
        featured: feat.recipes || feat,
        forYou: you.results || you,
        offers: todayOffers,
        loading: false,
      });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));

// Usage hook in a component
export function useMeals() {
  const { popular, featured, forYou, offers, loading, error, fetchAll } =
    useMealStore();

  useEffect(() => {
    fetchAll();
  }, []);

  const refetch = () => fetchAll();

  return { popular, featured, forYou, offers, loading, error, refetch };
}
