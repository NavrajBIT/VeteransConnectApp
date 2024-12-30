import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDetailsURL } from "../constants/api_constants";

export const fetchUserData = async () => {
  const token = await AsyncStorage.getItem("token");

  return await fetch(`${getUserDetailsURL}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
