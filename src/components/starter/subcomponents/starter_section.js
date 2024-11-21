import { Image } from 'react-native'

export const StarterSection = () => {
  return (
    <Image
      source={require('../../../../assets/logo.png')}
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
