import { registerURL } from '../constants/api_constants'

export const register = async ({
  echsPrimaryCardImage,
  firstName,
  middleName,
  lastName,
  phoneNumber,
  alternateContactNo,
  serviceNumber,
  rank,
  echsCardNo,
}) => {
  try {
    if (
      !echsPrimaryCardImage ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !serviceNumber ||
      !rank ||
      !echsCardNo
    ) {
      throw new Error('Please fill all required fields.')
    }

    const formData = new FormData()
    formData.append('echs_primary_card_image', echsPrimaryCardImage)
    formData.append('first_name', firstName)
    formData.append('middle_name', middleName || '')
    formData.append('last_name', lastName)
    formData.append('email', '')
    formData.append('phone_number', `+91${phoneNumber}`)
    formData.append('alternate_contact_no', alternateContactNo || '')
    formData.append('service_no', serviceNumber)
    formData.append('headquarters', '')
    formData.append('rank', rank)
    formData.append('dob', '')
    formData.append('date_of_enrollment', '')
    formData.append('date_of_death', '')
    formData.append('gallantry_awards', '')
    formData.append('pension_status', '')
    formData.append('pension_details', '')
    formData.append('ppo_no', '')
    formData.append('bank_name', '')
    formData.append('account_no', '')
    formData.append('echs_card_no', echsCardNo)
    formData.append('name_of_nok', '')
    formData.append('dob_of_nok', '')
    formData.append('relationship', '')
    formData.append('aadhar_card_no', '')
    formData.append('pan_card_no', '')
    formData.append('pension_uid', '')
    formData.append('domicile', '')
    formData.append('address', '')
    formData.append('city', '')
    formData.append('state', '')
    formData.append('pincode', '')
    formData.append('post_office_code', '')
    formData.append('nature_of_disability', '')

    console.log('====================================')
    console.log('here')
    console.log('====================================')

    const response = await fetch(registerURL, {
      method: 'POST',
      body: formData,
    })

    console.log('====================================')
    console.log(response.status)
    console.log('====================================')

    if (response.ok || response.status === 401) {
      const result = await response.json()
      console.log('====================================')
      console.log(result)
      console.log('====================================')
    } else {
      const errorData = await response.json()
      //   showSnackBar(errorData.message || 'An error occurred')
    }
  } catch (error) {
    // showSnackBar(error.message || 'An unexpected error occurred')
  } finally {
    // showSnackBar(error.message || 'An unexpected error occurred')
  }
}
