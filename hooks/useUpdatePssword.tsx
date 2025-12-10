import { changePassword } from "@/lib/databse";
import { useMutation } from "@tanstack/react-query";

export default function useUpdatePassword() {
  const {
    mutate: update,
    status,
    error,
  } = useMutation({
    mutationFn: ({
      userId,
      newPassword,
      oldPassword,
    }: {
      userId: string;
      newPassword: string;
      oldPassword: string;
    }) => changePassword(newPassword, oldPassword, userId),
  });

  return { update, status, error };
}
