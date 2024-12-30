import { Image } from "react-native";
import { useEffect } from "react";
import { Container } from "../../subcomponents/container";
import { BoldText, PrimaryText } from "../../subcomponents/text";
import { View } from "react-native";
import Loaderanim from "./subcomponents/loaderanim";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Loader = ({ navigation }) => {
  useEffect(() => {
    const checkToken = async () => {
      const ln = await AsyncStorage.getItem("ln");

      if (ln !== "en" && ln !== "hn" && ln !== "gj") {
        navigation.navigate("Language");
      } else {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          navigation.navigate("Home");
        } else {
          navigation.navigate("Starter");
        }
      }
    };
    checkToken();
  }, []);
  return (
    <Container>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          gap: 20,
        }}
      >
        <Image
          source={require("../../assets/logo.png")}
          style={{
            width: 200,
            height: 200,
            marginBottom: 20,
            alignSelf: "center",
          }}
          resizeMode="contain"
        />
        <BoldText children={"Welcome to Veterans Connect"} fontSize={18} />
        <PrimaryText children={"Uniting Veterans. Empowering Lives"} />
        <Loaderanim />
      </View>
    </Container>
  );
};

export default Loader;
