import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import { registerUserECHS } from "../../api/echs_registration";
import { PrimaryButton } from "../../subcomponents/button";
import DropdownField from "../../subcomponents/dropdown/dropdown";
import { BoldText, PrimaryText } from "../../subcomponents/text";
import { TextField } from "../../subcomponents/textfield";
import Popup from "../../subcomponents/popup";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";
import { fetchUserData } from "../../api/get_user_data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const EchsRegistration = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [altMobileNumber, setAltMobileNumber] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [aadharCardNumber, setaadharCardNumber] = useState("");
  const [panCard, setpanCard] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const [tehsil, settehsil] = useState("");
  const [district, setdistrict] = useState("");
  const [village, setvillage] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pinCode, setpinCode] = useState("");

  const [echsFrontImage, setechsFrontImage] = useState(null);
  const [echsBackImage, setechsBackImage] = useState(null);

  const [serviceType, setserviceType] = useState("");
  const serviceOptions = [
    { label: "Army", value: "Army" },
    { label: "Navy", value: "Navy" },
    { label: "Air Force", value: "Air Force" },
  ];

  const [category, setcategory] = useState("");
  const categoryOptions = [
    { label: "Officer", value: "officer" },
    { label: "JCO", value: "jco" },
    { label: "OR", value: "or" },
  ];

  const [alive, setAlive] = useState(false);
  const toggleAliveSwitch = () => setAlive((previousState) => !previousState);

  const [primaryMember, setPrimaryMember] = useState(false);
  const togglePrimarySwitch = () =>
    setPrimaryMember((previousState) => !previousState);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !serviceNumber ||
      !accountNumber ||
      !tehsil ||
      !district ||
      !city ||
      !village ||
      !state ||
      !pinCode
    ) {
      setLoading(false);
      setStatus({
        title: "Error",
        text: "Please fill all * marked fields.",
      });
    } else if (!echsFrontImage || !echsBackImage) {
      setLoading(false);
      setStatus({
        title: "Error",
        text: "Please Select Images.",
      });
    } else {
      await registerUserECHS({
        isUpdate: false,
        id: "",
        echsCardFront: echsFrontImage,
        echsCardBack: echsBackImage,
        firstName,
        middleName,
        lastName,
        mobileNumber,
        altMobileNumber,
        isAlive: alive,
        serviceType,
        category,
        serviceNumber,
        accountNumber,
        adharCardNumber: aadharCardNumber,
        panCard,
        primaryMember,
        tehsil,
        district,
        village,
        city,
        state,
        pinCode,
      })
        .then((res) => {
          console.log(res);
          if (res.ok) {
            alert(
              "Request Submitted Successfully. Your application is under review by the admin. आपका खाता व्यवस्थापक द्वारा समीक्षाधीन है. कृपया अपने व्यवस्थापक से संपर्क करें. તમારું એકાઉન્ટ એડમિન દ્વારા સમીક્ષા હેઠળ છે. કૃપા કરીને તમારા એડમિનનો સંપર્ક કરો."
            );
            navigation.navigate("Home");
          } else {
            setStatus({
              title: "Error",
              text: "Something went wrong. Please contact your Admin.",
            });
          }
          return res;
        })
        .catch((err) => {
          console.log(err);
          setStatus({
            title: "Error",
            text: "Something went wrong. Please contact your Admin.",
          });
        });

      setLoading(false);
    }
  };

  const poppulateUserData = async () => {
    setLoading(true);
    await fetchUserData()
      .then(async (res) => {
        if (res.status == 401) {
          await AsyncStorage.clear();
          navigation.navigate("Loader");
        }
        return res;
      })
      .then((res) => res.json())
      .then((res) => {
        const data = res.data;
        setMiddleName(data.user.middle_name);
        setMobileNumber(data.user.phone_number ?? "");
        setFirstName(data.user.first_name ?? "");
        setLastName(data.user.last_name ?? "");
        setServiceNumber(data.service_no ?? "");
        setaccountNumber(data.account_no ?? "");
        setaadharCardNumber(data.user.aadhaar ?? "");
        setpanCard(data.pan_card_no ?? "");
        setcity(data.city ?? "");
        setstate(data.state ?? "");
        setpinCode(data.pincode ?? "");
        setAltMobileNumber(data.alternate_contact_no ?? "");
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  useEffect(() => {
    poppulateUserData();
  }, []);

  if (loading) return <Loadingscreen />;

  return (
    <SafeAreaView style={styles.container}>
      <Popup status={status} setStatus={setStatus} />
      <TouchableOpacity
        style={{ paddingLeft: 20 }}
        onPress={() => navigation.navigate("Home")}
      >
        <PrimaryText children={"<"} textAlign={"left"} fontSize={60} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BoldText
          children={"ECHS Registration"}
          fontSize={20}
          textAlign={"left"}
        />
        <View style={{ paddingTop: 20 }}>
          <TextField
            label={"First Name"}
            required
            placeholder={"Enter First Name"}
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
            required
            placeholder={"Enter Last Name"}
            value={lastName}
            onChangeText={(e) => setLastName(e.toString())}
          />
          <TextField
            label={"Mobile Number"}
            required
            placeholder={"Enter Mobile Number"}
            value={mobileNumber}
            onChangeText={(e) => setMobileNumber(e.toString())}
          />
          <TextField
            label={"Alternate Contact Number"}
            placeholder={"Enter Alternate Contact Number"}
            value={altMobileNumber}
            onChangeText={(e) => setAltMobileNumber(e.toString())}
          />
          <View style={styles.switchContainer}>
            <PrimaryText fontSize={16}>{"Alive"}</PrimaryText>
            <Switch
              style={styles.switch}
              onValueChange={toggleAliveSwitch}
              value={alive}
            />
          </View>
          <DropdownField
            label={"Service Type"}
            options={serviceOptions}
            selectedValue={serviceType}
            onValueChange={setserviceType}
            placeholder="Select Service Type"
          />
          <DropdownField
            label={"Category"}
            options={categoryOptions}
            selectedValue={category}
            onValueChange={setcategory}
            placeholder="Select Category"
          />
          <TextField
            label={"Service Number"}
            required
            placeholder={"Enter Service Number"}
            value={serviceNumber}
            onChangeText={(e) => setServiceNumber(e.toString())}
          />
          <TextField
            label={"Aadhar Number"}
            placeholder={"Enter Aadhar Number"}
            value={aadharCardNumber}
            onChangeText={(e) => setaadharCardNumber(e.toString())}
          />
          <TextField
            label={"Pan Card Number"}
            placeholder={"Enter Pan Card Number"}
            value={panCard}
            onChangeText={(e) => setpanCard(e.toString())}
          />
          <TextField
            label={"Account Number"}
            required
            placeholder={"Enter Account Number"}
            value={accountNumber}
            onChangeText={(e) => setaccountNumber(e.toString())}
          />
          <View style={styles.switchContainer}>
            <PrimaryText fontSize={16}>{"Primary Member"}</PrimaryText>
            <Switch
              style={styles.switch}
              onValueChange={togglePrimarySwitch}
              value={primaryMember}
            />
          </View>
          <TextField
            label={"Tehsil"}
            required
            placeholder={"Enter Tehsil"}
            value={tehsil}
            onChangeText={(e) => settehsil(e.toString())}
          />
          <TextField
            label={"District"}
            required
            placeholder={"Enter District"}
            value={district}
            onChangeText={(e) => setdistrict(e.toString())}
          />
          <TextField
            label={"Village"}
            required
            placeholder={"Enter Village"}
            value={village}
            onChangeText={(e) => setvillage(e.toString())}
          />
          <TextField
            label={"City"}
            required
            placeholder={"Enter City"}
            value={city}
            onChangeText={(e) => setcity(e.toString())}
          />
          <TextField
            label={"State"}
            required
            placeholder={"Enter State"}
            value={state}
            onChangeText={(e) => setstate(e.toString())}
          />
          <TextField
            label={"Pin Code"}
            required
            placeholder={"Enter Pin Code"}
            value={pinCode}
            onChangeText={(e) => setpinCode(e.toString())}
          />
          <View
            style={{
              paddingTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {echsFrontImage && (
              <Image
                style={{
                  width: 200,
                  height: 150,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                source={{ uri: echsFrontImage }}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 40,
              paddingVertical: 20,
            }}
          >
            <PrimaryText children={"Echs Card Front Image"} fontSize={16} />
            {echsFrontImage !== null ? (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setechsFrontImage);
                }}
              >
                <PrimaryText
                  children={"Change Image"}
                  fontSize={16}
                  color={"#9164D8"}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setechsFrontImage);
                }}
              >
                <PrimaryText
                  children={"Select Image"}
                  fontSize={16}
                  color={"#9164D8"}
                />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              paddingTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {echsBackImage && (
              <Image
                style={{
                  width: 200,
                  height: 150,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                source={{ uri: echsBackImage }}
              />
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 40,
              paddingVertical: 20,
            }}
          >
            <PrimaryText children={"Echs Card Back Image"} fontSize={16} />
            {echsBackImage !== null ? (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setechsBackImage);
                }}
              >
                <PrimaryText
                  children={"Change Image"}
                  fontSize={16}
                  color={"#9164D8"}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setechsBackImage);
                }}
              >
                <PrimaryText
                  children={"Select Image"}
                  fontSize={16}
                  color={"#9164D8"}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View
          style={{ width: Dimensions.get("window").width - 40, paddingTop: 20 }}
        >
          <PrimaryButton title={"Submit"} onPress={handleSubmit} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  switch: {
    transform: [{ scale: 1.5 }],
  },
});
