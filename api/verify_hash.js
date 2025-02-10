import AsyncStorage from "@react-native-async-storage/async-storage";
import { verifyURL } from "../constants/api_constants";

export const verifyQRCode = async (hash) => {
  const token = await AsyncStorage.getItem("token");

  return await fetch(`${verifyURL}?hash=${hash}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
