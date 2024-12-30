import { PrimaryButton } from "../../subcomponents/button";
import { Container } from "../../subcomponents/container";
import { BoldText, PrimaryText } from "../../subcomponents/text";
import { OtpImageSection } from "./subcomponents/image_section";
import React, { useState } from "react";
import { Dimensions, View, TouchableOpacity, ScrollView } from "react-native";
import { login } from "../../api/login";
import { sendOtp } from "../../api/send_otp";
import { OtpInput } from "./subcomponents/otp_input";
import { OtpTimer } from "./subcomponents/otp_timer";
import Popup from "../../subcomponents/popup";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { register } from "../../api/register";

export const OtpScreenSignup = ({ navigation }) => {
  const { phoneNumber } = navigation.params ?? "";
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [status, setStatus] = useState(null);
  const [cta, setCta] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOtp = async () => {
    setLoading(true);

    await sendOtp(phoneNumber)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setLoading(false);
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");
    console.log(otpCode);
    setLoading(true);
    await register({
      echsCardNo: navigation.params.echsCardNo,
      firstName: navigation.params.firstName,
      middleName: navigation.params.middleName,
      lastName: navigation.params.lastName,
      phoneNumber: navigation.params.phoneNumber,
      alternateContactNo: navigation.params.alternateContact,
      serviceNumber: navigation.params.serviceNumber,
      rank: navigation.params.rank,
      echsPrimaryCardImage: navigation.params.echsPrimaryCardImage,
      otp: otpCode,
    })
      .then((res) => {
        if (res.ok) {
          alert(
            "Request Submitted Successfully. Your application is under review by the admin. आपका खाता व्यवस्थापक द्वारा समीक्षाधीन है. कृपया अपने व्यवस्थापक से संपर्क करें. તમારું એકાઉન્ટ એડમિન દ્વારા સમીક્ષા હેઠળ છે. કૃપા કરીને તમારા એડમિનનો સંપર્ક કરો."
          );
          navigation.navigate("Loader");
        } else if (res.status === 401) {
          setStatus({
            title: phoneNumber,
            text: "This phone number is already registered. Please log in or try another phone number.",
          });
          setCta({
            title: "Log In",
            onPress: () => navigation.navigate("Login"),
          });
        } else if (res.status === 403) {
          setStatus({
            title: phoneNumber,
            text: "The OTP you entered is incorrect. Please enter the correct OTP received on your phone.",
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
    setLoading(false);
  };

  const handleResend = () => {
    handleOtp();
    setIsResendDisabled(true);
    setOtp("");
  };

  if (loading) return <Loadingscreen />;

  return (
    <Container>
      <Popup status={status} setStatus={setStatus} cta={cta} />
      <TouchableOpacity
        style={{ paddingLeft: 20, paddingTop: 20, width: "100%" }}
        onPress={() => navigation.goBack()}
      >
        <PrimaryText children={"< Back"} textAlign={"left"} fontSize={30} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: 20,
          paddingHorizontal: 20,
          paddingBottom: 20,
        }}
      >
        <BoldText children={"Verification"} fontSize={30} />

        <PrimaryText
          children={"Please enter the OTP received on your phone"}
          fontSize={20}
        />
        <PrimaryText children={phoneNumber} fontSize={20} />
        <OtpImageSection />
        <OtpInput length={6} otp={otp} setOtp={setOtp} />
        <View style={{ width: Dimensions.get("window").width - 40 }}>
          <PrimaryButton title={"Submit"} onPress={handleSubmit} />
        </View>
        <OtpTimer onResend={handleResend} />
      </ScrollView>
    </Container>
  );
};
