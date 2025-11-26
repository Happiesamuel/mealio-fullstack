import { getCountries } from "@/lib/helper";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SvgUri } from "react-native-svg";
export default function CountryPicker() {
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [data, setData] = useState<{ [key: string]: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const selectedFlag = country ? country.split("%")[0] : null;

  useEffect(function () {
    async function fetchCountries() {
      setLoading(true);
      setError("");
      const countries = await getCountries();
      const newCountries = countries.map((x: any) => {
        return { name: x.name, flag: x.flag };
      });
      setData(newCountries);
      setLoading(false);
      try {
      } catch (error) {
        setError(error as string);
      }
    }
    fetchCountries();
  }, []);
  if (loading) return <ActivityIndicator size={"large"} color={"green"} />;
  if (error)
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  console.log(country);
  return (
    <View className="gap-2">
      <Text className="font-roboto-medium text-black text-xs">
        Phone number:
      </Text>
      <View className="bg-[#E8E8E8] gap-2 rounded-2xl  flex flex-row items-center px-3">
        {selectedFlag ? (
          <SvgUri
            className="size-6"
            width="24"
            height="24"
            uri={selectedFlag || ""}
          />
        ) : (
          <Text className=""></Text>
        )}

        <View className="w-[30%]  ">
          <RNPickerSelect
            onValueChange={(value) => setCountry(value)}
            placeholder={{ label: "🌍", value: null }}
            value={country}
            items={data.map((c) => ({
              label: c.name,
              value: `${c.flag}%${c.name}`,
            }))}
            style={{
              placeholder: { color: "#666" },
            }}
          />
        </View>

        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone no"
          placeholderTextColor="#8e9aaf"
          keyboardType="number-pad"
          className="py-4 w-full flex-1 font-roboto text-sm"
        />
      </View>
      {error && <Text className="font-roboto text-error text-xs">{error}</Text>}
    </View>
  );
}
