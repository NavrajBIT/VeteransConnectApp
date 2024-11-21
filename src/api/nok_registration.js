import AsyncStorage from '@react-native-async-storage/async-storage'
import { nokRegistrationURL } from '../constants/api_constants'

export const registerUserNOK = async ({
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
  dateOfEnrollment,
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
  try {
    if (
      !firstName ||
      !lastName ||
      !mobileNumber ||
      !serviceNumber ||
      !rank ||
      !adharCardNumber ||
      !panCard
    ) {
      throw new Error('Please fill all required fields.')
    }

    const formData = new FormData()

    if (aadharCardFront) {
      formData.append('addharcard_front', aadharCardFront)
    }
    if (aadharCardBack) {
      formData.append('aadharcard_back', aadharCardBack)
    }
    if (panCardImage) {
      formData.append('pan_card_doc', panCardImage)
    }
    if (addressProof) {
      formData.append('address_proof', addressProof)
    }

    formData.append('first_name', firstName)
    formData.append('last_name', lastName)
    formData.append('email', email || '')
    formData.append('phone_number', mobileNumber)
    formData.append('service_no', serviceNumber)
    formData.append('headquarters', headquarters || '')
    formData.append('rank', rank)
    formData.append('dob', dateOfBirth || '')
    formData.append('date_of_enrollment', '')
    // formData.append('date_of_enrollment', dateOfEnrollment || '')
    formData.append('date_of_death', dateOfDeath)
    formData.append('gallantry_awards', isGalantry.toString())
    formData.append('pension_status', isPension.toString())
    formData.append('pension_details', '')
    formData.append('ppo_no', ppoNo || '')
    formData.append('bank_name', bankName || '')
    formData.append('account_no', accountNumber || '')
    formData.append('echs_card_no', echsCardNo || '')
    formData.append('name_of_nok', nokName || '')
    formData.append('dob_of_nok', '')
    // formData.append('dob_of_nok', dateOfNok || '')
    formData.append('relationship', relationShip || '')
    formData.append('aadhar_card_no', adharCardNumber)
    formData.append('pan_card_no', panCard)
    formData.append('pension_uid', pensionUid || '')
    formData.append('domicile', domicile || '')
    formData.append('address', address)
    formData.append('city', city)
    formData.append('state', state)
    formData.append('pincode', pinCode)
    formData.append('post_office_code', postOfficeCode)

    const token = await AsyncStorage.getItem('token')

    const response = await fetch(nokRegistrationURL, {
      method: isUpdate ? 'PATCH' : 'POST',
      body: formData,
      headers: {
        Authorization: `Token ${token}`,
      },
    })

    if (response.ok) {
      const result = await response.json()
      console.log(result)
    } else if (response.status === 500) {
      console.log(
        'Form already submitted once, please wait until the verification is complete.'
      )
    } else {
      const errorData = await response.json()
      console.log(errorData || 'An error occurred')
    }
  } catch (error) {
    console.log(error.message || 'An unexpected error occurred')
  }
}
