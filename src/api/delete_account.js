import AsyncStorage from '@react-native-async-storage/async-storage'

export const deleteAccount = async () => {
  const token = await AsyncStorage.getItem('token')
  try {
    console.log('Attempting to delete account')

    const response = await fetch(loginURL, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
      },
    })

    console.log('Response status:', response.status)

    if (response.ok || response.status === 201) {
      const data = await response.json()

      console.log('Delete successful:', token)
      return true
    } else {
      const errorData = await response.json()
      console.error('Delete failed:', errorData.message || 'Unknown error')
    }

    return false
  } catch (error) {
    console.error('Unexpected error during delete:', error)
    return false
  } finally {
    console.log('Deletion process finished')
  }
}
