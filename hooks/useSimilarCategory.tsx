import { fetchMealsByArea, fetchMealsByCat } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export function useSimmilarCategory(cat: string, type: string) {
  const { data, status, error } = useQuery({
    queryKey: ["similar-category", cat],
    queryFn: () =>
      type === "cat"
        ? fetchMealsByCat({ cat })
        : fetchMealsByArea({ area: cat }),
    enabled: !!cat,
  });
  return { data, status, error };
}
