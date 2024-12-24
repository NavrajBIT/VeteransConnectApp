import { PrimaryButton } from "../../subcomponents/button";
import { Container } from "../../subcomponents/container";
import { BoldText, PrimaryText } from "../../subcomponents/text";
import { OtpImageSection } from "./subcomponents/image_section";

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { login } from "../../api/login";
import { sendOtp } from "../../api/send_otp";
import { OtpInput } from "./subcomponents/otp_input";
import { OtpTimer } from "./subcomponents/otp_timer";
import Popup from "../../subcomponents/popup";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const OtpScreen = ({ route }) => {
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [status, setStatus] = useState(null);
  const [cta, setCta] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleOtp = async () => {
    setLoading(true);

    await sendOtp(phoneNumber)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setLoading(false);
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");

    await login(phoneNumber, otpCode)
      .then(async (res) => {
        console.log(res.status);
        if (res.ok) {
          data = await res.json();
          await AsyncStorage.setItem("token", data.data);
          console.log(data);
          navigation.navigate("Layout");
        } else if (res.status == 400) {
          setStatus({
            title: "Error",
            text: "This account does not exist. Please sign up.",
          });
          setCta({
            title: "Sign Up",
            onPress: () => navigation.navigate("Register"),
          });
        } else if (res.status == 409) {
          setStatus({
            title: "Error",
            text: "Your profile has been rejected. Please contact your admin.",
          });
          setCta({
            title: "Sign Up",
            onPress: () => navigation.navigate("Register"),
          });
        } else if (res.status == 403) {
          setStatus({
            title: "Incorrect OTP",
            text: "The OTP you entered is incorrect. Please enter the correct OTP received on your phone.",
          });
          setOtp(Array(6).fill(""));
        } else if (res.status == 401) {
          setStatus({
            title: "Error",
            text: "Your Account is under review by the Admin. Please contact your Admin.",
          });
          setCta({
            title: "Get Started",
            onPress: () => navigation.navigate("Starter"),
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
    </Container>
  );
};
