import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginURL } from '../constants/api_constants'

export const login = async (mobile, otp) => {
  try {
    console.log('Attempting login with:', mobile, otp)

    const response = await fetch(loginURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: `+91${mobile}`,
        otp: otp,
      }),
    })

    console.log('Response status:', response.status)

    if (response.ok) {
      const data = await response.json()

      try {
        await AsyncStorage.setItem('token', data.data)
        const token = await AsyncStorage.getItem('token')
        console.log('Login successful:', token)
        // showSnackBar('Welcome back!')
        return true
      } catch (storageError) {
        console.error('Error storing token in AsyncStorage:', storageError)
      }
    } else {
      const errorData = await response.json()
      console.error('Login failed:', errorData.message || 'Unknown error')
      // showSnackBar(errorData.message || 'Login failed')
    }

    return false
  } catch (error) {
    console.error('Unexpected error during login:', error)
    // showSnackBar(error.message || 'An unexpected error occurred')
    return false
  } finally {
    console.log('Login process finished')
  }
}
