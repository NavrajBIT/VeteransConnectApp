import AsyncStorage from '@react-native-async-storage/async-storage'
import { announcementURL, highlightsURL } from '../constants/api_constants'

export const fetchTrendingPosts = async () => {
  const token = await AsyncStorage.getItem('token')
  let trendingLoading = true

  console.log(token)
  // console.log('Starting fetchTrendingPosts...')

  try {
    // console.log('Setting loading state to true...')

    const response = await fetch(highlightsURL, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    })

    // console.log('Response received:', response)

    if (response.ok) {
      const jsonData = await response.json()
      // console.log('Data fetched successfully:', jsonData.results)
      return jsonData.results
    } else {
      console.error(`HTTP Error: ${response.status} - ${response.statusText}`)
    }
  } catch (error) {
    console.error('Error during fetchTrendingPosts:', error)
  } finally {
    trendingLoading = false
    console.log('Loading state set to false. Fetch process completed.')
  }
}

export const fetchPosts = async () => {
  const token = await AsyncStorage.getItem('token')
  let trendingLoading = true

  console.log(token)
  // console.log('Starting fetchPosts...')

  try {
    // console.log('Setting loading state to true...')

    const response = await fetch(
      `${announcementURL}?page=1&category=&location=`,
      {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    )

    // console.log('Response received:', response)

    if (response.ok) {
      const jsonData = await response.json()
      // console.log('(fetchPost) Data fetched successfully:', jsonData.results)
      return jsonData.results
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
