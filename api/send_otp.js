import { sendOtpURL } from "../constants/api_constants";

export const sendOtp = async (mobileNumber) => {
  const token = "";

  return await fetch(`${sendOtpURL}?phone_number=${mobileNumber}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
