import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

export const IconButton = ({ icon, onPress, height, width }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'transparent',
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
      onPress={onPress}
    >
      <FontAwesome
        icon={icon}
        width={width ? width : 48}
        height={height ? height : 48}
        fill='#ffffff'
      />
    </TouchableOpacity>
  )
}
