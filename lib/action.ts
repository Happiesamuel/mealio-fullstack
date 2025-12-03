import {
  EXPO_PUBLIC_SPOONACULAR_API_KEY,
  EXPO_PUBLIC_SPOONACULAR_BASE_URL,
} from "@env";
const config = {
  spoonacularApiKey: EXPO_PUBLIC_SPOONACULAR_API_KEY,
  spoonacularBaseUrl: EXPO_PUBLIC_SPOONACULAR_BASE_URL,
};

export async function spoonFetch(path: string, params = {}) {
  const url = new URL(config.spoonacularBaseUrl + path);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  url.searchParams.set("apiKey", config.spoonacularApiKey);
  const res = await fetch(url.toString());

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}
