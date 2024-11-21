import { Image } from 'react-native'

export const LoginSection = () => {
  return (
    <Image
      source={require('../../../../assets/welcome.png')}
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
