import { FontAwesome } from '@expo/vector-icons'
import { View } from 'react-native'

const Footer = ({ view, setView }) => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
      }}
    >
      <FontAwesome
        name='home'
        size={30}
        color={view === 'Home' ? '#885CCD' : '#000000'}
        onPress={() => setView('Home')}
      />
      <FontAwesome
        name='search'
        size={30}
        color={view === 'Search' ? '#885CCD' : '#000000'}
        onPress={() => setView('Search')}
      />
      <FontAwesome
        name='user'
        size={30}
        color={view === 'Profile' ? '#885CCD' : '#000000'}
        onPress={() => setView('Profile')}
      />
    </View>
  )
}

export default Footer
