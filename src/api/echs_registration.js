import AsyncStorage from "@react-native-async-storage/async-storage";
import { echsRegistrationURL } from "../constants/api_constants";

export const registerUserECHS = async ({
  isUpdate,
  id,
  echsCardFront,
  echsCardBack,
  firstName,
  middleName,
  lastName,
  mobileNumber,
  altMobileNumber,
  isAlive,
  serviceType,
  category,
  serviceNumber,
  accountNumber,
  adharCardNumber,
  panCard,
  primaryMember,
  tehsil,
  district,
  village,
  city,
  state,
  pinCode,
}) => {
  const formData = new FormData();

  if (echsCardFront) {
    formData.append("echs_card_front", echsCardFront);
  }
  if (echsCardBack) {
    formData.append("echs_card_back", echsCardBack);
  }

  formData.append("first_name", firstName);
  formData.append("middle_name", middleName || "");
  formData.append("last_name", lastName);
  formData.append("phone_number", mobileNumber);
  formData.append("alternate_contact_no", altMobileNumber);
  formData.append("alive", isAlive);
  formData.append("is_primary_member", primaryMember);
  formData.append("service_type", serviceType);
  formData.append("category", category);
  formData.append("service_no", serviceNumber);
  formData.append("account_no", accountNumber || "");
  formData.append("aadhar", adharCardNumber);
  formData.append("pan_card", panCard);
  formData.append("Tehsil", tehsil);
  formData.append("District", district);
  formData.append("Village", village);
  formData.append("city", city);
  formData.append("state", state);
  formData.append("pincode", pinCode);

  const token = await AsyncStorage.getItem("token");

  return await fetch(`${echsRegistrationURL}${id}`, {
    method: isUpdate ? "PATCH" : "POST",
    body: formData,
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
