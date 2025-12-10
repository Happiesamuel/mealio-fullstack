import { Meal } from "@/types";
import { randomReviews } from "./helper";

export async function fetchMealsByArea({ area }: { area: string }) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    if (!res.ok) throw new Error("Failed to fetch ingredients");

    const data = await res.json();

    if (!data.meals) {
      return;
    }

    return data.meals.map((ar: any) => ({
      name: ar.strMeal,
      restaurantId: ["r1", "r2", "r3", "r4", "r5"][
        Math.floor(Math.random() * 5)
      ],
      id: ar.idMeal, // use idIngredient
      img: ar.strMealThumb, // ingredient image
    }));
  } catch (err: any) {
    throw err;
  }
}
export async function fetchMealsByCat({ cat }: { cat: string }) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
    );
    if (!res.ok) throw new Error("Failed to fetch category");

    const data = await res.json();

    if (!data.meals) {
      return;
    }

    return data.meals.map((ar: any) => ({
      name: ar.strMeal,
      restaurantId: ["r1", "r2", "r3", "r4", "r5"][
        Math.floor(Math.random() * 5)
      ],
      id: ar.idMeal, // use idIngredient
      img: ar.strMealThumb, // ingredient image
    }));
  } catch (err: any) {
    throw err;
  }
}
export async function fetchMealsApi() {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const requests = letters.map(async (l) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`
    );
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
      reviews: randomReviews(),
    }));
  });

  return (await Promise.all(requests)).flat();
}
export async function fetchIngredientsApi() {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const data = await res.json();

  return (
    data.meals?.map((ing: any) => ({
      id: ing.idIngredient,
      name: ing.strIngredient,
      img: ing.strThumb,
      type: ing.strType,
    })) ?? []
  );
}
export async function fetchCategoriesApi() {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const data = await res.json();

  return (
    data.categories?.map((c: any) => ({
      id: c.idCategory,
      name: c.strCategory,
      img: c.strCategoryThumb,
    })) ?? []
  );
}
export async function fetchMealDetailApi(mealId: string) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await res.json();

  const meal = data.meals?.[0];
  if (!meal) return null;

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    description: meal.strInstructions,
    image: meal.strMealThumb,
    price: Math.floor(Math.random() * 2000) + 500, // optional
    rating: parseFloat((Math.random() * 5).toFixed(1)), // optional
    restaurantId: ["r1", "r2", "r3", "r4", "r5"][Math.floor(Math.random() * 5)],
    reviews: randomReviews(),
    discountPercent: [0, 10, 15, 20][Math.floor(Math.random() * 4)], // optional
    time: `${Math.floor(Math.random() * 30) + 10} mins`,
    ingredients: Array.from({ length: 20 })
      .map((_, i) => ({
        ingredient: meal[`strIngredient${i + 1}`],
        measure: meal[`strMeasure${i + 1}`],
      }))
      .filter((x) => x.ingredient && x.ingredient.trim() !== ""),
  };
}
export async function fetchMealsBySearch(query: string): Promise<Meal[]> {
  if (!query) return [];

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  if (!res.ok) throw new Error("Failed to fetch meals");

  const data = await res.json();
  if (!data.meals) return [];

  // Format meals like your existing meals
  return data.meals.map((m: any) => ({
    id: m.idMeal,
    title: m.strMeal,
    category: m.strCategory,
    area: m.strArea,
    image: m.strMealThumb,
    price: Math.floor(Math.random() * 2000) + 500,
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    restaurantId: ["r1", "r2", "r3", "r4", "r5"][Math.floor(Math.random() * 5)],
    discountPercent: [0, 10, 15, 20][Math.floor(Math.random() * 4)],
    time: `${Math.floor(Math.random() * 30) + 10} mins`,
    description: m.strInstructions || "Delicious meal ready to enjoy!",
    reviews: randomReviews(),
  }));
}
