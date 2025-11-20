import cn from "clsx";
import React from "react";
import { TouchableOpacity } from "react-native";
export default function RoundedFullButton({
  onPress,
  children,
  className,
}: {
  onPress?(): void;
  children: React.ReactNode;
  className: string;
}) {
  const cla = className.split(" ").find((x) => x.startsWith("w-"));
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn("rounded-full", cla ? cla : "w-full", className)}
    >
      {children}
    </TouchableOpacity>
  );
}
