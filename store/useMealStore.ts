import { exploreRest } from "@/constnts/constant";
import { Meal, Restaurant } from "@/types";
import { useEffect } from "react";
import { create } from "zustand";

interface Store {
  meals: Meal[];
  popularMeals: Meal[];
  featuredMeals: Meal[];
  mealsForYou: Meal[];
  todaysOffers: Meal[];
  restaurants: Restaurant[];
  categories: string[];
  loading: boolean;
  error: string | null;

  fetchMeals: () => Promise<void>;
}
function generateRandomReviews() {
  const sampleUsers = ["Samuel", "Jane", "Ugo", "Michael", "Grace", "Tunde"];
  const sampleComments = [
    "Amazing meal, tastes great!",
    "Very delicious and well cooked.",
    "Not bad, enjoyed it.",
    "Loved the flavor!",
    "Could be better but okay.",
    "Perfect dish! Will order again.",
  ];

  const count = Math.floor(Math.random() * 4) + 1; // 1–4 reviews

  return Array.from({ length: count }).map((_, i) => ({
    id: Math.random().toString(36).slice(2),
    user: sampleUsers[Math.floor(Math.random() * sampleUsers.length)],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    comment: sampleComments[Math.floor(Math.random() * sampleComments.length)],
    date: new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 5
    ).toISOString(), // last 5 days
  }));
}

export const useMealStore = create<Store>((set, get) => ({
  meals: [],
  popularMeals: [],
  featuredMeals: [],
  mealsForYou: [],
  todaysOffers: [],
  restaurants: exploreRest,

  categories: ["Breakfast", "Lunch", "Dinner", "Dessert", "Drinks", "Snacks"],
  loading: false,
  error: null,

  fetchMeals: async () => {
    if (get().meals.length > 0) return;
    set({ loading: true, error: null });
    try {
      const letters = "abcdefghijklmnopqrstuvwxyz".split("");

      // Map each letter to a fetch Promise
      const promises = letters.map(async (letter) => {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
        );
        if (!res.ok) throw new Error(`Failed to fetch letter ${letter}`);
        const data = await res.json();
        if (!data.meals) return [];
        return data.meals.map((m: any) => ({
          id: m.idMeal,
          title: m.strMeal,
          category: m.strCategory,
          area: m.strArea,
          image: m.strMealThumb,
          price: Math.floor(Math.random() * 2000) + 500,
          rating: parseFloat((Math.random() * 5).toFixed(1)),
          restaurantId: ["r1", "r2", "r3", "r4", "r5"][
            Math.floor(Math.random() * 5)
          ],
          discountPercent: [0, 10, 15, 20][Math.floor(Math.random() * 4)],
          time: `${Math.floor(Math.random() * 30) + 10} mins`,
          description: m.strInstructions || "Delicious meal ready to enjoy!",
          reviews: generateRandomReviews(),
        }));
      });

      const results = await Promise.all(promises);
      const allMeals = results.flat(); // flatten array of arrays

      set({ meals: allMeals, loading: false });
      set({
        popularMeals: get()
          .meals.slice()
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 10),
        loading: false,
      });
      set({
        featuredMeals: get()
          .meals.slice()
          .sort(() => 0.5 - Math.random())
          .slice(0, 10),
        loading: false,
      });
      set({
        mealsForYou: get()
          .meals.slice()
          .sort(() => 0.5 - Math.random())
          .slice(0, 4),
        loading: false,
      });
      set({
        todaysOffers: get()
          .meals.filter((m) => m.discountPercent! > 0)
          .slice(0, 10),
        loading: false,
      });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Something went wrong" });
    }
  },
}));

export function useMeals() {
  const meals = useMealStore((s) => s.meals);
  const popularMeals = useMealStore((s) => s.popularMeals);
  const featuredMeals = useMealStore((s) => s.featuredMeals);
  const mealsForYou = useMealStore((s) => s.mealsForYou);
  const todaysOffers = useMealStore((s) => s.todaysOffers);
  const restaurants = useMealStore((s) => s.restaurants);
  const loading = useMealStore((s) => s.loading);
  const error = useMealStore((s) => s.error);
  const fetchMeals = useMealStore((s) => s.fetchMeals);

  useEffect(() => {
    fetchMeals();
  }, []);

  const getMealsByRestaurant = (restaurantId: string) => {
    return meals.filter((m) => m.restaurantId === restaurantId);
  };

  return {
    popularMeals,
    featuredMeals,
    mealsForYou,
    todaysOffers,
    loading,
    error,
    refetch: fetchMeals,
    getMealsByRestaurant,
    restaurants,
    meals,
  };
}
