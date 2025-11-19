/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#14b74d",
        grey: "#a1a1a1",
        secondary: "#f7f7f7",
        black: "#191919",
        warning: "#f8d300",
        success: "#00d707",
        error: "#ff1414",
      },
      fontFamily: {
        roboto: ["Roboto-Regular", "sans-serif"],
        "roboto-bold": ["Roboto-Bold", "sans-serif"],
        "roboto-semibold": ["Roboto-SemiBold", "sans-serif"],
        "roboto-light": ["Roboto-Light", "sans-serif"],
        "roboto-medium": ["Roboto-Medium", "sans-serif"],
      },
    },
  },
  plugins: [],
};
