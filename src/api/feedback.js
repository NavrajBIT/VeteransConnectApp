import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchFeedbackURL, sendFeedbackURL } from '../constants/api_constants'

export const fetchFeedback = async () => {
  const token = await AsyncStorage.getItem('token')

  console.log('Starting to fetch feedback...')

  try {
    const response = await fetch(`${fetchFeedbackURL}`, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    })

    // console.log('Response received:', response)

    if (response.ok) {
      const jsonData = await response.json()
      //   console.log('(fetch feedback) Data fetched successfully:', jsonData)
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

export const sendFeedback = async ({ title, description }) => {
  const token = await AsyncStorage.getItem('token')

  console.log('Starting to send feedback...')

  try {
    const response = await fetch(`${sendFeedbackURL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        name: title,
        message: description,
      }),
    })

    console.log('Response received:', response)

    if (response.ok) {
      const jsonData = await response.json()
      console.log('(send feedback) Data sent successfully:', jsonData)
      return jsonData
    } else {
      console.error(`HTTP Error: ${response.status} - ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error during send feedback:', error)
  } finally {
    trendingLoading = false
    console.log('Loading state set to false. Send feedback process completed.')
  }
}
