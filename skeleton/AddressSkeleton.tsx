import { useTheme } from "@/context/ThemeProvider";
import { Skeleton } from "moti/skeleton";
import React from "react";

export default function AddressSkeleton() {
  const { isDark } = useTheme();
  return (
    <Skeleton
      width={"100%"}
      height={100}
      colorMode={isDark ? "light" : "light"}
      radius={4}
      backgroundColor="#E5E5E5"
    />
  );
}
