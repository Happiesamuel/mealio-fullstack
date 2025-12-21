import { createAdress } from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { AddressProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateAddress() {
  const queries = useQueryClient();
  const { guest } = useUserStorage();
  const {
    mutate: create,
    status,
    error,
  } = useMutation({
    mutationFn: (obj: AddressProps) => createAdress(obj),
    onSuccess: () => {
      queries.invalidateQueries({ queryKey: ["address", guest?.$id] });
    },
  });

  return { create, status, error };
}
