import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AnnouncementCarousel } from './subcomponents/announcement_carousel'
import { Header } from './subcomponents/header'
import { RecentAnnouncements } from './subcomponents/recent_announcements'
import { Services } from './subcomponents/services'

export const Home = ({ announcements }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />

        {/* Announcement Banner */}
        <AnnouncementCarousel announcements={announcements} />

        {/* Services */}
        <Text style={styles.servicesTitle}>Services</Text>
        <Services />

        {/* Announcements */}
        <RecentAnnouncements announcements={announcements} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 16,
  },
})
