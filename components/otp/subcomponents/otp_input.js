import React, { useRef } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

export const OtpInput = ({ length = 6, otp, setOtp }) => {
  //   const [otp, setOtp] = useState(Array(length).fill(''))
  const inputRefs = useRef([])

  const handleChange = (text, index) => {
    const newOtp = [...otp]
    newOtp[index] = text
    setOtp(newOtp)

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const otpArray = otp.length === length ? otp : Array(length).fill('')

  return (
    <View style={styles.otpContainer}>
      {otpArray.map((value, index) => (
        <TextInput
          key={index}
          style={styles.otpInput}
          maxLength={1}
          keyboardType='numeric'
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          autoFocus={index === 0}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpInput: {
    width: 40,
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    margin: 5,
  },
})
