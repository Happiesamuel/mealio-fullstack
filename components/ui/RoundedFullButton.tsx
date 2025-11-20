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
  return (
    <TouchableOpacity
      onPress={onPress}
      className={cn(" rounded-full w-full", className)}
    >
      {children}
    </TouchableOpacity>
  );
}
