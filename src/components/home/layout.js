import { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import { fetchPosts, fetchTrendingPosts } from '../../api/fetch_announcements'
import { fetchUserData } from '../../api/get_user_data'
import Footer from '../../tabs/footer'
import { Profile } from '../profile/profile'
import { Search } from '../search/search'
import { Home } from './home'

export const Layout = () => {
  const [view, setView] = useState('Home')
  const [trendingAnnouncements, setTrendingAnnouncements] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [userDetails, setUserDetails] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Fetch trending posts
        const trendingResponse = await fetchTrendingPosts()
        if (trendingResponse) {
          setTrendingAnnouncements(trendingResponse)
        }

        // Fetch general posts
        const response = await fetchPosts()
        if (response) {
          setAnnouncements(response)
          console.log(`Fetched ${response.length} announcements`)
        }

        // get user details
        const userDetails = await fetchUserData()
        if (userDetails) {
          setUserDetails(userDetails)
        }
      } catch (error) {
        console.error('Error fetching announcements:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator
            size='large'
            color='#0000ff'
            style={styles.loader}
          />
        ) : view === 'Home' ? (
          <Home announcements={trendingAnnouncements} />
        ) : view === 'Search' ? (
          <Search announcements={announcements} />
        ) : view === 'Profile' ? (
          <Profile userDetails={userDetails} />
        ) : null}
      </ScrollView>

      <View style={styles.footerWrapper}>
        <Footer view={view} setView={setView} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  contentContainer: {
    flexGrow: 1,
  },
  loader: {
    alignSelf: 'center',
    marginTop: '50%',
  },
  footerWrapper: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
})
