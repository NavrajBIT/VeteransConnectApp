import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { PrimaryText } from "../../../subcomponents/text";

export const AnnouncementCarousel = ({ announcements, navigation }) => {
  const TitleLength = 30;
  const th = navigation.preferences.th;

  const styles = StyleSheet.create({
    announcementBanner: {
      padding: 16,
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      margin: 16,
      elevation: 2,
      shadowColor: "#000",
      width: 250,
    },
    bannerImage: {
      width: "100%",
      height: 150,
      borderRadius: 8,
    },
    bannerTitle: {
      fontSize: th === 1 ? 16 : th === 2 ? 24 : 32,
      fontWeight: "bold",
      marginTop: 8,
    },
    bannerDate: {
      fontSize: th === 1 ? 12 : th === 2 ? 18 : 24,
      color: "#666",
      marginTop: 4,
    },
  });

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {announcements && announcements.length > 0 ? (
        announcements.map((announcement) => {
          let title = announcement.title;
          if (title.length > TitleLength) {
            title = title.slice(0, TitleLength);
          }
          return (
            <TouchableOpacity
              key={announcement.id}
              style={styles.announcementBanner}
              onPress={() =>
                navigation.navigate("BlogDetails", { announcement })
              }
            >
              <Image
                source={{ uri: announcement.thumbnail }}
                style={styles.bannerImage}
              />
              <Text style={styles.bannerTitle}>{title}</Text>
              <Text style={styles.bannerDate}>
                {new Date(announcement.created_at).toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          );
        })
      ) : (
        <View style={{ paddingLeft: 20 }}>
          <PrimaryText
            children={"No announcements available yet."}
            fontSize={th == 1 ? 12 : th == 2 ? 18 : 24}
          />
        </View>
      )}
    </ScrollView>
  );
};
