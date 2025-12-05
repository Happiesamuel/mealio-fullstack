import {
  EXPO_PUBLIC_SPOONACULAR_API_KEY,
  EXPO_PUBLIC_SPOONACULAR_BASE_URL,
} from "@env";
const config = {
  spoonacularApiKey: EXPO_PUBLIC_SPOONACULAR_API_KEY,
  spoonacularBaseUrl: EXPO_PUBLIC_SPOONACULAR_BASE_URL,
};

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
      id: ar.idMeal, // use idIngredient
      img: ar.strMealThumb, // ingredient image
    }));
  } catch (err: any) {
    throw err;
  }
}
