import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#f0f0f0",
        borderLeftWidth: 0,
        height: "fit-content",
        paddingVertical: 10,
      }}
      text1Style={{
        fontFamily: "Roboto-Bold",
        fontSize: 14,
        color: "#191919",
        padding: 0,
      }}
      text2Style={{
        fontSize: 12,
        color: "#959595",
        fontFamily: "Roboto-Medium",
        padding: 0,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: "#f0f0f0",
        borderLeftWidth: 0,
        height: "fit-content",
        paddingVertical: 10,
      }}
      text1Style={{
        fontFamily: "Roboto-Bold",
        fontSize: 14,
        color: "#191919",
        padding: 0,
      }}
      text2Style={{
        fontSize: 12,
        color: "#959595",
        fontFamily: "Roboto-Medium",
        padding: 0,
      }}
    />
  ),
};
