import { View } from "react-native";
import { PrimaryText, BoldText } from "./text";
import { PrimaryButton } from "./button";
import Preferences from "./preferences";
import { translation } from "./localization/translation";

const Popup = ({ status, setStatus, cta }) => {
  const { ln } = Preferences();
  let title = "";
  try {
    title = ln === "en" ? status.title : translation[status.title][ln];
  } catch {
    try {
      title = status.title;
    } catch {
      title = null;
    }
  }
  let text = "";
  try {
    text = ln === "en" ? status.text : translation[status.text][ln];
  } catch {
    try {
      text = status.text;
    } catch {
      text = null;
    }
  }
  if (!status) return null;
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.9)",
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <View
        style={{
          padding: 20,
          backgroundColor: "white",
          borderRadius: 10,
          display: "flex",
          gap: 10,
        }}
      >
        {status.title && (
          <BoldText fontSize={18} children={title} textAlign={"left"} />
        )}
        {status.text && <PrimaryText fontSize={15} children={text} />}
        {cta && <PrimaryButton title={cta.title} onPress={cta.onPress} />}
        <PrimaryButton title="OK" onPress={() => setStatus(null)} />
      </View>
    </View>
  );
};

export default Popup;
