import { createOrder } from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { Order } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateOrder() {
  const queries = useQueryClient();
  const { guest } = useUserStorage();
  const {
    mutate: create,
    status,
    error,
  } = useMutation({
    mutationFn: (obj: Order) => createOrder(obj),
    onSuccess: () => {
      queries.invalidateQueries({ queryKey: ["orders", guest?.$id] });
    },
  });

  return { create, status, error };
}
