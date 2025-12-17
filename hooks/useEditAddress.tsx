import { updateAddress } from "@/lib/databse";
import { useUserStorage } from "@/store/useUserStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export default function useEditAddress() {
  const queryClient = useQueryClient();
  const { guest } = useUserStorage();
  const {
    mutate: updteAdd,
    status,
    error,
  } = useMutation({
    mutationFn: ({
      addressId,
      data,
    }: {
      addressId: string;
      data: Record<string, any>;
    }) => updateAddress(addressId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["address", guest?.$id],
      });
      Toast.show({
        type: "success",
        text1: "Sucess",
        text2: "Address updated successfully",
      });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Failed to update address",
        text2: error?.message.toString(),
      });
    },
  });
  return {
    updteAdd,
    status,
  };
}
