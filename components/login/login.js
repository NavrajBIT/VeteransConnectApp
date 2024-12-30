import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { sendOtp } from "../../api/send_otp";
import { PrimaryButton } from "../../subcomponents/button";
import { Container } from "../../subcomponents/container";
import { BoldText, PrimaryText } from "../../subcomponents/text";
import { TextField } from "../../subcomponents/textfield";
import { LoginSection } from "./subcomponents/login_section";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";
import Popup from "../../subcomponents/popup";

export const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [cta, setCta] = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setCta(null);
    await sendOtp(`+91${phoneNumber}`)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          navigation.navigate("OtpScreen", {
            phoneNumber: `+91${phoneNumber}`,
          });
        } else if (res.status == 400) {
          setStatus({
            title: "Error",
            text: "No account exists with this phone number. Please sign up.",
          });
          setCta({
            title: "Sign Up",
            onPress: () => navigation.navigate("Register"),
          });
        } else if (res.status == 401) {
          setStatus({
            title: "Error",
            text: "Your Account is under review by the Admin. Please contact your Admin.",
          });
        } else {
          setStatus({
            title: "Error",
            text: "Something went wrong. Please contact your Admin.",
          });
        }
      })
      .catch((err) =>
        setStatus({
          title: "Error",
          text: "Something went wrong. Please contact your Admin.",
        })
      );

    setLoading(false);
  };
  if (loading) return <Loadingscreen />;
  return (
    <Container>
      <Popup status={status} setStatus={setStatus} cta={cta} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          gap: 20,
        }}
      >
        <BoldText children={"Welcome Back"} fontSize={30} />
        <LoginSection />
        <TextField
          placeholder={"Enter Mobile Number"}
          keyboardType="numeric"
          icon={"phone-portrait"}
          value={phoneNumber}
          onChangeText={(e) => setPhoneNumber(e.toString())}
        />
        <PrimaryButton
          title={"Submit"}
          onPress={() => {
            if (phoneNumber.length != 10) {
              setStatus({
                title: "Invalid Mobile Number",
                text: "Please enter a valid Mobile Number.",
              });
            } else {
              handleLogin();
            }
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <PrimaryText children={"Don't have an account?"} fontSize={16} />
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <PrimaryText
              children={"  Sign Up"}
              fontSize={16}
              color={"#9164D8"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};
