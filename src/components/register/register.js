import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { register } from "../../api/register";
import { PrimaryButton } from "../../subcomponents/button";
import { Container } from "../../subcomponents/container";
import { BoldText, PrimaryText } from "../../subcomponents/text";
import { TextField } from "../../subcomponents/textfield";

export const Register = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [echsCardNo, setechsCardNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [alternateContact, setAlternateContact] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [rank, setRank] = useState("");

  const [echsPrimaryCardImage, setechsPrimaryCardImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setechsPrimaryCardImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    try {
      console.log("====================================");
      console.log("Attempting to register");
      console.log("====================================");
      setLoading(true);
      if (
        !echsCardNo ||
        !firstName ||
        !lastName ||
        !phoneNumber ||
        !serviceNumber ||
        !rank ||
        !echsPrimaryCardImage
      ) {
        setLoading(false);
        throw new Error("Please fill all required fields.");
      } else {
        await register({
          echsCardNo,
          firstName,
          middleName,
          lastName,
          phoneNumber,
          alternateContact,
          serviceNumber,
          rank,
          echsPrimaryCardImage,
        });
        console.log("Registration successful");
        setLoading(false);
        navigation.navigate("Layout");
      }
    } catch (error) {
      console.log(error.message || "An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 120,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <BoldText children={"Create Account"} fontSize={30} />
        <View style={{ paddingTop: 20 }}></View>
        <TextField
          placeholder={"Enter ECHS Card Number"}
          value={echsCardNo}
          onChangeText={(e) => setechsCardNo(e)}
        />
        <TextField
          placeholder={"Enter First Name"}
          value={firstName}
          onChangeText={(e) => setFirstName(e.toString())}
        />
        <TextField
          placeholder={"Enter Middle Name"}
          value={middleName}
          onChangeText={(e) => setMiddleName(e.toString())}
        />
        <TextField
          placeholder={"Enter Last Name"}
          value={lastName}
          onChangeText={(e) => setLastName(e.toString())}
        />
        <TextField
          placeholder={"Enter Mobile Number"}
          value={phoneNumber}
          onChangeText={(e) => setphoneNumber(e)}
        />
        <TextField
          placeholder={"Enter Alternate Contact Number"}
          value={alternateContact}
          onChangeText={(e) => setAlternateContact(e.toString())}
        />
        <TextField
          placeholder={"Enter Service Number"}
          value={serviceNumber}
          onChangeText={(e) => setServiceNumber(e.toString())}
        />
        <TextField
          placeholder={"Enter Rank"}
          value={rank}
          onChangeText={(e) => setRank(e.toString())}
        />
        <View style={{ paddingTop: 20 }}></View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 40,
          }}
        >
          <PrimaryText children={"Echs Card Image"} fontSize={16} />
          {echsPrimaryCardImage !== null ? (
            <PrimaryText children={"Selected"} fontSize={16} />
          ) : (
            <TouchableOpacity onPress={pickImage}>
              <PrimaryText
                children={"Select Image"}
                fontSize={16}
                color={"#9164D8"}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{ paddingTop: 30 }}></View>
        <PrimaryButton title={"Register"} onPress={handleRegister} />
      </ScrollView>
    </Container>
  );
};
