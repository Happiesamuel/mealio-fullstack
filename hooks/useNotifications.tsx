import { createNotification, getNotifications } from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { Notification } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCrateNotification() {
  const queries = useQueryClient();
  const { guest } = useUserStorage();
  const {
    mutate: create,
    status,
    error,
  } = useMutation({
    mutationFn: (obj: Notification) => createNotification(obj),
    onSuccess: () => {
      queries.invalidateQueries({ queryKey: ["notifications", guest?.$id] });
    },
  });
  return { create, status, error };
}

export function useGetNotification() {
  const { guest } = useUserStorage();

  const {
    data: notifications,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["notifications", guest?.$id],
    queryFn: () => getNotifications(guest!.$id),
    enabled: !!guest,
  });

  return { notifications, status, error, refetch };
}
