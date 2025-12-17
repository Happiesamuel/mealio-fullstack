import { Models } from "react-native-appwrite";

export interface ItemProp {
  price: number;
  time: string;
  rating: number;
  image: any;
  name: string;
  id: string | number;
}
export interface FeatureCardProp {
  name: string;
  id: string;
  description: string;
  image: any;
  rating: number;
  reviews: number;
  price: number;
}
export interface LocationProp {
  name: string;
  street: string;
  id: string;
}
export interface MealProp {
  name: string;
  price: number;
  time: string;
  rating: number;
  image: any;
  id: string;
}

export interface Notification {
  id: string;
  title: string;
  content: string;
  image: any;
  status: string;
  time: string;
}
export interface Review {
  id: string;
  name: string;
  image: any;
  time: string;
  rating: number;
  content?: string;
}
export interface Orders {
  orderId: string;
  date: string;
  status: string;
  restaurantName: string;
  restaurantImage: any;
  isVerified: boolean;

  orders: {
    name: string;
    date: string;
    image: any;
  }[];
}

export interface Meal {
  id: string;
  title: string;
  category: string;
  area: string;
  image: string;
  price: number;
  rating: number;
  restaurantId: string;
  discountPercent?: number;
  time: string;
  description: string;
  reviews: {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}
export interface Ingredients {
  name: string;
  id: string;
  img: string;
}
export interface Categories {
  name: string;
  id: string;
  img: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: any;
  slug: string;
  location: string;
  rating: number;
  description: string;
  reviews: RestaurantReview[];
}
export interface RestaurantReview {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  avatar: any;
}
export interface MealDetail {
  id: string;
  title: string;
  category: string;
  area: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  restaurantId: string;
  reviews: RestaurantReview[];
  discountPercent?: number;
  time: string;
  ingredients: Ingredient[];
  price: number;
}
export interface CartItem {
  price: number;
  rating: number | undefined;
  title: string;
  id: string;
  restaurantId: string | undefined;
  image: string;
  quantity: number;
}
export interface FavouriteMeal {
  price: number;
  rating: number | undefined;
  title: string;
  id: string;
  restaurantId: string | undefined;
  image: string;
  time?: number | string;
}
export interface CartProp {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
  restaurantId: string;
}
export interface SignupProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface AddressProps {
  type: string;
  street: string;
  city: string;
  guests: string;
}
export interface Guest extends Models.Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
