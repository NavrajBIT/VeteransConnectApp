import AsyncStorage from "@react-native-async-storage/async-storage";
import { announcementURL, highlightsURL } from "../constants/api_constants";

export const fetchTrendingPosts = async () => {
  const token = await AsyncStorage.getItem("token");

  console.log(token);

  return await fetch(highlightsURL, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const fetchPosts = async () => {
  const token = await AsyncStorage.getItem("token");

  return await fetch(`${announcementURL}?page=1&category=&location=`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
