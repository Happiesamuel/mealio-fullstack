import { getCurrentUser } from "@/lib/databse";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser() {
  const {
    data: user,
    status,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getCurrentUser();
    },
    staleTime: 1000 * 60 * 10,
  });

  return { user, status, error };
}
