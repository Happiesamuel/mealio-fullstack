import {
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { icons, images } from ".";

export const categories = [
  { name: "All", slug: "all" },
  { name: "Restaurant", slug: "restaurant" },
  { name: "Local", slug: "local" },
  { name: "Fine Dinner", slug: "fine-dinner" },
  { name: "Fast Food", slug: "fast-food" },
  { name: "Coffee & Tea", slug: "coffee-tea" },
  { name: "Bakery", slug: "bakery" },
  { name: "Breakfast", slug: "breakfast" },
  { name: "Lunch", slug: "lunch" },
  { name: "Dinner", slug: "dinner" },
  { name: "Drinks", slug: "drinks" },
  { name: "Snacks", slug: "snacks" },
  { name: "Healthy", slug: "healthy" },
  { name: "Seafood", slug: "seafood" },
  { name: "Desserts", slug: "desserts" },
  { name: "Pizza", slug: "pizza" },
  { name: "Burgers", slug: "burgers" },
  { name: "Chicken", slug: "chicken" },
  { name: "African Dishes", slug: "african" },
  { name: "Chinese", slug: "chinese" },
  { name: "Italian", slug: "italian" },
  { name: "Indian", slug: "indian" },
  { name: "Mexican", slug: "mexican" },
  { name: "Vegan", slug: "vegan" },
  { name: "Grill / BBQ", slug: "grill" },
];
export const exploreResturants = [
  {
    name: "Mr Bolat Pizza",
    slug: "mr-bolat-pizza",
    image: images.exploreRestaurantTwo,
    location: "Ikeja, Lagos; 2km away",
    rating: 5,
  },
  {
    name: "Mamy's Dishes",
    slug: "mamys-dishes",
    location: "Ikeja, Lagos; 2km away",
    image: images.exploreRestaurantOne,
    rating: 5,
  },
  {
    name: "Coco Cuisine",
    slug: "coco-cuisine",
    location: "Ikeja, Lagos; 2km away",
    image: images.exploreRestaurantFive,
    rating: 5,
  },
  {
    name: "Abacha Cuisine",
    slug: "abacha-cuisine",
    location: "Ikeja, Lagos; 2km away",
    image: images.exploreRestaurantThree,
    rating: 5,
  },
  {
    name: "Esther's Kitchen",
    slug: "esthers-kitchen",
    location: "Ikeja, Lagos; 2km away",
    image: images.exploreRestaurantFour,
    rating: 5,
  },
];
export const popularMeals = [
  {
    name: "Fish and Chips",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeOne,
    id: "1",
  },
  {
    name: "Roasted chicken",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeTwo,
    id: "2",
  },
  {
    name: "Fish and Chips",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeThree,
    id: "3",
  },
  {
    name: "Roasted chicken",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeFour,
    id: "4",
  },
  {
    name: "Fish and Chips",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeOne,
    id: "5",
  },
  {
    name: "Roasted chicken",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeTwo,
    id: "6",
  },
];
export const FeatureMeals = [
  {
    name: "Fish Stew",
    route: "/",
    price: 100,
    reviews: 120,
    rating: 4,
    image: images.homeRecipeOne,
    id: "11",
    description: "Rich in flavor, handpicked, and easy to cook",
  },
  {
    name: "Fish Stew",
    route: "/",
    price: 100,
    reviews: 120,
    rating: 4,
    image: images.homeRecipeOne,
    id: "8",
    description: "Rich in flavor, handpicked, and easy to cook",
  },
  {
    name: "Fish Stew",
    route: "/",
    price: 100,
    reviews: 120,
    rating: 4,
    image: images.homeRecipeOne,
    id: "6",
    description: "Rich in flavor, handpicked, and easy to cook",
  },
  {
    name: "Fish Stew",
    route: "/",
    price: 100,
    reviews: 120,
    rating: 4,
    image: images.homeRecipeOne,
    id: "1",
    description: "Rich in flavor, handpicked, and easy to cook",
  },
  {
    name: "Smoked Catfish",
    route: "/",
    price: 100,
    reviews: 180,
    rating: 5,
    image: images.homeRecipeTwo,
    id: "2",
    description: "Clean, dried and redy to cook. ",
  },
  {
    name: "Fish Stew",
    route: "/",
    price: 100,
    reviews: 120,
    rating: 4,
    image: images.homeRecipeThree,
    id: "3",
    description: "Rich in flavor, handpicked, and easy to cook",
  },
  {
    name: "Smoked Catfish",
    route: "/",
    price: 100,
    reviews: 180,
    rating: 5,
    image: images.homeRecipeFour,
    id: "4",
    description: "Clean, dried and redy to cook. ",
  },
  {
    name: "Fish Stew",
    route: "/",
    price: 100,
    reviews: 120,
    rating: 4,
    image: images.homeRecipeOne,
    id: "5",
    description: "Rich in flavor, handpicked, and easy to cook",
  },
  {
    name: "Smoked Catfish",
    route: "/",
    price: 100,
    reviews: 180,
    rating: 5,
    image: images.homeRecipeTwo,
    id: "6",
    description: "Clean, dried and redy to cook. ",
  },
];
export const Favourite = [
  {
    name: "Mr Bolat Pizza",
    route: "/",
    price: 100,
    reviews: 120,
    rating: 4,
    image: images.homeRecipeOne,
    id: "1",
    description: "Rich in flavor, handpicked, and easy to cook",
  },
  {
    name: "Fish and chips",
    route: "/",
    price: 100,
    reviews: 180,
    rating: 5,
    image: images.homeRecipeTwo,
    id: "2",
    description: "Clean, dried and redy to cook. ",
  },

  {
    name: "Abacha Cuisine",
    route: "/",
    price: 100,
    reviews: 180,
    rating: 5,
    image: images.homeRecipeFour,
    id: "4",
    description: "Clean, dried and redy to cook. ",
  },
];
export const recentSerch = [
  {
    name: "Mr Bolat Pizza",

    id: "1",
  },
  {
    name: "Fish and chips",

    id: "2",
  },

  {
    name: "Abacha Cuisine",

    id: "4",
  },
];
export const cusine = [
  {
    name: "African",

    slug: "african",
  },
  {
    name: "Chinese",

    slug: "chinese",
  },

  {
    name: "Indian",

    slug: "indian",
  },

  {
    name: "Italian",

    slug: "italian",
  },

  {
    name: "Vegan",

    slug: "vegan",
  },
];
export const detailsSlide = [
  {
    name: "Extra fries",
    price: 20,
    image: images.recipieSlideOne,
  },
  {
    name: "Smoothie",
    price: 28,
    image: images.recipieSlideTwo,
  },
  {
    name: "Soda",
    price: 19,
    image: images.recipieSlideThree,
  },
  {
    name: "Coselaw",
    price: 19,
    image: images.recipieSlideFour,
  },
];
export const cart = [
  {
    name: "Fish Stew",
    price: 100,
    image: images.homeRecipeOne,
    id: "1",
    quantity: 1,
  },
  {
    name: "Smoked Catfish",
    price: 100,
    image: images.homeRecipeTwo,
    id: "2",
    quantity: 1,
  },
  {
    name: "Fish Stew",
    price: 100,
    image: images.homeRecipeThree,
    id: "3",
    quantity: 1,
  },
  {
    name: "Smoked Catfish",
    price: 100,
    image: images.homeRecipeFour,
    id: "4",
    quantity: 1,
  },
];
export const address = [
  {
    name: "Home Address",
    street: "No 31, prince Salisu elegushi.....",
    id: "1",
  },
  {
    name: "Office Address",
    street: "No 31, prince Salisu elegushi.....",
    id: "2",
  },
];
export const payment = [
  {
    name: "Master Card",
    pin: "******3687",
    id: "1",
    icon: icons.mastercard,
  },
  {
    name: "Visa Card",
    pin: "Make payment by Visa card",
    id: "2",
    icon: icons.visa,
  },
];
export const explore = [
  {
    name: "Fish and Chips",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeOne,
    id: "1",
  },
  {
    name: "Grilled Fish and potatoes",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeTwo,
    id: "2",
  },
  {
    name: "Fish and Plantain",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeThree,
    id: "3",
  },
  {
    name: "Roasted chicken",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeFour,
    id: "4",
  },
  {
    name: "Fish and Chips",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeOne,
    id: "5",
  },
  {
    name: "Roasted chicken",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.homeRecipeTwo,
    id: "6",
  },
];
export const orders = [
  { orderId: "#123332133", date: " 26 november, 2025", status: "delivered" },
];
export const profile = [
  {
    name: "General",
    subjects: [
      {
        name: "Edit Profile",
        icon: <FontAwesome5 name="user" size={16} color="black" />,
        route: "/profile/edit",
      },
      {
        name: "Addresses",
        icon: <FontAwesome6 name="contact-book" size={16} color="black" />,
        route: "/profile/address",
      },
      {
        name: "Payment Method",
        icon: <Ionicons name="wallet-outline" size={16} color="black" />,
        route: "/profile/payment",
      },
      {
        name: "Notifications",
        icon: <Fontisto name="bell" size={16} color="black" />,
        route: "/profile/notification",
      },
      {
        name: "Preferences",
        icon: <MaterialIcons name="room-preferences" size={16} color="black" />,
        route: "/profile/preference",
      },
      {
        name: "Security",
        icon: (
          <MaterialCommunityIcons name="security" size={16} color="black" />
        ),
        route: "/profile/security",
      },
    ],
  },
  {
    name: "Help & Support",
    subjects: [
      {
        name: "Contact Support",
        icon: <MaterialIcons name="support-agent" size={16} color="black" />,
        route: "/",
      },
      {
        name: "FAQ",
        icon: (
          <MaterialCommunityIcons
            name="message-question-outline"
            size={16}
            color="black"
          />
        ),
        route: "/",
      },
    ],
  },
];

export const notifictions = [
  {
    id: "1",
    title: "Your order is being prepared",
    content: "Your food is currently being prepared and will be ready soon",
    image: images.homeRecipeTwo,
    status: "order prepare",
    time: "5 mins ago",
  },
  {
    id: "2",
    title: "Rider assigned to your delivery ",
    content: "A rider has picked up your order and is on the way.",
    image: "",
    status: "delivery",
    time: "10 mins ago",
  },
  {
    id: "3",
    title: "Order delivered succesfully",
    content: "Hope you enjoyed your meal! Don't forget to rate your delivery.",
    image: "",
    status: "success",
    time: "1 hour ago",
  },
];
