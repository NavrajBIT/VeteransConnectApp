import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const { width } = Dimensions.get('window')

const ProfileSection = ({ name, email, imageUri }) => {
  return (
    <View style={styles.profileSection}>
      {/* Profile Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: imageUri || 'https://via.placeholder.com/100',
          }}
          style={styles.profileImage}
        />
        {/* Edit Icon */}
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name='pencil' size={16} color='white' />
        </TouchableOpacity>
      </View>

      {/* Name and Email */}
      <Text style={styles.profileName}>{name}</Text>
      <Text style={styles.profileEmail}>{email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageWrapper: {
    position: 'relative',
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#8C4EF8',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  profileEmail: {
    fontSize: 14,
    color: '#8C8C8C',
    marginTop: 5,
  },
})

export default ProfileSection
