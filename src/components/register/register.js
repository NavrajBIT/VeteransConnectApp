import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View, Image } from "react-native";
import { register } from "../../api/register";
import { PrimaryButton } from "../../subcomponents/button";
import { Container } from "../../subcomponents/container";
import { BoldText, PrimaryText } from "../../subcomponents/text";
import { TextField } from "../../subcomponents/textfield";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";
import Popup from "../../subcomponents/popup";

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
  const [status, setStatus] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setechsPrimaryCardImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (phoneNumber.length != 10) {
      setStatus({
        title: "Invalid Mobile Number",
        text: "Please enter a valid Mobile Number.",
      });
      return;
    }
    setLoading(true);
    if (
      !echsCardNo ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !serviceNumber ||
      !rank
    ) {
      setLoading(false);
      setStatus({ title: "Error", text: "Please fill all * marked fields." });
    } else {
      if (!echsPrimaryCardImage) {
        setLoading(false);
        setStatus({ title: "Error", text: "Please provide ECHS card image." });
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
        })
        await sendOtp(phoneNumber)
          .then((res) => {
            if (res.status >= 200 && res.status <= 299) {
              navigation.navigate("OtpScreen")
              alert(
                "Request Submitted Successfully. Your application is under review by the admin. आपका खाता व्यवस्थापक द्वारा समीक्षाधीन है. कृपया अपने व्यवस्थापक से संपर्क करें. તમારું એકાઉન્ટ એડમિન દ્વારા સમીક્ષા હેઠળ છે. કૃપા કરીને તમારા એડમિનનો સંપર્ક કરો."
              );
              navigation.navigate("Loader");
            } else if (res.status === 401) {
              setStatus({
                title: phoneNumber,
                text: "This phone number is already registered. Please log in or try another phone number.",
              });
            } else {
              setStatus({
                title: "Error",
                text: "Something went wrong. Please contact your Admin.",
              });
            }
          })
          .catch((err) => {
            console.log(err);
            setStatus({
              title: "Error",
              text: "Something went wrong. Please contact your Admin.",
            });
          });
      }

      setLoading(false);
    }
  };

  if (loading) return <Loadingscreen text="Signing Up..." />;

  return (
    <Container>
      <Popup status={status} setStatus={setStatus} />
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
          label={"ECHS Card Number"}
          placeholder={"Enter ECHS Card Number"}
          value={echsCardNo}
          required
          onChangeText={(e) => setechsCardNo(e)}
        />
        <TextField
          label={"First Name"}
          placeholder={"Enter First Name"}
          required
          value={firstName}
          onChangeText={(e) => setFirstName(e.toString())}
        />
        <TextField
          label={"Middle Name"}
          placeholder={"Enter Middle Name"}
          value={middleName}
          onChangeText={(e) => setMiddleName(e.toString())}
        />
        <TextField
          label={"Last Name"}
          placeholder={"Enter Last Name"}
          value={lastName}
          required
          onChangeText={(e) => setLastName(e.toString())}
        />
        <TextField
          label={"Mobile Number"}
          placeholder={"Enter Mobile Number"}
          value={phoneNumber}
          required
          keyboardType="numeric"
          onChangeText={(e) => setphoneNumber(e)}
        />
        <TextField
          label={"Alternate Number"}
          keyboardType="numeric"
          placeholder={"Enter Alternate Contact Number"}
          value={alternateContact}
          onChangeText={(e) => setAlternateContact(e.toString())}
        />
        <TextField
          label={"Service Number"}
          placeholder={"Enter Service Number"}
          value={serviceNumber}
          required
          onChangeText={(e) => setServiceNumber(e.toString())}
        />
        <TextField
          label={"Rank"}
          placeholder={"Enter Rank"}
          value={rank}
          required
          onChangeText={(e) => setRank(e.toString())}
        />
        <View
          style={{
            paddingTop: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {echsPrimaryCardImage && (
            <Image
              style={{
                width: 200,
                height: 150,
                borderWidth: 1,
                borderRadius: 10,
              }}
              source={{ uri: echsPrimaryCardImage }}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 40,
          }}
        >
          <PrimaryText children={"Echs Card Image"} fontSize={16} />

          {echsPrimaryCardImage !== null ? (
            <TouchableOpacity onPress={pickImage}>
              <PrimaryText
                children={"Change Image"}
                fontSize={16}
                color={"#9164D8"}
              />
            </TouchableOpacity>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 10,
          }}
        >
          <PrimaryText children={"Already have an account?"} fontSize={16} />
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <PrimaryText
              children={"  Log In"}
              fontSize={16}
              color={"#9164D8"}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};
