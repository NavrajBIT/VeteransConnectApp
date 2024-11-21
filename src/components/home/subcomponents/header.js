import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
export const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerIcon}>-A</Text>
        <Text style={styles.headerIcon}>A</Text>
        <Text style={styles.headerIcon}>+A</Text>
      </View>
      <Text style={styles.language}>English</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTextContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  headerIcon: {
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 4,
  },
  language: {
    fontSize: 16,
    color: '#333',
  },
})
