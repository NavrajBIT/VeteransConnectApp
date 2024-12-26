import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchFeedbackURL, sendFeedbackURL } from "../constants/api_constants";

export const fetchFeedback = async () => {
  const token = await AsyncStorage.getItem("token");

  try {
    const response = await fetch(`${fetchFeedbackURL}`, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // console.log('Response received:', response)

    if (response.ok) {
      const jsonData = await response.json();
      //   console.log('(fetch feedback) Data fetched successfully:', jsonData)
      return jsonData;
    } else {
      console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error during fetchPOst:", error);
  } finally {
    trendingLoading = false;
    console.log("Loading state set to false. Fetch process completed.");
  }
};

export const sendFeedback = async ({ title, description }) => {
  const token = await AsyncStorage.getItem("token");

  return await fetch(`${sendFeedbackURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      name: title,
      message: description,
    }),
  }).catch((err) => console.log(err));
};

export const fetchFeedbackById = async ({ id }) => {
  const token = await AsyncStorage.getItem("token");

  return await fetch(`${fetchFeedbackURL}${id}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};

export const respond = async ({
  id,
  message,
  imagePath = "",
  filePath = "",
}) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) {
    console.error("Token not found");
    return;
  }

  const formData = new FormData();
  formData.append("message", message);

  if (imagePath) {
    formData.append("image", {
      uri: imagePath,
      type: "image/jpeg",
      name: "image.jpg",
    });
  }

  if (filePath) {
    formData.append("file", {
      uri: filePath,
      type: "application/pdf",
      name: "file.pdf",
    });
  }

  return await fetch(`${fetchFeedbackURL}${id}/respond/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  });
};
