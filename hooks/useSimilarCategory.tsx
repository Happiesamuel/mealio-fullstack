import { fetchMealsByArea, fetchMealsByCat } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { useMealsQuery } from "./useMeals";

export function useSimilarCategory(cat: string, type: "cat" | "area") {
  const { meals, status: mealStatus } = useMealsQuery();

  const {
    data: sim,
    status,
    error,
  } = useQuery({
    queryKey: ["similar-category", cat],
    queryFn: () =>
      type === "cat"
        ? fetchMealsByCat({ cat })
        : fetchMealsByArea({ area: cat }),
    enabled: !!cat && mealStatus === "success",
  });

  const data =
    sim
      ?.slice(0, 10)
      .map((x: any) => meals.find((y) => y.id === x.id))
      .filter(Boolean) || [];
  return { data, status, error };
}
