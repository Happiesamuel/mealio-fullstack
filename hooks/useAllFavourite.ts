import { useFavouriteStorage } from "@/store/useFavouriteStore";
import { FavouriteMeal, Restaurant } from "@/types";

export default function useAllFavourite(
  item: FavouriteMeal | Restaurant,
  type: "meals" | "restaurants"
) {
  const { addItem, removeItem, favourite, clearFavourite } =
    useFavouriteStorage();
  const isInFavourite = favourite[type].some((x) => x.id === item.id);
  function handlePress(type: "meals" | "restaurants") {
    let fav: FavouriteMeal | Restaurant;
    if ("price" in item)
      fav = {
        price: item.price,
        rating: item.rating,
        title: item.title,
        id: item.id,
        restaurantId: item.restaurantId,
        image: item.image,
        time: item.time,
      } as unknown as FavouriteMeal;
    else {
      fav = item as unknown as Restaurant;
    }
    return isInFavourite ? removeItem(item.id, type) : addItem(fav, type);
  }
  return { handlePress, favourite, isInFavourite, clearFavourite };
}
