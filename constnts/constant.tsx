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
export const offers = [
  {
    name: "Jollof rice and Fish + Chips + soda",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.offerOne,
    id: "1",
  },
  {
    name: "Extra large Shawarma+Soda",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.offerTwo,
    id: "2",
  },
  {
    name: "Burger",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.offerThree,
    id: "3",
  },
  {
    name: "Jollof rice and Fish + Chips + soda",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.offerOne,
    id: "4",
  },
  {
    name: "Extra large Shawarma+Soda",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.offerTwo,
    id: "5",
  },
  {
    name: "Burger",
    route: "/",
    price: 100,
    time: "20-30 mins",
    rating: 5,
    image: images.offerThree,
    id: "6",
  },
];
export const reviews = [
  {
    id: "1",
    name: "Topsysammy",
    image: images.reviewTwo,
    time: "05/10/2026  01:28am",
    rating: 5,
    content:
      "Absolutely loved it! Great food, fast service, and a lovely vibe. Every bite was full of flavor — easily one of the best dining spots in town. Highly recommend the [specific dish]!",
  },
  {
    id: "2",
    name: "Brian George",
    image: images.reviewOne,
    time: "05/10/2026  01:28am",
    rating: 5,
    content:
      "Absolutely loved it! Great food, fast service, and a lovely vibe. Every bite was full of flavor — easily one of the best dining spots in town. Highly recommend the [specific dish]!",
  },
  {
    id: "3",
    name: "Guest 2023",
    image: images.reviewThree,
    time: "05/10/2026  01:28am",
    rating: 5,
    content:
      "Absolutely loved it! Great food, fast service, and a lovely vibe. Every bite was full of flavor — easily one of the best dining spots in town. Highly recommend the [specific dish]!",
  },
  {
    id: "4",
    name: "Guest 2023",
    image: images.reviewThree,
    time: "05/10/2026  01:28am",
    rating: 5,
    content:
      "Absolutely loved it! Great food, fast service, and a lovely vibe. Every bite was full of flavor — easily one of the best dining spots in town. Highly recommend the [specific dish]!",
  },
];
export const orders = [
  {
    orderId: "#123332133",
    date: " 26 november, 2025",
    status: "Delivered",
    restaurantName: "Mamy's Dishes",
    restaurantImage: images.exploreRestaurantOne,
    isVerified: true,

    orders: [
      {
        name: "Fish and Chips + 3Items",
        date: "31-Dec-2025, 02:00 PM",
        image: images.homeRecipeOne,
      },
      {
        name: "Fish and Chips + 3Items",
        date: "31-Dec-2025, 02:00 PM",
        image: images.homeRecipeOne,
      },
    ],
  },
  {
    orderId: "#123332134",
    date: " 26 november, 2025",
    status: "Shipped",
    restaurantName: "Mamy's Dishes",
    restaurantImage: images.exploreRestaurantOne,
    isVerified: true,

    orders: [
      {
        name: "Fish and Chips + 3Items",
        date: "31-Dec-2025, 02:00 PM",
        image: images.homeRecipeOne,
      },
      {
        name: "Fish and Chips + 3Items",
        date: "31-Dec-2025, 02:00 PM",
        image: images.homeRecipeOne,
      },
    ],
  },
  {
    orderId: "#123332135",
    date: " 26 november, 2025",
    status: "Failed",
    restaurantName: "Mamy's Dishes",
    restaurantImage: images.exploreRestaurantOne,
    isVerified: true,

    orders: [
      {
        name: "Fish and Chips + 3Items",
        date: "31-Dec-2025, 02:00 PM",
        image: images.homeRecipeOne,
      },
      {
        name: "Fish and Chips + 3Items",
        date: "31-Dec-2025, 02:00 PM",
        image: images.homeRecipeOne,
      },
    ],
  },
];
const placeholderAvatars = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
  "https://i.pravatar.cc/150?img=5",
  "https://i.pravatar.cc/150?img=6",
  "https://i.pravatar.cc/150?img=7",
  "https://i.pravatar.cc/150?img=8",
];
export const exploreRest = [
  {
    id: "r1",
    name: "Mr Bolat Kitchen",
    slug: "mr-bolat-kitchen",
    image: images.exploreRestaurantTwo,
    location: "Ikeja, Lagos — 2km away",
    rating: 5,
    description: "Freshly baked pizza with premium toppings and bold flavors.",
    reviews: [
      {
        id: "r1rev1",
        user: "Samuel",
        rating: 4.5,
        comment: "Amazing pizza! Loved the crust and toppings.",
        date: "2025-12-01T12:00:00.000Z",
        avatar: placeholderAvatars[0],
      },
      {
        id: "r1rev2",
        user: "Jane",
        rating: 4.2,
        comment: "Great flavors, will order again.",
        date: "2025-12-03T15:30:00.000Z",
        avatar: placeholderAvatars[1],
      },
      {
        id: "r1rev3",
        user: "Ugo",
        rating: 5,
        comment: "Best pizza in Lagos!",
        date: "2025-12-02T10:00:00.000Z",
        avatar: placeholderAvatars[2],
      },
      {
        id: "r1rev4",
        user: "Tolu",
        rating: 4.8,
        comment: "Tasty and fresh, loved the toppings.",
        date: "2025-12-04T11:00:00.000Z",
        avatar: placeholderAvatars[3],
      },
      {
        id: "r1rev5",
        user: "Chika",
        rating: 4.9,
        comment: "Perfect crust and flavors!",
        date: "2025-12-05T13:30:00.000Z",
        avatar: placeholderAvatars[4],
      },
    ],
  },
  {
    id: "r2",
    name: "Mamy's Dishes",
    slug: "mamys-dishes",
    image: images.exploreRestaurantOne,
    location: "Ikeja, Lagos — 2km away",
    rating: 5,
    description:
      "Home-style Nigerian meals made with love and authentic spices.",
    reviews: [
      {
        id: "r2rev1",
        user: "Ugo",
        rating: 5,
        comment: "Authentic Nigerian dishes, so tasty!",
        date: "2025-12-02T10:45:00.000Z",
        avatar: placeholderAvatars[2],
      },
      {
        id: "r2rev2",
        user: "Grace",
        rating: 4.2,
        comment: "Lovely meals and generous portions.",
        date: "2025-12-04T09:20:00.000Z",
        avatar: placeholderAvatars[3],
      },
      {
        id: "r2rev3",
        user: "Michael",
        rating: 4.8,
        comment: "Super tasty jollof rice!",
        date: "2025-12-01T14:30:00.000Z",
        avatar: placeholderAvatars[0],
      },
      {
        id: "r2rev4",
        user: "Ngozi",
        rating: 4.5,
        comment: "Love the home-style cooking.",
        date: "2025-12-03T16:00:00.000Z",
        avatar: placeholderAvatars[1],
      },
      {
        id: "r2rev5",
        user: "Chika",
        rating: 4.7,
        comment: "Portions are perfect and tasty.",
        date: "2025-12-05T12:00:00.000Z",
        avatar: placeholderAvatars[4],
      },
    ],
  },
  {
    id: "r3",
    name: "Coco Cuisine",
    slug: "coco-cuisine",
    image: images.exploreRestaurantFive,
    location: "Ikeja, Lagos — 2km away",
    rating: 5,
    description:
      "A fusion of continental and African dishes served with elegance.",
    reviews: [
      {
        id: "r3rev1",
        user: "Michael",
        rating: 4.8,
        comment: "Excellent fusion flavors, beautifully plated.",
        date: "2025-12-01T14:30:00.000Z",
        avatar: placeholderAvatars[1],
      },
      {
        id: "r3rev2",
        user: "Tunde",
        rating: 4.5,
        comment: "Great ambiance and tasty dishes.",
        date: "2025-12-03T16:00:00.000Z",
        avatar: placeholderAvatars[4],
      },
      {
        id: "r3rev3",
        user: "Samuel",
        rating: 4.7,
        comment: "Wonderful continental-African mix.",
        date: "2025-12-02T13:00:00.000Z",
        avatar: placeholderAvatars[2],
      },
      {
        id: "r3rev4",
        user: "Jane",
        rating: 4.9,
        comment: "Beautiful plating and delicious taste.",
        date: "2025-12-04T15:00:00.000Z",
        avatar: placeholderAvatars[3],
      },
      {
        id: "r3rev5",
        user: "Ugo",
        rating: 4.6,
        comment: "Excellent service and fusion dishes.",
        date: "2025-12-05T12:30:00.000Z",
        avatar: placeholderAvatars[0],
      },
    ],
  },
  {
    id: "r4",
    name: "Abacha Cuisine",
    slug: "abacha-cuisine",
    image: images.exploreRestaurantThree,
    location: "Ikeja, Lagos — 2km away",
    rating: 5,
    description:
      "Specialized in Eastern Nigerian delicacies, especially Abacha.",
    reviews: [
      {
        id: "r4rev1",
        user: "Chika",
        rating: 5,
        comment: "Authentic Abacha! Tastes like home.",
        date: "2025-12-02T11:00:00.000Z",
        avatar: placeholderAvatars[0],
      },
      {
        id: "r4rev2",
        user: "Ngozi",
        rating: 4.7,
        comment: "Really enjoyed the flavors, excellent service.",
        date: "2025-12-04T12:15:00.000Z",
        avatar: placeholderAvatars[2],
      },
      {
        id: "r4rev3",
        user: "Tolu",
        rating: 4.8,
        comment: "Perfectly made Abacha!",
        date: "2025-12-01T13:00:00.000Z",
        avatar: placeholderAvatars[1],
      },
      {
        id: "r4rev4",
        user: "Blessing",
        rating: 4.9,
        comment: "Loved the traditional flavors.",
        date: "2025-12-03T16:30:00.000Z",
        avatar: placeholderAvatars[3],
      },
      {
        id: "r4rev5",
        user: "Samuel",
        rating: 4.6,
        comment: "Authentic and tasty, highly recommend.",
        date: "2025-12-05T12:45:00.000Z",
        avatar: placeholderAvatars[4],
      },
    ],
  },
  {
    id: "r5",
    name: "Esther's Kitchen",
    slug: "esthers-kitchen",
    image: images.exploreRestaurantFour,
    location: "Ikeja, Lagos — 2km away",
    rating: 5,
    description: "Healthy meals, refreshing salads, and wholesome dishes.",
    reviews: [
      {
        id: "r5rev1",
        user: "Blessing",
        rating: 4.9,
        comment: "Perfect healthy meals, loved the salads.",
        date: "2025-12-01T13:30:00.000Z",
        avatar: placeholderAvatars[3],
      },
      {
        id: "r5rev2",
        user: "Tolu",
        rating: 4.6,
        comment: "Fresh ingredients and very tasty dishes.",
        date: "2025-12-03T17:00:00.000Z",
        avatar: placeholderAvatars[4],
      },
      {
        id: "r5rev3",
        user: "Chika",
        rating: 4.8,
        comment: "Healthy and delicious!",
        date: "2025-12-02T10:30:00.000Z",
        avatar: placeholderAvatars[0],
      },
      {
        id: "r5rev4",
        user: "Jane",
        rating: 4.7,
        comment: "Loved the variety of salads and meals.",
        date: "2025-12-04T14:00:00.000Z",
        avatar: placeholderAvatars[1],
      },
      {
        id: "r5rev5",
        user: "Samuel",
        rating: 4.9,
        comment: "Highly recommend for healthy meals.",
        date: "2025-12-05T16:00:00.000Z",
        avatar: placeholderAvatars[2],
      },
    ],
  },
];
export const ingredientIcons = {
  macaroni: "noodles",
  "chicken stock": "pot",
  "heavy cream": "cup",
  "fajita seasoning": "seasoning",
  salt: "shaker",
  "chicken breast": "food-drumstick",
  "olive oil": "bottle-soda",
  onion: "onion",
  "red pepper": "pepper-hot",
  garlic: "food-apple-outline", // no garlic icon, this is closest
  "cheddar cheese": "cheese",
  parsley: "leaf",
};
