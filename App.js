import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { BlogDetails } from "./src/components/blog_details/blogDetails";
import { EchsRegistration } from "./src/components/echs_registration/echs_registration";
import { Feedback } from "./src/components/feedback/feedback";
import { SendFeedback } from "./src/components/feedback/send_feedback";
import { ViewFeedback } from "./src/components/feedback/view_feedback";
import { Layout } from "./src/components/home/layout";
import { Login } from "./src/components/login/login";
import { NokRegistration } from "./src/components/nok_registration/nok_registration";
import { OtpScreen } from "./src/components/otp/otp";
import { OtpScreenSignup } from "./src/components/otp/otpsignup";
import { EditProfile } from "./src/components/profile/edit_profile";
import { Register } from "./src/components/register/register";
import { Search } from "./src/components/search/search";
import { Starter } from "./src/components/starter/starter";
import { VeteransRegistration } from "./src/components/veterans_registration/veterans_registration";
import Loader from "./src/components/loader/loader";
import Language from "./src/components/language/language";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Loader" component={Loader} />
        <Stack.Screen name="Language" component={Language} />
        <Stack.Screen name="Starter" component={Starter} />
        <Stack.Screen name="Layout" component={Layout} />

        {/* Common Screens */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="OtpScreenSignup" component={OtpScreenSignup} />

        <Stack.Screen name="BlogDetails" component={BlogDetails} />
        <Stack.Screen name="NokRegistration" component={NokRegistration} />
        <Stack.Screen name="EchsRegistration" component={EchsRegistration} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ViewFeedback" component={ViewFeedback} />
        <Stack.Screen name="SendFeedback" component={SendFeedback} />
        <Stack.Screen name="Feedback" component={Feedback} />
        <Stack.Screen
          name="VeteransRegistration"
          component={VeteransRegistration}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
