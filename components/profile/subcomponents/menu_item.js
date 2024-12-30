import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Preferences from "../../../subcomponents/preferences";
import { translation } from "../../../subcomponents/localization/translation";

const MenuItem = ({ icon, label, onPress }) => {
  const { ln } = Preferences();

  try {
    label = ln === "en" ? label : translation[label][ln];
  } catch {
    label = label;
  }

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#8C8C8C" />
      <Text style={styles.menuLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={24} color="#8C8C8C" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },
});

export default MenuItem;
