import { getGuestByEmail, getGuestById } from "@/lib/databse";
import { useQuery } from "@tanstack/react-query";

type FetchType = { type: string; value: string };

export default function useGetGuest(params: FetchType) {
  const { data, status, error } = useQuery({
    queryKey: ["guest", params],
    queryFn: () => {
      if (params.type === "email") {
        return getGuestByEmail(params.value);
      } else {
        return getGuestById(params.value);
      }
    },
    staleTime: 1000 * 60 * 10,
    enabled: params.value !== undefined && params.value !== "",
  });

  return { data, status, error };
}
