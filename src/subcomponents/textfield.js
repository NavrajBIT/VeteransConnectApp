import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Dimensions, Text, TextInput, View } from 'react-native'

export const TextField = ({
  label,
  icon,
  placeholder,
  value,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <View
      style={{
        width: Dimensions.get('window').width - 40,
        paddingHorizontal: 20,
        marginBottom: 20,
      }}
    >
      {label && (
        <Text style={{ fontSize: 20, color: '#000000', marginBottom: 8 }}>
          {label}:
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          padding: 10,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={24}
            color='#888'
            style={{ marginRight: 10, alignSelf: 'center' }}
          />
        )}
        <TextInput
          style={{
            flex: 1,
            fontSize: 16,
            color: '#000000',
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor='#888'
          value={value}
          {...restProps}
        />
      </View>
    </View>
  )
}
