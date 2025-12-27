import { useTheme } from "@/context/ThemeProvider";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const useToastConfig = () => {
  const { isDark } = useTheme();

  const background = isDark ? "#222222" : "#f0f0f0";
  const textPrimary = isDark ? "#f1f1f1" : "#191919";
  const textSecondary = isDark ? "#b5b5b5" : "#959595";

  return {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{
          backgroundColor: background,
          borderLeftWidth: 0,
          paddingVertical: 10,
        }}
        text1Style={{
          fontFamily: "Roboto-Bold",
          fontSize: 14,
          color: textPrimary,
        }}
        text2Style={{
          fontFamily: "Roboto-Medium",
          fontSize: 12,
          color: textSecondary,
        }}
      />
    ),

    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{
          backgroundColor: background,
          borderLeftWidth: 0,
          paddingVertical: 10,
        }}
        text1Style={{
          fontFamily: "Roboto-Bold",
          fontSize: 14,
          color: textPrimary,
        }}
        text2Style={{
          fontFamily: "Roboto-Medium",
          fontSize: 12,
          color: textSecondary,
        }}
      />
    ),
  };
};
