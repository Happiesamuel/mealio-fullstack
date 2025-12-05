import { fetchCategoriesApi } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useCategoriesQuery() {
  const { data, status, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesApi,
  });
  return { data, status, error };
}
