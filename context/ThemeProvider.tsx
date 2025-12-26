import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AppTheme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: AppTheme;
  isDark: boolean;
  setLight: () => void;
  setDark: () => void;
  resetToSystem: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "@app_theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();

  const [theme, setTheme] = useState<AppTheme>("system");

  useEffect(() => {
    (async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(STORAGE_KEY);

        if (
          savedTheme === "light" ||
          savedTheme === "dark" ||
          savedTheme === "system"
        ) {
          setTheme(savedTheme);
          setColorScheme(savedTheme);
        } else {
          setTheme("system");
          setColorScheme("system");
        }
      } catch (error) {
        console.log("Failed to load theme", error);
      }
    })();
  }, []);

  // 🔹 Theme actions
  const setLight = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, "light");
    setTheme("light");
    setColorScheme("light");
  };

  const setDark = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, "dark");
    setTheme("dark");
    setColorScheme("dark");
  };

  const resetToSystem = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setTheme("system");
    setColorScheme("system"); // 🔑 REQUIRED
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark: colorScheme === "dark",
        setLight,
        setDark,
        resetToSystem,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
