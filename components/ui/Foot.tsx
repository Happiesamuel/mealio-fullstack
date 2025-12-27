import cn from "clsx";
import { Text, View } from "react-native";
export default function Foot({
  title,
  price,
  priceClass,
  titleClass,
}: {
  price: number;
  title: string;
  priceClass: string;
  titleClass: string;
}) {
  return (
    <View className="flex items-center justify-between  flex-row">
      <Text
        className={cn("font-roboto text-black dark:text-white", titleClass)}
      >
        {title}
      </Text>
      <Text
        className={cn(
          "font-roboto-semibold text-black dark:text-white",
          priceClass
        )}
      >
        ₦{price.toFixed(2)}
      </Text>
    </View>
  );
}
