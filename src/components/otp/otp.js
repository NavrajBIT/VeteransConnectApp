import { PrimaryButton } from '../../subcomponents/button'
import { Container } from '../../subcomponents/container'
import { BoldText } from '../../subcomponents/text'
import { OtpImageSection } from './subcomponents/image_section'

import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Dimensions, View } from 'react-native'
import { login } from '../../api/login'
import { sendOtp } from '../../api/send_otp'
import { OtpInput } from './subcomponents/otp_input'
import { OtpTimer } from './subcomponents/otp_timer'

export const OtpScreen = ({ route }) => {
  const { phoneNumber } = route.params
  const [otp, setOtp] = useState(Array(6).fill(''))
  const [isResendDisabled, setIsResendDisabled] = useState(false)

  const navigation = useNavigation()

  const handleOtp = async () => {
    setLoading(true)
    try {
      console.log('====================================')
      console.log('Attempting login with phone number:', phoneNumber)
      console.log('====================================')

      await sendOtp(phoneNumber)
    } catch (error) {
      console.error('otp failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    const otpCode = otp.join('')
    console.log('OTP submitted:', otpCode)
    const result = await login(phoneNumber, otpCode)
    if (result) {
      navigation.navigate('Layout')
    } else {
      console.log('====================================')
      console.log('Login failed')
      console.log('====================================')
    }
  }

  const handleResend = () => {
    handleOtp()
    setIsResendDisabled(true)
    setOtp('')
  }
  return (
    <Container>
      <BoldText children={'Verfication'} fontSize={30} />
      <OtpImageSection />
      <OtpInput length={6} otp={otp} setOtp={setOtp} />
      <View style={{ width: Dimensions.get('window').width - 40 }}>
        <PrimaryButton title={'Submit'} onPress={handleSubmit} />
      </View>
      <OtpTimer onResend={handleResend} />
    </Container>
  )
}
