import Banner from "@/components/home/Banner";
import ExploreRestaurant from "@/components/home/ExploreRestaurant";
import HomeHeader from "@/components/home/HomeHeader";
import PopularMeals from "@/components/home/PopularMeals";
import SearchBar from "@/components/home/SearchBar";
import { categories } from "@/constnts/constant";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const params = useLocalSearchParams<{ fil: string }>();
  const [fil, setFil] = useState(params.fil || "all");
  function handlePressFilter(slug: string) {
    setFil(slug);
    router.setParams({ fil: slug });
  }
  return (
    <SafeAreaView className="bg-secondary h-full px-5 pb-28">
      <FlatList
        data={[]}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={() => {}}
        ListHeaderComponent={() => (
          <View style={{ flexDirection: "column", width: "100%" }}>
            <HomeHeader />
            <SearchBar onPress={() => router.push("/search")} />
            <Banner />

            <FlatList
              horizontal
              data={categories}
              extraData={fil}
              initialScrollIndex={0}
              keyExtractor={(item) => item.slug}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handlePressFilter(item.slug)}
                  className={cn(
                    "px-3 py-1 rounded-lg h-fit",
                    fil === item.slug ? "bg-primary" : "bg-[#EEEEEE]"
                  )}
                >
                  <Text
                    className={cn(
                      "font-roboto-semibold text-sm ",
                      fil === item.slug ? "text-white" : "text-[#767676]"
                    )}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              contentContainerClassName="gap-5 my-4 h-fit"
              showsHorizontalScrollIndicator={false}
            />
            <ExploreRestaurant />
            <PopularMeals />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
