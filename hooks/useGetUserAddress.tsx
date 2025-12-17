import { getUserAddress } from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserAddress() {
  const { guest } = useUserStorage();

  const {
    data: address,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["address", guest?.$id],
    queryFn: () => getUserAddress(guest!.$id),
    enabled: !!guest,
  });

  return { address, status, error, refetch };
}
