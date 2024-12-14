import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Preferences = () => {
  const [ln, setLn] = useState("en");

  const getlanguage = async () => {
    const language = await AsyncStorage.getItem("ln")
      .then((res) => res)
      .catch((err) => "en");
    if (!language || language == "null") {
      language = "en";
    }
    setLn(language);
  };

  useEffect(() => {
    getlanguage();
  }, []);

  return { ln: ln };
};

export default Preferences;
