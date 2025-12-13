import { getCurrentUser } from "@/lib/databse";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser() {
  const {
    data: user,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        return await getCurrentUser();
      } catch (error) {
        throw error;
      }
    },
    retry: false,
    enabled: true,
    staleTime: 1000 * 60 * 10,
  });

  return { user, status, error, refetch };
}
