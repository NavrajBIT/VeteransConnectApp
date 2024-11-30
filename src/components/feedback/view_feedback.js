import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchFeedback } from '../../api/feedback'
import { PrimaryButton } from '../../subcomponents/button'
import { BoldText, PrimaryText } from '../../subcomponents/text'

export const ViewFeedback = () => {
  const navigation = useNavigation()

  const [feedbacks, setFeedbacks] = useState({ results: [] })

  useEffect(() => {
    const fetchAndSetFeedback = async () => {
      try {
        const response = await fetchFeedback()
        setFeedbacks(response)
        console.log('Fetched feedbacks:', response)
      } catch (error) {
        console.error('Error fetching feedback:', error)
      }
    }

    fetchAndSetFeedback()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BoldText children='Feedbacks' fontSize={20} textAlign='left' />
        <View style={{ paddingTop: 30, paddingHorizontal: 30 }}>
          {feedbacks.results && feedbacks.results.length > 0 ? (
            feedbacks.results.map((feedback) => (
              <View key={feedback.id} style={styles.feedbackRow}>
                <Text style={{ fontSize: 18 }}>{feedback.name}</Text>
                <Button
                  title='View'
                  onPress={() => {
                    console.log(`Viewing feedback: ${feedback.id}`)
                    const id = feedback.id
                    navigation.navigate('Feedback', { id })
                  }}
                />
              </View>
            ))
          ) : (
            <PrimaryText>No feedbacks available</PrimaryText>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          width: Dimensions.get('window').width - 40,
          marginBottom: 20,
          alignSelf: 'center',
        }}
      >
        <PrimaryButton
          title={'Send Feedback'}
          onPress={() => {
            navigation.navigate('SendFeedback')
          }}
        />
      </View>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  feedbackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
})
