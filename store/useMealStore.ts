import { exploreRest } from "@/constnts/constant";
import { Categories, Ingredients, Meal, MealDetail, Restaurant } from "@/types";
import { useEffect } from "react";
import { create } from "zustand";

interface Store {
  meals: Meal[];
  popularMeals: Meal[];
  featuredMeals: Meal[];
  mealsForYou: Meal[];
  todaysOffers: Meal[];
  restaurants: Restaurant[];
  ingredients: Ingredients[];
  categories: Categories[];
  loading: boolean;
  error: string | null;
  fetchMeals: () => Promise<void>;
  fetchIngredients: () => Promise<void>;
  fetchMealDetail: (mealId: string) => Promise<MealDetail | undefined>;
  fetchCategories: () => Promise<void>;
}
const placeholderAvatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
];

const sampleUsers = ["Samuel", "Jane", "Ugo", "Chika", "Tolu", "Grace"];

const sampleComments = [
  "Amazing meal, tastes great!",
  "Really enjoyed this dish.",
  "Could be better, but still good.",
  "Perfect flavors and well cooked!",
  "Will definitely order again.",
];

function generateRandomReviews(count = 5) {
  return Array.from({ length: count }).map((_, idx) => ({
    id: `rev-${Date.now()}-${idx}`, // unique id
    user: sampleUsers[Math.floor(Math.random() * sampleUsers.length)],
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    comment: sampleComments[Math.floor(Math.random() * sampleComments.length)],
    date: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString(), // random recent date
    avatar:
      placeholderAvatars[Math.floor(Math.random() * placeholderAvatars.length)],
  }));
}

export const useMealStore = create<Store>((set, get) => ({
  meals: [],
  popularMeals: [],
  featuredMeals: [],
  mealsForYou: [],
  todaysOffers: [],
  restaurants: exploreRest,
  ingredients: [],

  categories: [],
  loading: false,
  error: null,

  fetchMeals: async () => {
    if (get().meals.length > 0) return;
    set({ loading: true, error: null });
    try {
      const letters = "abcdefghijklmnopqrstuvwxyz".split("");

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
          reviews: generateRandomReviews(5),
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
  fetchIngredients: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
      );
      if (!res.ok) throw new Error("Failed to fetch ingredients");

      const data = await res.json();

      if (!data.meals) {
        set({ loading: false, ingredients: [] });
        return;
      }

      const ings = data.meals.map((ing: any) => ({
        name: ing.strIngredient,
        id: ing.idIngredient, // use idIngredient
        img: ing.strThumb, // ingredient image
        type: ing.strType,
      }));

      set({
        ingredients: ings,
        loading: false,
      });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Something went wrong" });
    }
  },
  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/categories.php`
      );
      if (!res.ok) throw new Error("Failed to fetch  categories");

      const data = await res.json();

      if (!data.categories) {
        set({ loading: false, ingredients: [] });
        return;
      }

      const cats = data.categories.map((ing: any) => ({
        name: ing.strCategory,
        id: ing.idCategory, // use idIngredient
        img: ing.strCategoryThumb, // ingredient image
      }));

      set({
        categories: cats,
        loading: false,
      });
    } catch (err: any) {
      set({ loading: false, error: err.message || "Something went wrong" });
    }
  },

  fetchMealDetail: async (mealId: string): Promise<MealDetail | undefined> => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      if (!res.ok) throw new Error("Failed to fetch meal details");
      const data = await res.json();
      if (!data.meals || data.meals.length === 0) {
        set({ loading: false });
        return;
      }

      const meal = data.meals[0];

      const formattedMeal = {
        id: meal.idMeal,
        title: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        description: meal.strInstructions,
        image: meal.strMealThumb,
        price: Math.floor(Math.random() * 2000) + 500, // optional
        rating: parseFloat((Math.random() * 5).toFixed(1)), // optional
        restaurantId: ["r1", "r2", "r3", "r4", "r5"][
          Math.floor(Math.random() * 5)
        ],
        reviews: generateRandomReviews(5),
        discountPercent: [0, 10, 15, 20][Math.floor(Math.random() * 4)], // optional
        time: `${Math.floor(Math.random() * 30) + 10} mins`,
        ingredients: Array.from({ length: 20 })
          .map((_, i) => ({
            ingredient: meal[`strIngredient${i + 1}`],
            measure: meal[`strMeasure${i + 1}`],
          }))
          .filter((x) => x.ingredient && x.ingredient.trim() !== ""),
      };

      set({ loading: false });
      return formattedMeal;
    } catch (err: any) {
      set({ loading: false, error: err.message || "Something went wrong" });
    }
  },
}));

export function useMeals() {
  const meals = useMealStore((s) => s.meals);
  const categories = useMealStore((s) => s.categories);
  const popularMeals = useMealStore((s) => s.popularMeals);
  const featuredMeals = useMealStore((s) => s.featuredMeals);
  const mealsForYou = useMealStore((s) => s.mealsForYou);
  const todaysOffers = useMealStore((s) => s.todaysOffers);
  const restaurants = useMealStore((s) => s.restaurants);
  const loading = useMealStore((s) => s.loading);
  const error = useMealStore((s) => s.error);
  const fetchMeals = useMealStore((s) => s.fetchMeals);
  const fetchMealDetail = useMealStore((s) => s.fetchMealDetail);
  const fetchCategories = useMealStore((s) => s.fetchCategories);
  const ingredients = useMealStore((s) => s.ingredients);
  const fetchIngredients = useMealStore((s) => s.fetchIngredients);

  useEffect(() => {
    fetchIngredients();
  }, []);
  useEffect(() => {
    fetchMeals();
  }, []);
  useEffect(() => {
    fetchCategories();
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
    ingredients,
    restaurants,
    meals,
    fetchMealDetail,
    categories,
  };
}
