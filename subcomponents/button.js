import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity } from "react-native";
import Preferences from "./preferences";
import { translation } from "./localization/translation";

export const PrimaryButton = ({ title, onPress }) => {
  const { ln } = Preferences();
  let text = "";
  try {
    text = ln === "en" ? title : translation[title][ln];
  } catch {
    text = title;
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={["#9164D8", "#623AA2"]}
        style={{
          borderRadius: 40,
          padding: 20,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 18,
            letterSpacing: 1.0,
            paddingRight: 10,
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
