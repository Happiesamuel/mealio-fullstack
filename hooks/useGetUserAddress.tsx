import { getUserAddress } from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserAddress() {
  const { guest } = useUserStorage();
  const {
    data: address,
    status,
    error,
  } = useQuery({
    queryFn: async () => await getUserAddress(guest!.$id),
    queryKey: ["address"],
    enabled: !!guest,
  });
  return { address, status, error };
}
