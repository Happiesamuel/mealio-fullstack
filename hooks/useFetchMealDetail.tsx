import { fetchMealDetailApi } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useMealDetailQuery(mealId: string) {
  const { data, status, error } = useQuery({
    queryKey: ["meal-detail", mealId],
    queryFn: () => fetchMealDetailApi(mealId),
    enabled: !!mealId,
  });
  return { data, status, error };
}
