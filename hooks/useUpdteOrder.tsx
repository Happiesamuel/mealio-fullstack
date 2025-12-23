import { updateOrder } from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateOrd() {
  const { guest } = useUserStorage();
  const queries = useQueryClient();
  const {
    mutate: update,
    status,
    error,
  } = useMutation({
    mutationFn: (obj: { id: string; update: { [keys: string]: string } }) =>
      updateOrder(obj),
    onSuccess: (data) => {
      queries.invalidateQueries({ queryKey: ["orders", guest?.$id] });
    },
  });
  return { update, status, error };
}
