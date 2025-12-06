// hooks/useMealSearch.ts
import { fetchMealsBySearch } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { useMealsQuery } from "./useMeals";

export function useMealSearch(query: string) {
  const { meals } = useMealsQuery();
  const {
    data: sim,
    status,
    error,
  } = useQuery({
    queryKey: ["search-meals", query],
    queryFn: () => fetchMealsBySearch(query),
    enabled: !!query, // only fetch if query is not empty
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  const data =
    sim?.map((x: any) => meals.find((y) => y.id === x.id)).filter(Boolean) ||
    [];
  return { data, status, error };
}
