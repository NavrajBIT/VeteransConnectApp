import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserDetailsURL } from "../constants/api_constants";
import { appendImageToFormdata } from "./tools";

export const editMugshot = async (mugshot) => {
  let formData = new FormData();
  formData = appendImageToFormdata(mugshot, "mugshot", formData);

  const token = await AsyncStorage.getItem("token");

  return await fetch(getUserDetailsURL, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
