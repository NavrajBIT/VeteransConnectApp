// DatePickerField.js
import { FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const DatePickerField = ({
  label,
  value,
  onChange,
  placeholder = 'Select Date',
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => setDatePickerVisibility(true)
  const hideDatePicker = () => setDatePickerVisibility(false)

  const handleConfirm = (date) => {
    onChange(date.toISOString().split('T')[0]) // Format the date as YYYY-MM-DD
    hideDatePicker()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.datePickerField} onPress={showDatePicker}>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            color: value ? '#000000' : '#888888',
          }}
        >
          {value ? value : placeholder}
        </Text>
        <FontAwesome
          name='calendar'
          size={24}
          color='#888888'
          style={{ alignSelf: 'center' }}
        />
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode='date'
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    color: '#000000',
    marginBottom: 8,
  },
  datePickerField: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height: 60,
    alignItems: 'center',
  },
})

export default DatePickerField
