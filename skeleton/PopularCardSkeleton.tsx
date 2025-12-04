import { Ionicons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

export function PopularCardSkeleton() {
  return (
    <View style={{ width: 220 }} className="gap-2">
      <View className="relative">
        <Skeleton
          width={220}
          height={130}
          colorMode="light"
          radius={12}
          backgroundColor="#E5E5E5"
        />

        <View className="absolute inset-0 flex items-center justify-center">
          <View
            style={{
              width: 40,
              height: 40,
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
