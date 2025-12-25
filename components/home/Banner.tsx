import { images } from "@/constnts";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import RoundedFullButton from "../ui/RoundedFullButton";
type BannerType = {
  image: any;
  title: string;
  desc: string;
};

interface SlideProps {
  item: BannerType;
  animationValue: SharedValue<number>;
}

const { width } = Dimensions.get("window");

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const banners = [
    {
      image: images.bannerOne,
      title: "Free Delivery Today",
      desc: "Order your favorite meals today and enjoy free delivery with no hidden charges!",
    },
    {
      image: images.bannerTwo,
      title: "20% Off All Meals",
      desc: "Enjoy 20% off all meals today! Delicious dishes at amazing prices for a limited time.",
    },
    {
      image: images.bannerThree,
      title: "New Weekly Specials",
      desc: "Try our chef-curated weekly specials, prepared fresh to excite your taste buds!",
    },
    {
      image: images.bannerFour,
      title: "Healthy Choices Made Easy",
      desc: "Nutritious and flavorful meals made simple. Eat well without compromising on taste.",
    },
    {
      image: images.bannerFive,
      title: "Family Feast Deals",
      desc: "Feed the whole family with our special deals! Generous portions at unbeatable prices.",
    },
  ];

  return (
    <View className="w-full h-[170px]">
      <Carousel
        width={width - 22} // full screen width
        height={170}
        data={banners}
        loop
        autoPlay
        autoPlayInterval={3000}
        scrollAnimationDuration={800}
        onSnapToItem={(index) => setActiveIndex(index)}
        snapEnabled={true} // ensures one banner per screen
        renderItem={({ item, animationValue }) => (
          <BannerSlide item={item} animationValue={animationValue} />
        )}
      />
      <View className="absolute bottom-1.5 w-full flex-row justify-center gap-2">
        {banners.map((_, index) => (
          <View
            key={index}
            className={`w-1.5 h-1.5 rounded-full ${
              index === activeIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </View>
    </View>
  );
}
function BannerSlide({ item, animationValue }: SlideProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animationValue.value,
      [-1, 0, 1],
      [0.4, 1, 0.4]
    );
    const scale = interpolate(animationValue.value, [-1, 0, 1], [0.9, 1, 0.9]);

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[animatedStyle]} className="h-full ">
      <View className="h-full w-full overflow-hidden relative">
        <Image
          source={item.image}
          className="absolute inset-0 w-full h-full rounded-3xl"
          resizeMode="cover"
        />

        <View className="bg-[#000000]/30 absolute size-full rounded-3xl" />

        <View className="absolute bottom-9 left-4 w-full gap-3.5 ">
          <View className="gap-2">
            <Text className="text-sm font-roboto-bold text-white w-[60%]">
              {item.title}
            </Text>
            <Text className="text-[10px] font-roboto  text-secondary w-[60%] ">
              {item.desc}
            </Text>
          </View>

          <View className="w-[40%] ">
            <RoundedFullButton
              className="bg-white"
              onPress={() => router.push("/explore")}
            >
              <Text className="text-sm font-roboto-bold  text-center text-primary py-2 px-4.5">
                Order Now
              </Text>
            </RoundedFullButton>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}
