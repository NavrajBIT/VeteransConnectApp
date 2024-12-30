import AsyncStorage from "@react-native-async-storage/async-storage";
import { announcementURL } from "../constants/api_constants";

export const fetchPostDetails = async (postId) => {
  const token = await AsyncStorage.getItem("token");

  return await fetch(`${announcementURL}/${postId}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
