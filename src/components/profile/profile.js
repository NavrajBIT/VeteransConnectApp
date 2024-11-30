import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Menu from './subcomponents/menu_section'
import ProfileSection from './subcomponents/profile_section'

export const Profile = ({ userDetails }) => {
  const user = userDetails.data.user

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <ProfileSection
          name={user.first_name}
          email={user.email}
          imageUri={user.mugshot || 'https://via.placeholder.com/100'}
        />

        {/* Menu Section */}
        <Menu userDetails={userDetails} />
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
})

export default Profile
