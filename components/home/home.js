import { ScrollView, StyleSheet, Text, SafeAreaView } from "react-native";
import { AnnouncementCarousel } from "./subcomponents/announcement_carousel";
import { Header } from "./subcomponents/header";
import { RecentAnnouncements } from "./subcomponents/recent_announcements";
import { Services } from "./subcomponents/services";
import { PrimaryText, BoldText } from "../../subcomponents/text";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Footer from "../../subcomponents/footer";
import { fetchPosts, fetchTrendingPosts } from "../../api/fetch_announcements";

export const Home = ({ navigation }) => {
  const [trendingAnnouncements, setTrendingAnnouncements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const changeTh = async (operation) => {
    let newTh = navigation.preferences.th;
    let prev = navigation.preferences.th;
    console.log("newTh", newTh, "prev", prev);
    if (operation == "inc") {
      if (prev >= 3) {
        newTh = 3;
        console.log("newTh", newTh, "prev", prev);
      } else {
        newTh = newTh + 1;
        console.log("newTh", newTh, "prev", prev);
      }
    }
    console.log("newTh", newTh, "prev", prev);
    if (operation == "dec") {
      if (prev <= 1) {
        console.log("newTh", newTh, "prev", prev);
        newTh = 1;
      } else {
        console.log("newTh", newTh, "prev", prev);
        newTh = newTh - 1;
      }
    }
    console.log("newTh", newTh, "prev", prev);
    try {
      await AsyncStorage.setItem("th", `${newTh}`);
    } catch (e) {
      console.log(e);
    }

    console.log("calling...");
    navigation.preferences.prefUpdate();
    console.log("called");
  };

  const fetchData = async () => {
    // Fetch trending posts
    await fetchTrendingPosts()
      .then(async (res) => {
        if (res.ok) {
          data = await res.json();

          if (data.results) {
            setTrendingAnnouncements(data.results);
          }
        } else if (res.status == 401) {
          await AsyncStorage.clear();
          navigation.navigate("Loader");
        }
      })
      .catch((err) => console.log(err));

    await fetchPosts()
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();

          if (data.results) {
            setAnnouncements(data.results);
          }
        } else if (res.status == 401) {
          await AsyncStorage.clear();
          navigation.navigate("Loader");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    navigation.preferences.prefUpdate();
    fetchData();
  }, []);

  let textHeight = navigation.preferences.th;

  return (
    <SafeAreaView style={styles.container}>
      <Header changeTh={changeTh} navigation={navigation} />
      <ScrollView>
        {/* Announcement Banner */}
        <AnnouncementCarousel
          navigation={navigation}
          announcements={trendingAnnouncements}
        />

        {/* Services */}

        <BoldText
          children={"     Services"}
          textAlign={"left"}
          fontSize={textHeight === 1 ? 20 : textHeight === 2 ? 30 : 40}
        />
        <Services navigation={navigation} />

        {/* Announcements */}
        <RecentAnnouncements
          navigation={navigation}
          announcements={announcements}
        />
      </ScrollView>
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
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
