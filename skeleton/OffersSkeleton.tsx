import { useTheme } from "@/context/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

export function OffersSkeleton() {
  const { isDark } = useTheme();
  return (
    <View style={{ width: 140 }} className="gap-2">
      <View className="relative">
        <Skeleton
          width={140}
          height={130}
          colorMode={isDark ? "dark" : "light"}
          radius={12}
          // backgroundColor="#E5E5E5"
        />

        <View className="absolute inset-0 flex items-center justify-center">
          <View
            style={{
              width: 40,
              height: 40,
              borderWidth: 2,
              borderColor: isDark ? "rgb(255 255 255 / 0.5)" : "white",
              borderRadius: "100%",
            }}
            className="rounded-full items-center  justify-center border-2 border-white"
          >
            <Ionicons name="restaurant" size={20} color="#ffffff" />
          </View>
        </View>
      </View>
    </View>
  );
}
