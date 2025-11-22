import cn from "clsx";
import { GestureResponderEvent, Pressable, Text, View } from "react-native";
export default function RadioButton({
  text,
  state,
  setState,
}: {
  text?: string;
  state: boolean;
  setState: (event: GestureResponderEvent) => void;
}) {
  return (
    <View className="flex flex-row items-center justify-between">
      {text && <Text className="text-black font-roboto text-base">{text}</Text>}
      <Pressable
        onPress={setState}
        className={cn(
          "size-6 border-2 border-primary rounded-full flex items-center justify-center",
          state ? "bg-primary" : ""
        )}
      >
        {state && <View className="bg-white size-1.5 rounded-full" />}
      </Pressable>
    </View>
  );
}
