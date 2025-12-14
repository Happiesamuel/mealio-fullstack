import { updateDoc } from "@/lib/databse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export default function useUpdate() {
  const queries = useQueryClient();
  const {
    mutate: update,
    status,
    error,
  } = useMutation({
    mutationFn: (obj) => updateDoc(obj),
    onSuccess: () => {
      queries.invalidateQueries({ queryKey: ["guest"] });
      Toast.show({
        type: "success",
        text1: "Updated successful",
        text2: "You've updated successsfully ",
      });
    },
  });
  return { update, status, error };
}
