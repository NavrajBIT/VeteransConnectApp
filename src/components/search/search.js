import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BoldText } from '../../subcomponents/text'
import { AnnouncementList } from './subcomponents/announcement_list'

export const Search = ({ announcements }) => {
  // const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <BoldText>Search</BoldText>
        <AnnouncementList announcements={announcements} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
})
