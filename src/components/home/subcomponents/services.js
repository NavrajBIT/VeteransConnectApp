import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from '../../../subcomponents/icon'

export const Services = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.servicesContainer}>
      {[
        // {
        //   label: 'Announcement',
        //   icon: <Icon icon={'announcement'} height={50} width={50} />,
        // },
        {
          label: 'Veteran Registration',
          icon: <Icon icon={'vetreg'} height={50} width={50} />,
        },
        {
          label: 'NOK Registration',
          icon: <Icon icon={'nokreg'} height={50} width={50} />,
        },
        {
          label: 'ECHS Registration',
          icon: <Icon icon={'nokreg'} height={50} width={50} />,
        },
      ].map((service, index) => (
        <TouchableOpacity
          key={index}
          style={styles.serviceItem}
          onPress={() => {
            if (index === 0) navigation.navigate('VeteransRegistration')
            if (index === 1) navigation.navigate('NokRegistration')
            if (index === 2) navigation.navigate('EchsRegistration')
          }}
        >
          <Text style={styles.serviceIcon}>{service.icon}</Text>
          <Text style={styles.serviceLabel}>{service.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginRight: 16,
    marginTop: 16,
  },
  serviceItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    width: '28%',
    marginBottom: 16,
    marginRight: '3%',
    elevation: 4,
    shadowColor: '#000',
  },
  serviceIcon: {
    fontSize: 24,
  },
  serviceLabel: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
})
