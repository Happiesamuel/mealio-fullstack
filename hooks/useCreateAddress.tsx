import { createAdress } from "@/lib/databse";
import { AddressProps } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useCreateAddress() {
  const {
    mutate: create,
    status,
    error,
  } = useMutation({
    mutationFn: (obj: AddressProps) => createAdress(obj),
  });

  return { create, status, error };
}
