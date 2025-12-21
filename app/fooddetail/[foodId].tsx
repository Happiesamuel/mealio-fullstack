import DetailsBio from "@/components/food-details/DetailsBio";
import DetailsHeader from "@/components/food-details/DetailsHeader";
import IngredientsDet from "@/components/food-details/Ingredients";
import SimalarCategory from "@/components/food-details/SimalarCategory";
import SimilarArea from "@/components/food-details/SimilarArea";
import RestaurantReviews from "@/components/restaurantDetails/RestaurantReviews";
import Error from "@/components/ui/Error";
import RoundedFullButton from "@/components/ui/RoundedFullButton";
import useAllCart from "@/hooks/useAllCart";
import { useMealDetailQuery } from "@/hooks/useFetchMealDetail";
import { useIngredientsQuery } from "@/hooks/useIngredients";
import { useZustMeals } from "@/store/useMealStore";
import { Ingredients, MealDetail, RestaurantReview } from "@/types";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function FoodDetail() {
  const { foodId, res: resId } = useLocalSearchParams<{
    foodId: string;
    res: string;
  }>();
  const { restaurants } = useZustMeals();

  const {
    data: mealDetail,
    status: mealStatus,
    error,
    refetch,
  } = useMealDetailQuery(foodId);
  const { isInCart, handleQuantity, handleCart, quan, status, quanStat } =
    useAllCart(mealDetail as MealDetail);
  const { data: ingredients, status: ingStatus } = useIngredientsQuery();
  const [active, setActive] = useState<string | null>(null);

  if (mealStatus === "pending" || ingStatus === "pending")
    return (
      <SafeAreaView
        edges={["top"]}
        className="bg-secondary px-3 h-full pb-safe"
      >
        <DetailsHeader />
        <View className="flex flex-1 gap-2 items-center justify-center w-full  ">
          <ActivityIndicator size={"large"} color="#14B74D" />
          <Text className="text-grey text-sm font-roboto">Loading Details</Text>
        </View>
      </SafeAreaView>
    );

  const res = restaurants.find((x) => x.id === resId);
  const ings = mealDetail?.ingredients!.map((x) =>
    ingredients.find((y: any) => y.name === x.ingredient)
  ) as Ingredients[];

  return (
    <SafeAreaView edges={["top"]} className="bg-secondary px-3 h-full pb-safe">
      <DetailsHeader />
      {error ? (
        <Error error={error?.message} onPress={refetch} />
      ) : (
        <>
          {mealDetail && (
            <FlatList
              data={[]}
              renderItem={() => null}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <View className="pb-8">
                  <DetailsBio
                    quan={quan}
                    quanStat={quanStat}
                    res={res}
                    handleQuantity={handleQuantity}
                    data={mealDetail as MealDetail}
                  />
                  {ings && ings?.length && (
                    <IngredientsDet
                      setActive={setActive}
                      active={active}
                      ings={ings}
                    />
                  )}
                  <View className="gap-2.5 my-4">
                    <Text className="text-base font-roboto-semibold pb-1 text-black">
                      Reviews
                    </Text>
                    {mealDetail.reviews!.map((item) => (
                      <RestaurantReviews
                        key={item.id}
                        item={item as unknown as RestaurantReview}
                      />
                    ))}
                  </View>
                  <View className="gap-5 mt-3">
                    <SimalarCategory cat={mealDetail.category} />
                    <SimilarArea area={mealDetail.area} />
                  </View>
                </View>
              )}
            />
          )}
          <View className="flex items-center justify-between flex-row py-3">
            <View className="flex justify-between">
              <Text className="font-roboto text-base text-grey">Total</Text>
              <Text className="font-roboto-medium text-2xl text-black">
                ${mealDetail?.price.toFixed(2)}
              </Text>
            </View>

            {isInCart ? (
              <View className="flex items-center flex-row gap-6">
                <TouchableOpacity
                  className={cn(
                    "  size-12 rounded-full flex items-center justify-center",
                    quan <= 1 ? "bg-primary/50" : "bg-primary"
                  )}
                  onPress={() => handleQuantity("decrease")}
                >
                  <AntDesign
                    name="minus"
                    size={14}
                    color={quan <= 1 ? "white" : "white"}
                  />
                </TouchableOpacity>
                {quanStat === "pending" ? (
                  <ActivityIndicator size={25} color={"#14b74d"} />
                ) : (
                  <Text className="text-2xl font-roboto-semibold text-black">
                    {quan}
                  </Text>
                )}
                <TouchableOpacity
                  className="bg-primary  size-12 rounded-full flex items-center justify-center"
                  onPress={() => handleQuantity("increase")}
                >
                  <AntDesign name="plus" size={18} color="white" />
                </TouchableOpacity>
              </View>
            ) : (
              <RoundedFullButton
                onPress={handleCart}
                className="bg-primary w-[70%] self-end"
              >
                {status === "pending" ? (
                  <View className="py-4">
                    <ActivityIndicator size={20} color={"white"} />
                  </View>
                ) : (
                  <View className="py-4 flex items-center justify-center flex-row gap-2">
                    <MaterialCommunityIcons
                      name="cart-outline"
                      size={24}
                      color={"white"}
                    />
                    <Text className="font-roboto-bold text-base text-white">
                      Add to Cart
                    </Text>
                  </View>
                )}
              </RoundedFullButton>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
