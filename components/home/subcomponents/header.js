import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export const Header = ({ changeTh, navigation }) => {
  let th = navigation.preferences.th;
  let ln = navigation.preferences.ln;

  const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
    },
    headerTextContainer: {
      flexDirection: "row",
      gap: 8,
    },
    headerIcon: {
      fontSize: th === 1 ? 16 : th === 2 ? 24 : 32,
      color: "#333",
      paddingHorizontal: 4,
    },
    language: {
      fontSize: th === 1 ? 16 : th === 2 ? 24 : 32,
      color: "#333",
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.headerTextContainer}>
        <TouchableOpacity onPress={() => changeTh("dec")}>
          <Text style={styles.headerIcon}>-A</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeTh("inc")}>
          <Text style={styles.headerIcon}>+A</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("Language")}
      >
        <Image
          source={require("../../../assets/ln.png")}
          style={{ width: 20, height: 20 }}
        />
        <Text style={styles.language}>
          {ln === "hn" ? "हिंदी" : ln === "gj" ? "ગુજરાતી" : "English"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
