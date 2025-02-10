import { Text } from "react-native";
import Preferences from "./preferences";
import { translation } from "./localization/translation";

export const BoldText = ({ children, fontSize, textAlign, color }) => {
  const { ln } = Preferences();
  let text = "";
  try {
    text = ln === "en" ? children : translation[children][ln];
  } catch {
    text = children;
  }
  return (
    <Text
      style={{
        fontWeight: "bold",
        fontSize: fontSize ? fontSize : 14,
        textAlign: textAlign ? textAlign : "center",
        color: color ? color : "#000000",
      }}
    >
      {text}
    </Text>
  );
};

export const PrimaryText = ({ children, fontSize, textAlign, color }) => {
  const { ln } = Preferences();
  let text = "";
  try {
    text = ln === "en" ? children : translation[children][ln];
  } catch {
    text = children;
  }
  return (
    <Text
      style={{
        fontSize: fontSize ? fontSize : 14,
        textAlign: textAlign ? textAlign : "center",
        color: color ? color : "#000000",
      }}
    >
      {text}
    </Text>
  );
};
