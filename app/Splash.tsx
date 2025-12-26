import { useEffect } from "react";
import { Image, Text, View } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function Splash({ onFinish }: { onFinish: () => void }) {
  const offsetY = useSharedValue(40);
  const textOpacity = useSharedValue(0);

  const slideX = useSharedValue(60);
  const iconOpacity = useSharedValue(0);

  useEffect(() => {
    // 1. Animate text first
    offsetY.value = withTiming(0, { duration: 800 });
    textOpacity.value = withTiming(1, { duration: 800 }, () => {
      // TEXT FINISHED → start icon animation
      slideX.value = withTiming(0, { duration: 1000 });
      iconOpacity.value = withTiming(1, { duration: 1000 }, () => {
        // ICON FINISHED → notify parent
        runOnJS(onFinish)();
      });
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offsetY.value }],
    opacity: textOpacity.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideX.value }],
    opacity: iconOpacity.value,
  }));

  return (
    <View className="flex-1 justify-center items-center dark:bg-zinc-950 bg-white">
      <Image
        source={require("../assets/images/bg.png")}
        className="absolute w-full h-full opacity-[15%]"
        resizeMode="repeat"
      />

      <View className="flex-row items-center">
        {/* Sliding Icon AFTER text */}
        <Animated.View style={iconStyle}>
          <Image
            source={require("../assets/icons/mealio-icon.png")}
            className="w-[40px] h-[40px]"
            resizeMode="contain"
          />
        </Animated.View>

        {/* Text fades + slides up FIRST */}
        <Animated.View style={animatedStyle}>
          <Text className="font-roboto-semibold text-5xl dark:text-white text-black ml-3">
            mealio
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}
