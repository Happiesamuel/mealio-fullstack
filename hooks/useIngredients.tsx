import { fetchIngredientsApi } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useIngredientsQuery() {
  const { data, status, error } = useQuery({
    queryKey: ["ingredients"],
    queryFn: fetchIngredientsApi,
  });
  return { data, status, error };
}
