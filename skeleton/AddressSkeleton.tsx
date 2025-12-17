import { Skeleton } from "moti/skeleton";
import React from "react";

export default function AddressSkeleton() {
  return (
    <Skeleton
      width={"100%"}
      height={100}
      colorMode="light"
      radius={4}
      backgroundColor="#E5E5E5"
    />
  );
}
