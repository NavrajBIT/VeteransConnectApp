import { Container } from "../../subcomponents/container";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PrimaryText } from "../../subcomponents/text";
import { BoldText } from "../../subcomponents/text";
import { PrimaryButton } from "../../subcomponents/button";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Language = () => {
  const navigation = useNavigation();
  const [ln, setLn] = useState("en");

  const handleNext = async () => {
    await AsyncStorage.setItem("ln", ln);
    navigation.navigate("Loader");
  };

  return (
    <Container>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          gap: 20,
        }}
      >
        <BoldText
          children={
            ln === "en"
              ? "Select Language:"
              : ln === "hn"
              ? "भाषा चुने"
              : "ભાષા પસંદ કરો"
          }
          fontSize={30}
        />

        <TouchableOpacity
          style={{
            width: 300,
            borderWidth: 2,
            borderColor: "#885ccd",
            padding: 20,
            borderRadius: 10,
            backgroundColor:
              ln === "en" ? "rgba(136,92,205,0.5)" : "transparent",
          }}
          onPress={() => setLn("en")}
        >
          <PrimaryText children={"English"} fontSize={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 300,
            borderWidth: 2,
            borderColor: "#885ccd",
            padding: 20,
            borderRadius: 10,
            backgroundColor:
              ln === "hn" ? "rgba(136,92,205,0.5)" : "transparent",
          }}
          onPress={() => setLn("hn")}
        >
          <PrimaryText children={"हिंदी"} fontSize={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 300,
            borderWidth: 2,
            borderColor: "#885ccd",
            padding: 20,
            borderRadius: 10,
            backgroundColor:
              ln === "gj" ? "rgba(136,92,205,0.5)" : "transparent",
          }}
          onPress={() => setLn("gj")}
        >
          <PrimaryText children={"ગુજરાતી"} fontSize={30} />
        </TouchableOpacity>

        <PrimaryButton
          title={ln === "en" ? "Next >" : ln === "hn" ? "अगला >" : "આગળ >"}
          onPress={handleNext}
        />
      </View>
    </Container>
  );
};

export default Language;
