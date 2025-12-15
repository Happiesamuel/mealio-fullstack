import { emailOTP } from "@/lib/databse";
import { useMutation } from "@tanstack/react-query";

export default function useEmailVerification() {
  const {
    mutate: verify,
    status,
    error,
  } = useMutation({
    mutationFn: ({
      userId,
      otp,
      email,
      password,
    }: {
      userId: string;
      otp: string;
      email: string;
      password: string;
    }) => emailOTP(userId, otp, email, password),
  });

  return { verify, status, error };
}
