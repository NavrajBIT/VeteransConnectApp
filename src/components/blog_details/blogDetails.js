import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import RenderHTML from 'react-native-render-html'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchPostDetails } from '../../api/fetch_announcement_details'
import { BoldText } from '../../subcomponents/text'

export const BlogDetails = ({ route }) => {
  const { announcement } = route.params
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState([])

  const { width } = Dimensions.get('window').width

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true)
        const postDetails = await fetchPostDetails(announcement.id)
        setPost(postDetails)
      } catch (error) {
        console.error('Error fetching announcements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator
            size='large'
            color='#0000ff'
            style={styles.loader}
          />
        ) : (
          <View>
            <Image
              source={{ uri: post.thumbnail }}
              style={styles.bannerImage}
            />
            <View style={styles.textContainer}>
              <BoldText fontSize={20} textAlign={'start'}>
                {post.title}
              </BoldText>
            </View>
            <View style={styles.textContainer}>
              {/* <PrimaryText fontSize={14} textAlign={'start'}>
                {post.body}
              </PrimaryText> */}
              <RenderHTML
                contentWidth={width - 40}
                source={{ html: post.body }}
                baseStyle={{
                  ...styles.baseText,
                  fontSize: 14,
                  textAlign: 'left',
                }}
              />
            </View>
          </View>
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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  textContainer: {
    paddingTop: 30,
    // width: '100%',
  },
  loader: {
    alignSelf: 'center',
    marginTop: '50%',
  },
  baseText: {
    color: '#333',
    lineHeight: 20,
  },
})
