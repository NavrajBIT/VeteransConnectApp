import AsyncStorage from '@react-native-async-storage/async-storage'
import { announcementURL } from '../constants/api_constants'

export const fetchPostDetails = async (postId) => {
  const token = await AsyncStorage.getItem('token')
  let trendingLoading = true

  console.log(token)
  console.log('Starting fetchPostDetails...')

  try {
    console.log('Setting loading state to true...')

    const response = await fetch(`${announcementURL}/${postId}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    })

    console.log('Response received:', response)

    if (response.ok) {
      const jsonData = await response.json()
      console.log('(fetchPostDetails) Data fetched successfully:', jsonData)
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
