import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollOffset,
} from "react-native-reanimated";

const HEADER_HEIGHT = 260;

type Props = PropsWithChildren<{
  headerImage: ReactElement; // This will be your ImageBackground
}>;

export default function ParallaxScrollView({ children, headerImage }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);

  // animate image on scroll
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#fff" }}
      className={"relative"}
    >
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
        {headerImage}
      </Animated.View>

      <Animated.View className={""} style={styles.content}>
        {children}
      </Animated.View>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    width: "100%",
    overflow: "hidden",
  },
  content: {
    paddingTop: 20,
    borderRadius: 30,
  },
});
