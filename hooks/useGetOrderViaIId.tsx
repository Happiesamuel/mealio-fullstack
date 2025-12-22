import { getOrder, getOrderAddress } from "@/lib/databse";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

export function useGetOrderViaIId() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  const {
    data: orders,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId,
  });

  return { orders, status, error, refetch };
}
export function useOrderAddress() {
  const { orders } = useGetOrderViaIId();
  const add = orders?.at(0)?.orderAddress;
  const {
    data: address,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["orders", add],
    queryFn: () => getOrderAddress(add),
    enabled: !!add,
  });

  return { address, status, error, refetch };
}
