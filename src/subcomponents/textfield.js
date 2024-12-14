import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Dimensions, Text, TextInput, View } from "react-native";
import Preferences from "./preferences";
import { translation } from "./localization/translation";

export const TextField = ({
  label,
  icon,
  placeholder,
  value,
  required,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const { ln } = Preferences();

  try {
    label = ln === "en" ? label : translation[label][ln];
  } catch {}
  try {
    placeholder = ln === "en" ? placeholder : translation[placeholder][ln];
  } catch {}

  return (
    <View
      style={{
        width: Dimensions.get("window").width - 40,
        paddingHorizontal: 20,
        marginBottom: 20,
        position: "relative",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          padding: 10,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={24}
            color="#888"
            style={{ marginRight: 10, alignSelf: "center" }}
          />
        )}
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            color: "#000000",
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={`${placeholder}${required ? "*" : ""}`}
          placeholderTextColor="#888"
          value={value}
          {...restProps}
        />
      </View>
      {(isFocused || value) && (
        <Text
          style={{
            fontSize: 15,
            color: "#885ccd",
            marginBottom: 8,
            position: "absolute",
            top: -10,
            left: 40,
          }}
        >
          {label}
          {required && "*"}
        </Text>
      )}
    </View>
  );
};
