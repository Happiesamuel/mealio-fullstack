import React from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  children?: React.ReactNode;
  onClose: () => void;
}

export default function BottomSheet({ children, onClose }: Props) {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(1, { duration: 250 });
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: (1 - progress.value) * 300 }],
  }));

  return (
    <>
      <Pressable className="absolute inset-0 bg-black/40" onPress={onClose} />

      <Animated.View
        className="absolute bottom-0 w-full bg-[#D4D4D4] p-4 py-6  rounded-t-2xl"
        style={style}
      >
        {children}
      </Animated.View>
    </>
  );
}
