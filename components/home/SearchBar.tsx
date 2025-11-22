// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import React, { useState } from "react";
// import { Pressable, TextInput, View } from "react-native";
// export default function SearchBar({
//   onPress,
//   value,
//   handleSearch,
// }: {
//   query?: string;
//   value?: string;
//   onPress?(): void;
//   handleSearch?(test: string): void;
// }) {
//   const [test, setTest] = useState(value || "");
//   function handlePress() {
//     if (value) {
//       router.push("/filter");
//     }
//   }
//   return (
//     <View className="flex items-center flex-row bg-grey/10 rounded-r-full rounded-l-full px-4 py-2 my-4">
//       <View className="w-[90%]  flex flex-row items-center gap-1">
//         <Ionicons name="search-outline" size={20} color="#A1A1A1" />
//         <TextInput
//           value={test}
//           onChangeText={(text) => setTest(text)}
//           onSubmitEditing={() => handleSearch && handleSearch(test)}
//           returnKeyType="search"
//           onPress={onPress}
//           className="w-full text-sm font-roboto"
//           placeholder="Search for Restaurants and dishes....."
//           placeholderClassName="text-grey"
//         />
//       </View>
//       <Pressable
//         onPress={() => handlePress()}
//         className="flex items-center justify-center w-[10%] border-l border-grey/30 pl-2"
//       >
//         <Ionicons name="options-outline" size={24} color="black" />
//       </Pressable>
//     </View>
//   );
// }
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import FilterSearch from "./FilterSearch";

export default function SearchBar({
  onPress,
  value,
  handleSearch,
}: {
  value?: string;
  onPress?(): void;
  handleSearch?(test: string): void;
}) {
  const [test, setTest] = useState(value || "");
  const [showFilter, setShowFilter] = useState(false);

  function handlePress() {
    setShowFilter(true);
  }

  return (
    <>
      <View className="flex items-center flex-row bg-grey/10 rounded-r-full rounded-l-full px-4 py-2 my-4 mb-2">
        <View className="w-[90%] flex flex-row items-center gap-1">
          <Ionicons name="search-outline" size={20} color="#A1A1A1" />

          <TextInput
            value={test}
            onChangeText={(text) => setTest(text)}
            onSubmitEditing={() => handleSearch && handleSearch(test)}
            returnKeyType="search"
            onPress={onPress}
            className="w-full text-sm font-roboto"
            placeholder="Search for Restaurants and dishes....."
            placeholderClassName="text-grey"
          />
        </View>

        <Pressable
          onPress={handleSearch && handlePress}
          className="flex items-center justify-center w-[10%] border-l border-grey/30 pl-2"
        >
          <Ionicons name="options-outline" size={24} color="black" />
        </Pressable>
      </View>

      <FilterSearch visible={showFilter} onClose={() => setShowFilter(false)} />
    </>
  );
}
