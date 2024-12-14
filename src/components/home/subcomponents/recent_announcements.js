import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { AnnouncementCard } from "../../../subcomponents/announcement_card";

export const RecentAnnouncements = ({ announcements, th }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.announcementList}>
      {announcements.map((announcement) => (
        <AnnouncementCard
          key={announcement.id}
          announcement={announcement}
          onPress={() => navigation.navigate("BlogDetails", { announcement })}
          th={th}
        />
        // <View key={announcement.id} style={styles.announcementCard}>
        //   <View style={styles.cardTextContainer}>
        //     <Text style={styles.cardTitle}>{announcement.title}</Text>
        //     <Text style={styles.cardDate}>
        //       {new Date(announcement.created_at).toLocaleDateString()}
        //     </Text>
        //   </View>
        //   <Image
        //     source={{ uri: announcement.thumbnail }}
        //     style={styles.cardImage}
        //   />
        // </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  announcementList: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  announcementCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  cardDate: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 8,
  },
});
