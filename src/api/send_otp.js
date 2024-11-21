import { sendOtpURL } from '../constants/api_constants'

export const sendOtp = async (mobileNumber) => {
  const token = ''
  try {
    const response = await fetch(
      `${sendOtpURL}?phone_number=91${mobileNumber}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )

    if (response.ok) {
    }
  } catch (error) {
    console.log('====================================')
    console.log(`error catch block ${error}`)
    console.log('====================================')
  }
}
