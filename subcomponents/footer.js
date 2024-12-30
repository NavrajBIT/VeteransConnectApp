import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

const Footer = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        padding: 20,
      }}
    >
      <FontAwesome
        name="home"
        size={30}
        color={navigation.route === "Home" ? "#885CCD" : "#000000"}
        onPress={() => navigation.navigate("Home")}
      />
      <FontAwesome
        name="search"
        size={30}
        color={navigation.route === "Search" ? "#885CCD" : "#000000"}
        onPress={() => navigation.navigate("Search")}
      />
      <FontAwesome
        name="user"
        size={30}
        color={navigation.route === "Profile" ? "#885CCD" : "#000000"}
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

export default Footer;
