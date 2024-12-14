import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginURL } from "../constants/api_constants";

export const login = async (mobile, otp) => {
  return await fetch(loginURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: `+91${mobile}`,
      otp: otp,
    }),
  });
};
