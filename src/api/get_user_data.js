import AsyncStorage from '@react-native-async-storage/async-storage'
import { getUserDetailsURL } from '../constants/api_constants'

export const fetchUserData = async () => {
  const token = await AsyncStorage.getItem('token')

  console.log('Starting get user details...')

  try {
    const response = await fetch(`${getUserDetailsURL}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    })

    // console.log('Response received:', response)

    if (response.ok) {
      const jsonData = await response.json()
      //   console.log('(get user details) Data fetched successfully:', jsonData)
      return jsonData
    } else {
      console.error(`HTTP Error: ${response.status} - ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error during fetchPOst:', error)
  } finally {
    trendingLoading = false
    console.log('Loading state set to false. Fetch process completed.')
  }
}