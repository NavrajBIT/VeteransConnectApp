import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchFeedbackById, respond } from '../../api/feedback'
import { BoldText } from '../../subcomponents/text'

export const Feedback = ({ route }) => {
  const { id } = route.params
  const [feedback, setFeedback] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    const fetchAndSetFeedbackByID = async () => {
      try {
        const response = await fetchFeedbackById({ id })
        setFeedback(response)
        // console.log('Fetched feedback:', response)
      } catch (error) {
        console.error('Error fetching feedback:', error)
      }
    }

    fetchAndSetFeedbackByID()
  }, [])

  const handleSend = () => {
    if (replyText.trim() || selectedImage) {
      console.log('Reply sent:', replyText, selectedImage)
      sendFeedback()
      setReplyText('')
      setSelectedImage(null)
    } else {
      console.log('Cannot send an empty reply.')
    }
  }

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false) {
      alert('Permission to access the media library is required!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      console.log('Image selected:', result.assets[0].uri)
    }
  }

  const sendFeedback = async () => {
    await respond({
      id: id,
      message: replyText,
      imagePath: selectedImage,
      filePath: '',
    }).then((response) => {
      console.log('Response from server:', response)
    })
  }

  if (!feedback) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BoldText children='Feedback' fontSize={20} textAlign='left' />
        <View style={{ paddingTop: 30 }}></View>
        <View style={styles.card}>
          <Text style={styles.title}>Query: {feedback.name}</Text>
          <Text style={styles.message}>Message: {feedback.message}</Text>
          <Text style={styles.status}>
            Status:{' '}
            <Text style={styles[feedback.status.toLowerCase()]}>
              {feedback.status}
            </Text>
          </Text>
          <Text style={styles.date}>
            {new Date(feedback.created_at).toLocaleDateString()}
          </Text>
        </View>
        <View style={{ paddingTop: 30 }}></View>

        {feedback.responses.map((response, index) => (
          <View key={index} style={styles.responseContainer}>
            <Text
              style={[
                styles.responseLabel,
                response.is_admin ? styles.admin : styles.user,
              ]}
            >
              {response.is_admin ? 'Admin' : 'User'}:
            </Text>
            {response.message ? (
              <Text style={styles.responseText}>{response.message}</Text>
            ) : null}
            {response.image.length > 0 &&
              response.image.map((img, imgIndex) => (
                <Image
                  key={imgIndex}
                  source={{ uri: img.image }}
                  style={styles.responseImage}
                />
              ))}
            <Text style={styles.date}>
              {new Date(response.created_at).toLocaleDateString()}
            </Text>
          </View>
        ))}

        <View style={styles.replyContainer}>
          <TouchableOpacity
            onPress={handleImageUpload}
            style={styles.uploadButton}
          >
            <Text style={styles.uploadButtonText}>📷</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.replyInput}
            placeholder='Reply...'
            value={replyText}
            onChangeText={setReplyText}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>➡️</Text>
          </TouchableOpacity>
        </View>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={styles.selectedImagePreview}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    marginVertical: 5,
  },
  status: {
    fontSize: 14,
  },
  pending: {
    color: 'red',
  },
  date: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  responseContainer: {
    marginBottom: 15,
  },
  responseLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  admin: {
    color: 'blue',
  },
  user: {
    color: 'green',
  },
  responseText: {
    fontSize: 14,
    marginVertical: 5,
  },
  responseImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 5,
  },
  replyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  replyInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  sendButton: {
    paddingHorizontal: 10,
  },
  sendButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  uploadButton: {
    paddingHorizontal: 10,
  },
  uploadButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  selectedImagePreview: {
    marginTop: 10,
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
})
