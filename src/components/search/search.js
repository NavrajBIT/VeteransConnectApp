import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AnnouncementList } from './subcomponents/announcement_list'

import React, { useState } from 'react'
import { TextInput, View } from 'react-native'

export const Search = ({ announcements }) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAnnouncements = searchQuery
    ? announcements.filter((announcement) =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : announcements
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search announcements...'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <AnnouncementList announcements={filteredAnnouncements} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    height: 60,
    marginHorizontal: 12,
    borderRadius: 50,
  },
  searchInput: {
    flex: 1,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginHorizontal: 12,
  },
})
