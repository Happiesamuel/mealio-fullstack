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
    enabled: true,
  });

  return { user, status, error, refetch };
}
