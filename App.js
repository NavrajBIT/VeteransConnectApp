import { useEffect, useState } from "react";
import usePreferences from "./subcomponents/preferences";
import Loader from "./components/loader/loader";
import { Starter } from "./components/starter/starter";
import Language from "./components/language/language";
import { Login } from "./components/login/login";
import { Register } from "./components/register/register";
import { OtpScreenSignup } from "./components/otp/otpsignup";
import { OtpScreen } from "./components/otp/otp";
import { Home } from "./components/home/home";
import { Search } from "./components/search/search";
import Profile from "./components/profile/profile";
import { EditProfile } from "./components/profile/edit_profile";
import { ViewFeedback } from "./components/feedback/view_feedback";
import { SendFeedback } from "./components/feedback/send_feedback";
import { Feedback } from "./components/feedback/feedback";
import { BlogDetails } from "./components/blog_details/blogDetails";
import { VeteransRegistration } from "./components/veterans_registration/veterans_registration";
import { NokRegistration } from "./components/nok_registration/nok_registration";
import { EchsRegistration } from "./components/echs_registration/echs_registration";

export default function App() {
  const [route, setRoute] = useState("Loader");
  const [routeProps, setRouteProps] = useState(null);
  const [prevRoute, setPrevRoute] = useState(["Loader"]);
  const { ln, th, prefUpdate } = usePreferences();

  const navigation = {
    params: routeProps,
    route,
    navigate: (route, params) => {
      setPrevRoute((prev) => {
        let newList = [...prev];
        newList.push(route);
        return newList;
      });
      setRoute(route);
      setRouteProps(params);
    },
    goBack: () => {
      setRoute(prevRoute[prevRoute.length - 2]);
      setPrevRoute((prev) => {
        let newList = [...prev];
        newList.pop();
        return newList;
      });
    },
    preferences: { ln: ln, th: th, prefUpdate: prefUpdate },
  };

  const pages = {
    Loader: <Loader navigation={navigation} />,
    Starter: <Starter navigation={navigation} />,
    Language: <Language navigation={navigation} />,
    Login: <Login navigation={navigation} />,
    Register: <Register navigation={navigation} />,
    OtpScreenSignup: <OtpScreenSignup navigation={navigation} />,
    OtpScreen: <OtpScreen navigation={navigation} />,

    Home: <Home navigation={navigation} />,
    Search: <Search navigation={navigation} />,
    Profile: <Profile navigation={navigation} />,
    BlogDetails: <BlogDetails navigation={navigation} />,

    EditProfile: <EditProfile navigation={navigation} />,
    VeteransRegistration: <VeteransRegistration navigation={navigation} />,
    NokRegistration: <NokRegistration navigation={navigation} />,
    EchsRegistration: <EchsRegistration navigation={navigation} />,

    ViewFeedback: <ViewFeedback navigation={navigation} />,
    SendFeedback: <SendFeedback navigation={navigation} />,
    Feedback: <Feedback navigation={navigation} />,
  };

  return pages[route];
}
