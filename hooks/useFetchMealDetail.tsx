import { fetchMealDetailApi } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { useMealsQuery } from "./useMeals";

export function useMealDetailQuery(mealId: string) {
  const { meals, status: mealStatus } = useMealsQuery();

  const {
    data: res,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["meal-detail", mealId],
    queryFn: () => fetchMealDetailApi(mealId),
    enabled: !!mealId && mealStatus === "success",
  });

  const dataFromList = meals?.find((m) => m.id === mealId);
  const data = {
    ...res,
    price: dataFromList?.price ?? res?.price ?? 2,
  };

  return { data, status, error, refetch };
}
