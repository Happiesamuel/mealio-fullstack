export interface ItemProp {
  route: string;
  price: number;
  time: string;
  rating: number;
  image: any;
  name: string;
  id: string;
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
export interface ResturntProp {
  name: string;
  slug: string;
  image: any;
  location: string;
  rating: number;
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
  content: string;
}
