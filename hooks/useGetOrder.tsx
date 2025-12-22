import { getUserOrder } from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { useQuery } from "@tanstack/react-query";

export default function useGetOrder() {
  const { guest } = useUserStorage();

  const {
    data: orders,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders", guest?.$id],
    queryFn: () => getUserOrder(guest!.$id),
    enabled: !!guest,
  });

  return { orders, status, error, refetch };
}
