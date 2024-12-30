import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const usePreferences = () => {
  const [ln, setLn] = useState("en");
  const [th, setTh] = useState(1);

  const getlanguage = async () => {
    const language = await AsyncStorage.getItem("ln")
      .then((res) => res)
      .catch((err) => "en");
    if (!language || language == "null") {
      language = "en";
    }
    setLn(language);
  };
  const getTh = async () => {
    let textHeight = await AsyncStorage.getItem("th")
      .then((res) => res)
      .catch((err) => 1);
    console.log("text", textHeight);
    if (!textHeight || textHeight == "null") {
      textHeight = 1;
    } else {
      try {
        textHeight = parseInt(textHeight);
      } catch (e) {
        console.log(e);
        textHeight = 1;
      }
    }
    setTh(textHeight);
  };

  useEffect(() => {
    getlanguage();
    getTh();
  }, []);

  const prefUpdate = async () => {
    getlanguage();

    getTh();
  };

  return { ln: ln, th: th, prefUpdate: prefUpdate };
};

export default usePreferences;
