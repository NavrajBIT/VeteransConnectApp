import AsyncStorage from "@react-native-async-storage/async-storage";
import { veteranRegistrationURL } from "../constants/api_constants";
import { correctDateFormat, appendImageToFormdata } from "./tools";

export const registerVeteran = async ({
  isUpdate,
  aadharCardFront,
  aadharCardBack,
  panCardImage,
  addressProof,
  firstName,
  lastName,
  email,
  mobileNumber,
  serviceNumber,
  headquarters,
  rank,
  dateOfBirth,
  dateOfDeath,
  isGalantry,
  isPension,
  ppoNo,
  bankName,
  accountNumber,
  echsCardNo,
  nokName,
  dateOfNok,
  relationShip,
  adharCardNumber,
  panCard,
  pensionUid,
  domicile,
  address,
  city,
  state,
  pinCode,
  postOfficeCode,
}) => {
  let formData = new FormData();

  formData = appendImageToFormdata(
    aadharCardFront,
    "aadharcard_front",
    formData
  );

  formData = appendImageToFormdata(aadharCardBack, "aadharcard_back", formData);

  formData = appendImageToFormdata(panCardImage, "pan_card_doc", formData);

  formData = appendImageToFormdata(addressProof, "address_proof", formData);

  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("email", email || "");
  formData.append("phone_number", mobileNumber);
  formData.append("service_no", serviceNumber);
  formData.append("headquarters", headquarters || "");
  formData.append("rank", rank);
  formData.append("dob", correctDateFormat(dateOfBirth) || "");
  formData.append("date_of_death", correctDateFormat(dateOfDeath));
  formData.append("gallantry_awards", isGalantry.toString());
  formData.append("pension_status", isPension.toString());
  formData.append("pension_details", "");
  formData.append("ppo_no", ppoNo || "");
  formData.append("bank_name", bankName || "");
  formData.append("account_no", accountNumber || "");
  formData.append("echs_card_no", echsCardNo || "");
  formData.append("name_of_nok", nokName || "");
  formData.append("dob_of_nok", correctDateFormat(dateOfNok) || "");
  formData.append("relationship", relationShip || "");
  formData.append("aadhar_card_no", adharCardNumber);
  formData.append("pan_card_no", panCard);
  formData.append("pension_uid", pensionUid || "");
  formData.append("domicile", domicile || "");
  formData.append("address", address);
  formData.append("city", city);
  formData.append("state", state);
  formData.append("pincode", pinCode);
  formData.append("post_office_code", postOfficeCode);

  const token = await AsyncStorage.getItem("token");
  return await fetch(veteranRegistrationURL, {
    method: isUpdate ? "PATCH" : "POST",
    body: formData,
    headers: {
      Authorization: `Token ${token}`,
    },
  });
};
