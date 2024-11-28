import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native'
import { sendOtp } from '../../api/send_otp'
import { PrimaryButton } from '../../subcomponents/button'
import { Container } from '../../subcomponents/container'
import { BoldText, PrimaryText } from '../../subcomponents/text'
import { TextField } from '../../subcomponents/textfield'
import { LoginSection } from './subcomponents/login_section'

export const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  const handleLogin = async () => {
    setLoading(true)
    try {
      await sendOtp(phoneNumber)
    } catch (error) {
      console.error('otp failed:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Container>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <BoldText children={'Welcome Back'} fontSize={30} />
        <LoginSection />
        <TextField
          placeholder={'Enter phone number'}
          keyboardType='numeric'
          icon={'phone-portrait'}
          value={phoneNumber}
          onChangeText={(e) => setPhoneNumber(e.toString())}
        />
        <PrimaryButton
          title={'Submit'}
          onPress={() => {
            if (phoneNumber.length < 10 || phoneNumber === '') {
              // Alert('Please enter a valid phone number.')
              Alert.alert(
                'Invalid phone number',
                'Please enter a valid phone number.'
              )
            } else {
              handleLogin()
              navigation.navigate('OtpScreen', { phoneNumber })
            }
          }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <PrimaryText children={"Don't have an account?"} fontSize={16} />
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <PrimaryText
              children={'  Sign Up'}
              fontSize={16}
              color={'#9164D8'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  )
}
