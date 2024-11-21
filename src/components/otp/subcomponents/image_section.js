import { Image } from 'react-native'

export const OtpImageSection = () => {
  return (
    <Image
      source={require('../../../../assets/otp.png')}
      style={{
        width: 200,
        height: 200,
        marginBottom: 20,
        alignSelf: 'center',
      }}
      resizeMode='contain'
    />
  )
}
