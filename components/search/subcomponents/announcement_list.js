import { StyleSheet, View } from "react-native";
import { AnnouncementCard } from "../../../subcomponents/announcement_card";

export const AnnouncementList = ({ announcements, navigation }) => {
  const th = navigation.preferences.th;
  return (
    <View style={styles.announcementList}>
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          onPress={() => navigation.navigate("BlogDetails", { announcement })}
          th={th}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  announcementList: {
    marginHorizontal: 16,
    marginTop: 16,
  },
});
