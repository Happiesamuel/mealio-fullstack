import { validateOTP } from "@/lib/databse";
import { useMutation } from "@tanstack/react-query";

export default function useOtpVerification() {
  const {
    mutate: verify,
    status,
    error,
  } = useMutation({
    mutationFn: ({ userId, otp }: { userId: string; otp: string }) =>
      validateOTP(userId, otp),
  });

  return { verify, status, error };
}
