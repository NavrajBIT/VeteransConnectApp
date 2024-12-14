import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnnouncementCarousel } from "./subcomponents/announcement_carousel";
import { Header } from "./subcomponents/header";
import { RecentAnnouncements } from "./subcomponents/recent_announcements";
import { Services } from "./subcomponents/services";
import { PrimaryText, BoldText } from "../../subcomponents/text";

export const Home = ({ announcements, th, changeTh }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header th={th} changeTh={changeTh} />

        {/* Announcement Banner */}
        <AnnouncementCarousel announcements={announcements} th={th} />

        {/* Services */}

        <BoldText
          children={"     Services"}
          textAlign={"left"}
          fontSize={th === 1 ? 20 : th === 2 ? 30 : 40}
        />
        <Services th={th} />

        {/* Announcements */}
        <RecentAnnouncements announcements={announcements} th={th} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  servicesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 16,
  },
});
