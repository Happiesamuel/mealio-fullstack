import { images } from "@/constnts";
import { Meal } from "@/types";
import { useEffect } from "react";
import { create } from "zustand";

export interface Restaurant {
  id: string;
  name: string;
  description: string;
}

interface Store {
  meals: Meal[];
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
  restaurants: [
    {
      id: "r1",
      name: "Mr Bolat Pizza",
      slug: "mr-bolat-pizza",
      image: images.exploreRestaurantTwo,
      location: "Ikeja, Lagos — 2km away",
      rating: 5,
      description:
        "Freshly baked pizza with premium toppings and bold flavors.",
    },
    {
      id: "r2",
      name: "Mamy's Dishes",
      slug: "mamys-dishes",
      image: images.exploreRestaurantOne,
      location: "Ikeja, Lagos — 2km away",
      rating: 5,
      description:
        "Home-style Nigerian meals made with love and authentic spices.",
    },
    {
      id: "r3",
      name: "Coco Cuisine",
      slug: "coco-cuisine",
      image: images.exploreRestaurantFive,
      location: "Ikeja, Lagos — 2km away",
      rating: 5,
      description:
        "A fusion of continental and African dishes served with elegance.",
    },
    {
      id: "r4",
      name: "Abacha Cuisine",
      slug: "abacha-cuisine",
      image: images.exploreRestaurantThree,
      location: "Ikeja, Lagos — 2km away",
      rating: 5,
      description:
        "Specialized in Eastern Nigerian delicacies, especially Abacha.",
    },
    {
      id: "r5",
      name: "Esther's Kitchen",
      slug: "esthers-kitchen",
      image: images.exploreRestaurantFour,
      location: "Ikeja, Lagos — 2km away",
      rating: 5,
      description: "Healthy meals, refreshing salads, and wholesome dishes.",
    },
  ],

  categories: ["Breakfast", "Lunch", "Dinner", "Dessert", "Drinks", "Snacks"],
  loading: false,
  error: null,

  fetchMeals: async () => {
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
          restaurantId: ["r1", "r2", "r3"][Math.floor(Math.random() * 5)],
          discountPercent: [0, 10, 15, 20][Math.floor(Math.random() * 4)],
          time: `${Math.floor(Math.random() * 30) + 10} mins`,
          description: m.strInstructions || "Delicious meal ready to enjoy!",
          reviews: generateRandomReviews(),
        }));
      });

      const results = await Promise.all(promises);
      const allMeals = results.flat(); // flatten array of arrays

      set({ meals: allMeals, loading: false });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Something went wrong" });
    }
  },
}));

export function useMeals() {
  const meals = useMealStore((s) => s.meals);
  const restaurants = useMealStore((s) => s.restaurants);
  const loading = useMealStore((s) => s.loading);
  const error = useMealStore((s) => s.error);
  const fetchMeals = useMealStore((s) => s.fetchMeals);

  useEffect(() => {
    fetchMeals();
  }, []);

  const popularMeals = meals
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const featuredMeals = meals
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  const mealsForYou = meals
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const todaysOffers = meals.filter((m) => m.discountPercent! > 0).slice(0, 10);

  const discountMeals = todaysOffers;
  const getMealsByRestaurant = (restaurantId: string) => {
    return meals.filter((m) => m.restaurantId === restaurantId);
  };

  return {
    popularMeals,
    featuredMeals,
    mealsForYou,
    todaysOffers,
    discountMeals,
    loading,
    error,
    refetch: fetchMeals,
    getMealsByRestaurant,
  };
}
