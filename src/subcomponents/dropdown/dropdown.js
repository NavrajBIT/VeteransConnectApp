import { Picker } from '@react-native-picker/picker'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'

const DropdownField = ({
  label,
  options = [], // Default to an empty array if options is not provided
  selectedValue,
  onValueChange,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      {/* {label && <Text style={styles.label}>{label}</Text>} */}
      {/* <TouchableOpacity style={styles.dropdownField} onPress={() => {}}>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            color: selectedValue ? '#000000' : '#888888',
          }}
        >
          {selectedValue ? selectedValue : placeholder}
        </Text>
        <FontAwesome
          name='caret-down'
          size={20}
          color='#888888'
          style={{ alignSelf: 'center' }}
        />
      </TouchableOpacity> */}

      {/* Safely rendering options using map */}
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.dropdownField}
      >
        {placeholder && <Picker.Item label={placeholder} value='' />}
        {options.length > 0 && // Check if options is not an empty array
          options.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
            />
          ))}
      </Picker>
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
    fontSize: 16,
    color: '#000000',
    marginBottom: 8,
  },
  dropdownField: {
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
  picker: {
    width: '100%',
    height: 50,
    marginTop: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#FFF',
    elevation: 5,
  },
})

export default DropdownField
