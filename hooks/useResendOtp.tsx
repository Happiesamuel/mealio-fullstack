import { recreateOtp } from "@/lib/databse";
import { useMutation } from "@tanstack/react-query";

export default function useResendOtp() {
  const {
    mutate: resend,
    status,
    error,
  } = useMutation({
    mutationFn: ({ userId, email }: { userId: string; email: string }) =>
      recreateOtp(email, userId),
  });

  return { resend, status, error };
}
