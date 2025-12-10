import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#0d9812",
        borderLeftWidth: 0,
        height: "fit-content",
        paddingVertical: 10,
      }}
      text1Style={{
        fontFamily: "Roboto-Bold",
        fontSize: 14,
        color: "white",
        padding: 0,
      }}
      text2Style={{
        fontSize: 12,
        color: "white",
        fontFamily: "Roboto-Medium",
        padding: 0,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: "#f05b53",
        borderLeftWidth: 0,
        height: "fit-content",
        paddingVertical: 10,
      }}
      text1Style={{
        fontFamily: "Roboto-Bold",
        fontSize: 14,
        color: "white",
        padding: 0,
      }}
      text2Style={{
        fontSize: 12,
        color: "white",
        fontFamily: "Roboto-Medium",
        padding: 0,
      }}
    />
  ),
};
