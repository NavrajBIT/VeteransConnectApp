import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

export const AnnouncementCarousel = ({ announcements }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {announcements && announcements.length > 0 ? (
        announcements.map((announcement) => (
          <View key={announcement.id} style={styles.announcementBanner}>
            <Image
              source={{ uri: announcement.thumbnail }}
              style={styles.bannerImage}
            />
            <Text style={styles.bannerTitle}>{announcement.title}</Text>
            <Text style={styles.bannerDate}>
              {new Date(announcement.created_at).toLocaleDateString()}
            </Text>
          </View>
        ))
      ) : (
        <Text>No announcements available</Text>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  announcementBanner: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    margin: 16,
    elevation: 2,
    shadowColor: '#000',
    minWidth: 300,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  bannerDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
})
