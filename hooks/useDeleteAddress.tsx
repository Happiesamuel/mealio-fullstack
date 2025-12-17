import { deleteAddress } from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export default function useDeleteAddress() {
  const queryClient = useQueryClient();
  const { guest } = useUserStorage();
  const {
    mutate: deleteAdd,
    status,
    error,
  } = useMutation({
    mutationFn: (id: string) => deleteAddress(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["address", guest?.$id],
      });
      Toast.show({
        type: "success",
        text1: "Sucess",
        text2: "Address deleted successfully",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Failed to delete address",
        text2: error?.message.toString(),
      });
    },
  });
  return {
    deleteAdd,
    status,
  };
}
