import { View, Text, Button } from "react-native";
import { PrimaryButton } from "../../subcomponents/button";
import { Container } from "../../subcomponents/container";
import { BoldText, PrimaryText } from "../../subcomponents/text";
import { StarterSection } from "./subcomponents/starter_section";

export const Starter = ({ navigation }) => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
          //   padding: 20,
          justifyContent: "center",
          gap: 20,
        }}
      >
        <StarterSection />
        <BoldText children={"Welcome to Veterans Connect"} fontSize={18} />
        <PrimaryText children={"Uniting Veterans. Empowering Lives"} />

        <PrimaryButton
          title={"Get Started"}
          onPress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
    </Container>
  );
};