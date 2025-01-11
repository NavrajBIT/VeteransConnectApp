import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { registerUserNOK } from "../../api/nok_registration";
import { PrimaryButton } from "../../subcomponents/button";
import DatePickerField from "../../subcomponents/date_picker_field";
import DropdownField from "../../subcomponents/dropdown/dropdown";
import { BoldText, PrimaryText } from "../../subcomponents/text";
import { TextField } from "../../subcomponents/textfield";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";
import { Image } from "react-native";
import Popup from "../../subcomponents/popup";
import { fetchUserData } from "../../api/get_user_data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const NokRegistration = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [serviceNumber, setServiceNumber] = useState("");
  const [headquaters, setHeadquaters] = useState("");
  const [rank, setRank] = useState("");
  const [dob, setDOB] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [dateOfDeath, setdateOfDeath] = useState("");
  const [ppoNUmber, setppoNUmber] = useState("");
  const [bankName, setbankName] = useState("");
  const [accountNumber, setaccountNumber] = useState("");
  const [echsNumber, setechsNumber] = useState("");
  const [nameOfNok, setnameOfNok] = useState("");
  const [dateOfNOK, setdateOfNOK] = useState("");
  const [pensionUID, setpensionUID] = useState("");
  const [aadharCardNumber, setaadharCardNumber] = useState("");
  const [panCard, setpanCard] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pinCode, setpinCode] = useState("");
  const [PostofficeCode, setPostofficeCode] = useState("");
  const [Domicile, setDomicile] = useState("");

  const [relationShipStatus, setrelationShipStatus] = useState("");
  const relationOptions = [
    { label: "Unmarried", value: "unmarried" },
    { label: "Married", value: "married" },
    { label: "Divorced", value: "divorced" },
    { label: "Widowed", value: "widowed" },
    { label: "Seperated", value: "seperated" },
  ];

  const [passedAway, setPassedAway] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const togglePassedAwaySwitch = () =>
    setPassedAway((previousState) => !previousState);

  const [gallantaryAwards, setGallantaryAwards] = useState(false);
  const toggleGallantaryAwardsSwitch = () =>
    setGallantaryAwards((previousState) => !previousState);

  const [pension, setIsPension] = useState(false);
  const toggleIsPensionSwitch = () =>
    setIsPension((previousState) => !previousState);

  const [aadharFrontImage, setaadharFrontImage] = useState(null);
  const [aadharBackImage, setaadharBackImage] = useState(null);
  const [addressImage, setaddressImage] = useState(null);
  const [panImage, setpanImage] = useState(null);

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

    if (!firstName || !lastName || !mobileNumber || !serviceNumber || !rank) {
      setLoading(false);
      setStatus({ title: "Error", text: "Please fill all * marked fields." });
    } else {
      await registerUserNOK({
        isUpdate: true,
        aadharCardFront: aadharFrontImage,
        aadharCardBack: aadharBackImage,
        panCardImage: panImage,
        addressProof: addressImage,
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        serviceNumber: serviceNumber,
        headquarters: headquaters,
        rank: rank,
        dateOfBirth: dob,
        dateOfEnrollment: enrollmentDate,
        dateOfDeath: dateOfDeath,
        isGalantry: gallantaryAwards,
        isPension: pension,
        ppoNo: ppoNUmber,
        bankName: bankName,
        accountNumber: accountNumber,
        echsCardNo: echsNumber,
        nokName: nameOfNok,
        dateOfNok: dateOfNOK,
        relationShip: relationShipStatus,
        adharCardNumber: aadharCardNumber,
        panCard: panCard,
        pensionUid: pensionUID,
        domicile: Domicile,
        address,
        city,
        state,
        pinCode,
        postOfficeCode: PostofficeCode,
      })
        .then((res) => {
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
        setHeadquaters(data.headquarters ?? "");
        setMobileNumber(data.user.phone_number ?? "");
        setFirstName(data.user.first_name ?? "");
        setLastName(data.user.last_name ?? "");
        setServiceNumber(data.service_no ?? "");
        setRank(data.rank ?? "");
        setDOB(data.dob ?? "");
        setEnrollmentDate(data.date_of_enrollment ?? "");
        setdateOfDeath(data.date_of_death ?? "");
        setppoNUmber(data.ppo_no ?? "");
        setbankName(data.bank_name ?? "");
        setaccountNumber(data.account_no ?? "");
        setechsNumber(data.echs_card_no ?? "");
        setnameOfNok(data.name_of_nok ?? "");
        setdateOfNOK(data.dob_of_nok ?? "");
        setpensionUID(data.pension_uid ?? "");
        setaadharCardNumber(data.aadhar_card_no ?? "");
        setpanCard(data.pan_card_no ?? "");
        setaddress(data.address ?? "");
        setcity(data.city ?? "");
        setstate(data.state ?? "");
        setpinCode(data.pincode ?? "");
        setPostofficeCode(data.post_office_code ?? "");
        setDomicile(data.domicile ?? "");
        setrelationShipStatus(() => {
          let status = null;
          relationOptions.map((opt) => {
            if (opt.value == data.relationship) {
              status = opt;
            }
          });
          return status;
        });
        setPassedAway(() => {
          if (data.date_of_death) return true;
          else return false;
        });
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          style={{
            margin: 10,
            backgroundColor: "green",
            borderRadius: 10,
            width: 60,
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <PrimaryText
            children={"<"}
            textAlign={"center"}
            color={"white"}
            fontSize={60}
          />
        </TouchableOpacity>
        <BoldText
          children={"NOK Registration"}
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
            label={"Last Name"}
            required
            placeholder={"Enter Last Name"}
            value={lastName}
            onChangeText={(e) => setLastName(e.toString())}
          />
          <TextField
            keyboardType="numeric"
            label={"Mobile Number"}
            placeholder={"Enter Mobile Number"}
            value={mobileNumber}
            required
            onChangeText={(e) => null}
          />
          <TextField
            label={"Service Number"}
            placeholder={"Enter Service Number"}
            value={serviceNumber}
            required
            onChangeText={(e) => setServiceNumber(e.toString())}
          />
          <TextField
            label={"Headquarter"}
            placeholder={"Enter Headquater"}
            value={headquaters}
            onChangeText={(e) => setHeadquaters(e.toString())}
          />
          <TextField
            label={"Rank"}
            required
            placeholder={"Enter Rank"}
            value={rank}
            onChangeText={(e) => setRank(e.toString())}
          />

          <DatePickerField
            label={"Date of Birth"}
            value={dob}
            onChange={(date) => setDOB(date)}
            placeholder="Select Date of Birth"
          />
          <DatePickerField
            label={"Date of Enrollment"}
            value={enrollmentDate}
            onChange={(date) => setEnrollmentDate(date)}
            placeholder="Select Date of Enrollment"
          />
          <View style={styles.switchContainer}>
            <PrimaryText fontSize={16}>{"Passed Away"}</PrimaryText>
            <Switch
              style={styles.switch}
              onValueChange={togglePassedAwaySwitch}
              value={passedAway}
            />
          </View>
          {passedAway && (
            <DatePickerField
              label={"Date of Death"}
              value={dateOfDeath}
              onChange={(date) => setdateOfDeath(date)}
              placeholder="Select Date of Death"
            />
          )}
          <View style={styles.switchContainer}>
            <PrimaryText fontSize={16}>{"Gallantary Awards"}</PrimaryText>
            <Switch
              style={styles.switch}
              onValueChange={toggleGallantaryAwardsSwitch}
              value={gallantaryAwards}
            />
          </View>
          <View style={styles.switchContainer}>
            <PrimaryText fontSize={16}>{"Getting Pension"}</PrimaryText>
            <Switch
              style={styles.switch}
              onValueChange={toggleIsPensionSwitch}
              value={pension}
            />
          </View>
          {pension && (
            <View>
              <TextField
                label={"PPO number"}
                placeholder={"Enter PPO number"}
                value={ppoNUmber}
                onChangeText={(e) => setppoNUmber(e.toString())}
              />
              <TextField
                label={"Bank Name"}
                placeholder={"Enter Bank Name"}
                value={bankName}
                onChangeText={(e) => setbankName(e.toString())}
              />
              <TextField
                label={"Account Number"}
                placeholder={"Enter Account Number"}
                value={accountNumber}
                onChangeText={(e) => setaccountNumber(e.toString())}
              />
              <TextField
                label={"ECHS Card Number"}
                placeholder={"Enter ECHS number"}
                value={echsNumber}
                onChangeText={(e) => setechsNumber(e.toString())}
              />
              <TextField
                label={"Pension UID"}
                placeholder={"Enter Pension UID"}
                value={pensionUID}
                onChangeText={(e) => setpensionUID(e.toString())}
              />
            </View>
          )}
          <TextField
            label={"Name of NOK"}
            placeholder={"Enter Name of NOK"}
            value={nameOfNok}
            onChangeText={(e) => setnameOfNok(e.toString())}
          />
          <DatePickerField
            label={"Date of NOK"}
            value={dateOfNOK}
            onChange={(date) => setdateOfNOK(date)}
            placeholder="Select Date of NOK"
          />
          <DropdownField
            label={"Relation"}
            options={relationOptions}
            selectedValue={relationShipStatus}
            onValueChange={setrelationShipStatus}
            placeholder="Select RelationShipStatus"
          />
          {/* <TextField
            placeholder={"Enter Name of NOK"}
            value={nameOfNok}
            onChangeText={(e) => setnameOfNok(e.toString())}
          /> */}
          <TextField
            label={"Aadhar Number"}
            required
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
            label={"Address"}
            placeholder={"Enter Address"}
            value={address}
            onChangeText={(e) => setaddress(e.toString())}
          />
          <TextField
            label={"City"}
            placeholder={"Enter City"}
            value={city}
            onChangeText={(e) => setcity(e.toString())}
          />
          <TextField
            label={"State"}
            placeholder={"Enter State"}
            value={state}
            onChangeText={(e) => setstate(e.toString())}
          />
          <TextField
            label={"Pin Code"}
            placeholder={"Enter Pin Code"}
            value={pinCode}
            onChangeText={(e) => setpinCode(e.toString())}
          />
          <TextField
            label={"Post Office Code"}
            placeholder={"Enter Post Office Code"}
            value={PostofficeCode}
            onChangeText={(e) => setPostofficeCode(e.toString())}
          />
          <View
            style={{
              paddingTop: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {aadharFrontImage && (
              <Image
                style={{
                  width: 200,
                  height: 150,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                source={{ uri: aadharFrontImage }}
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
            <PrimaryText children={"Aadhar Card Front Image"} fontSize={16} />
            {aadharFrontImage !== null ? (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setaadharFrontImage);
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
                  pickImage(setaadharFrontImage);
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
            {aadharBackImage && (
              <Image
                style={{
                  width: 200,
                  height: 150,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                source={{ uri: aadharBackImage }}
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
            <PrimaryText children={"Aadhar Card Back Image"} fontSize={16} />
            {aadharBackImage !== null ? (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setaadharBackImage);
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
                  pickImage(setaadharBackImage);
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
            {addressImage && (
              <Image
                style={{
                  width: 200,
                  height: 150,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                source={{ uri: addressImage }}
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
            <PrimaryText children={"Address Image"} fontSize={16} />
            {addressImage !== null ? (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setaddressImage);
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
                  pickImage(setaddressImage);
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
            {panImage && (
              <Image
                style={{
                  width: 200,
                  height: 150,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                source={{ uri: panImage }}
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
            <PrimaryText children={"Pan Card Image"} fontSize={16} />
            {panImage !== null ? (
              <TouchableOpacity
                onPress={() => {
                  pickImage(setpanImage);
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
                  pickImage(setpanImage);
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
        <View style={{ width: Dimensions.get("window").width - 40 }}>
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
    paddingTop: 40,
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
    paddingHorizontal: 20,
  },
  switch: {
    transform: [{ scale: 1.5 }],
  },
});
