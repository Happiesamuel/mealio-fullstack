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
// {
//   aggregateLikes: 32767,
//   cheap: false,
//   cookingMinutes: null,
//   creditsText: "blogspot.com",
//   cuisines: [],
//   dairyFree: true,
//   diets: ["gluten free", "dairy free"],
//   dishTypes: ["morning meal", "brunch", "breakfast"],
//   gaps: "no",
//   glutenFree: true,
//   healthScore: 0,
//   id: 945221,
//   image: "https://img.spoonacular.com/recipes/945221-312x231.jpg",
//   imageType: "jpg",
//   license: null,
//   lowFodmap: false,
//   occasions: [],
//   preparationMinutes: null,
//   pricePerServing: 23.36,
//   readyInMinutes: 45,
//   servings: 16,
//   sourceName: "blogspot.com",
//   sourceUrl:
//     "http://watching-what-i-eat.blogspot.com/2012/06/peanut-butter-banana-oat-breakfast.html",
//   spoonacularScore: 36.540924072265625,
//   spoonacularSourceUrl:
//     "https://spoonacular.com/watching-what-i-eat-peanut-butter-banana-oat-breakfast-cookies-with-carob-chocolate-chips-945221",
//   summary:
//     'If you want to add more <b>gluten free and dairy free</b> recipes to your repertoire, Watching What I Eat: Peanut Butter Bananan Oat Breakfast Cookies with Carob / Chocolate Chips might be a recipe you should try. This recipe makes 16 servings with <b>103 calories</b>, <b>4g of protein</b>, and <b>5g of fat</b> each. For <b>23 cents per serving</b>, this recipe <b>covers 3%</b> of your daily requirements of vitamins and minerals. This recipe from watching-what-i-eat.blogspot.com has 902934 fans. Head to the store and pick up bananas, vanillan extract, chocolate chips, and a few other things to make it today. It works well as a very affordable morn meal. From preparation to the plate, this recipe takes roughly <b>roughly 45 minutes</b>. With a spoonacular <b>score of 44%</b>, this dish is good. If you like this recipe, you might also like recipes such as <a href="https://spoonacular.com/recipes/peanut-butter-banana-oat-breakfast-cookies-with-carob-chocolate-chips-666592">Peanut Butter Bananan Oat Breakfast Cookies with Carob/Chocolate Chips</a>, <a href="https://spoonacular.com/recipes/peanut-butter-banana-honey-oat-chocolate-chip-cookies-618265">Peanut Butter, Banana, Honey & Oat Chocolate Chip Cookies</a>, and <a href="https://spoonacular.com/recipes/banana-oatmeal-cookies-with-peanut-butter-and-chocolate-chips-203278">Bananan Oatmeal Cookies with Peanut Butter and Chocolate Chips</a>.',
//   sustainable: false,
//   title:
//     "Watching What I Eat: Peanut Butter Banana Oat Breakfast Cookies with Carob / Chocolate Chips",
//   vegan: false,
//   vegetarian: false,
//   veryHealthy: false,
//   veryPopular: true,
//   weightWatcherSmartPoints: 3,
// },
// {
//   aggregateLikes: 32767,
//   cheap: false,
//   cookingMinutes: 20,
//   creditsText: "Jen West",
//   cuisines: [],
//   dairyFree: false,
//   diets: [],
//   dishTypes: [],
//   gaps: "no",
//   glutenFree: false,
//   healthScore: 20,
//   id: 715449,
//   image: "https://img.spoonacular.com/recipes/715449-312x231.jpg",
//   imageType: "jpg",
//   license: null,
//   lowFodmap: false,
//   occasions: ["thanksgiving"],
//   preparationMinutes: 20,
//   pricePerServing: 633.3,
//   readyInMinutes: 40,
//   servings: 48,
//   sourceName: "Pink When",
//   sourceUrl:
//     "https://www.pinkwhen.com/oreo-cookie-balls-thanksgiving-turkey/",
//   spoonacularScore: 91.49601745605469,
//   spoonacularSourceUrl:
//     "https://spoonacular.com/how-to-make-oreo-turkeys-for-thanksgiving-715449",
//   summary:
//     'How to Make OREO Turkeys for Thanksgiving requires about <b>40 minutes</b> from start to finish. This recipe serves 48. One serving contains <b>835 calories</b>, <b>47g of protein</b>, and <b>45g of fat</b>. For <b>$6.33 per serving</b>, this recipe <b>covers 27%</b> of your daily requirements of vitamins and minerals. 32767 people were impressed by this recipe. Head to the store and pick up oreo cookies 3 cups, icing, semi baking chocolate, and a few other things to make it today. It can be enjoyed any time, but it is especially good for <b>Thanksgiving</b>. It is brought to you by Pink When. Taking all factors into account, this recipe <b>earns a spoonacular score of 18%</b>, which is rather bad. Similar recipes are <a href="https://spoonacular.com/recipes/how-to-make-oreo-turkeys-for-thanksgiving-1364303">How to Make OREO Turkeys for Thanksgiving</a>, <a href="https://spoonacular.com/recipes/oreo-turkeys-thanksgiving-snack-138063">Oreo Turkeys (Thanksgiving Snack)</a>, and <a href="https://spoonacular.com/recipes/cakespy-thanksgiving-cookie-turkeys-50158">Cakespy: Thanksgiving Cookie Turkeys</a>.',
//   sustainable: false,
//   title: "How to Make OREO Turkeys for Thanksgiving",
//   vegan: false,
//   vegetarian: false,
//   veryHealthy: false,
//   veryPopular: true,
//   weightWatcherSmartPoints: 32,
// },
// {
//   aggregateLikes: 32767,
//   cheap: false,
//   cookingMinutes: null,
//   creditsText: "blogspot.com",
//   cuisines: [],
//   dairyFree: false,
//   diets: [],
//   dishTypes: ["lunch", "main course", "main dish", "dinner"],
//   gaps: "no",
//   glutenFree: false,
//   healthScore: 7,
//   id: 776505,
//   image: "https://img.spoonacular.com/recipes/776505-312x231.jpg",
//   imageType: "jpg",
//   license: null,
//   lowFodmap: false,
//   occasions: [],
//   preparationMinutes: null,
//   pricePerServing: 258.48,
//   readyInMinutes: 28,
//   servings: 6,
//   sourceName: "blogspot.com",
//   sourceUrl:
//     'http://asouthern-soul.blogspot.com/2014/11/sausage-pepperot. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. It is brought to you by fullbellysisters.blogspot.com. It is a good option if you\'re following a <b>gluten free and lacto ovo vegetarian</b> diet. Taking all factors into account, this recipe <b>earns a spoonacular score of 95%</b>, which is super. If you like this recipe, you might also like recipes such as <a href="https://spoonacular.com/recipes/grilled-zucchini-with-goat-cheese-and-balsamic-honey-syrup-606467">Grilled Zucchini with Goat Cheese and Balsamic-Honey Syrup</a>, <a href="https://spoonacular.com/recipes/grilled-peach-salad-with-toasted-pecans-blue-cheese-and-honey-balsamic-syrup-252021">Grilled Peach Salad with Toasted Pecans, Blue Cheese and Honey Balsamic Syrup</a>, and <a href="https://spoonacular.com/recipes/filet-mignon-with-balsamic-syrup-and-goat-cheese-289899">Filet Mignon with Balsamic Syrup and Goat Cheese</a>.',
//   sustainable: false,
//   title: "Grilled Zucchini with Goat Cheese and Balsamic-Honey Syrup",
//   vegan: false,
//   vegetarian: true,
//   veryHealthy: false,
//   veryPopular: true,
//   weightWatcherSmartPoints: 10,
// },
// {
//   aggregateLikes: 9912,
//   cheap: false,
//   cookingMinutes: 15,
//   creditsText: "pinkwhen.com",
//   cuisines: ["Mexican"],
//   dairyFree: false,
//   diets: ["gluten free"],
//   dishTypes: ["side dish", "lunch", "main course", "main dish", "dinner"],
//   gaps: "no",
//   glutenFree: true,
//   healthScore: 38,
//   id: 715421,
//   image: "https://img.spoonacular.com/recipes/715421-312x231.jpg",
//   imageType: "jpg",
//   license: null,
//   lowFodmap: false,
//   occasions: ["fall", "winter"],
//   preparationMinutes: 15,
//   pricePerServing: 262.25,
//   readyInMinutes: 30,
//   servings: 4,
//   sourceName: "pinkwhen.com",
//   sourceUrl:
//     "https://www.pinkwhen.com/cheesy-chicken-enchilada-quinoa-casserole/",
//   spoonacularScore: 97.70980834960938,
//   spoonacularSourceUrl:
//     "https://spoonacular.com/cheesy-chicken-enchilada-quinoa-casserole-715421",
//   summary:
//     'Cheesy Chicken Enchilada Quinoa Casserole might be just the <b>Mexican</b> recipe you are searching for. One serving contains <b>594 calories</b>, <b>34g of protein</b>, and <b>24g of fat</b>. This gluten free recipe serves 4 and costs <b>$2.62 per serving</b>. A mixture of corn, pepper, canned tomatoes, and a handful of other ingredients are all it takes to make this recipe so delicious. From preparation to the plate, this recipe takes approximately <b>30 minutes</b>. It will be a hit at your <b>Autumn</b> event. Plenty of people made this recipe, and 9912 would say it hit the spot. It works well as an affordable main course. It is brought to you by Pink When. With a spoonacular <b>score of 97%</b>, this dish is amazing. If you like this recipe, you might also like recipes such as <a href="https://spoonacular.com/recipes/cheesy-chicken-enchilada-quinoa-casserole-1317125">Cheesy Chicken Enchilada Quinoa Casserole</a>, <a href="https://spoonacular.com/recipes/cheesy-chicken-enchilada-quinoa-casserole-1340231">Cheesy Chicken Enchilada Quinoa Casserole</a>, and <a href="https://spoonacular.com/recipes/cheesy-chicken-enchilada-quinoa-casserole-1280325">Cheesy Chicken Enchilada Quinoa Casserole</a>.',
//   sustainable: false,
//   title: "Cheesy Chicken Enchilada Quinoa Casserole",
//   vegan: false,
//   vegetarian: false,
//   veryHealthy: false,
//   veryPopular: true,
//   weightWatcherSmartPoints: 17,
// },
