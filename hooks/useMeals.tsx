import { fetchMealsApi } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useMealsQuery() {
  const { data, status, error, refetch } = useQuery({
    queryKey: ["meals"],
    queryFn: fetchMealsApi,
  });

  const meals = data ?? [];

  const popularMeals = meals
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  const featuredMeals = meals
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 26);

  const mealsForYou = meals
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const todaysOffers = meals.filter((m) => m.discountPercent! > 0).slice(0, 10);

  return {
    meals,
    popularMeals,
    featuredMeals,
    mealsForYou,
    todaysOffers,
    status,
    error,
    refetch,
  };
}
