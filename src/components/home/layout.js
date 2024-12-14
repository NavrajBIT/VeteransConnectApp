import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  SafeAreaView,
} from "react-native";
import { fetchPosts, fetchTrendingPosts } from "../../api/fetch_announcements";
import { fetchUserData } from "../../api/get_user_data";
import Footer from "../../tabs/footer";
import { Profile } from "../profile/profile";
import { Search } from "../search/search";
import { Home } from "./home";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Preferences from "../../subcomponents/preferences";

export const Layout = () => {
  const { ln, th } = Preferences();
  const [view, setView] = useState("Home");
  const [trendingAnnouncements, setTrendingAnnouncements] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [textHeight, setTextheight] = useState(1);

  const changeTh = (operation) => {
    setTextheight((prev) => {
      let newTh = prev;
      if (operation == "inc") {
        if (prev >= 3) {
          newTh = 3;
        } else {
          newTh = newTh + 1;
        }
      }
      if (operation == "dec") {
        if (prev <= 1) {
          newTh = 1;
        } else {
          newTh = newTh - 1;
        }
      }
      try {
        AsyncStorage.setItem("th", `${newTh}`);
      } catch {}
      return newTh;
    });
  };

  const fetchData = async () => {
    // Fetch trending posts
    await fetchTrendingPosts().then(async (res) => {
      if (res.ok) {
        data = await res.json();

        if (data.results) {
          setTrendingAnnouncements(data.results);
        }
      }
    });

    // Fetch general posts
    const response = await fetchPosts()
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();

          if (data.results) {
            setAnnouncements(data.results);
          }
        }
      })
      .catch((err) => console.log(err));
    if (response) {
      setAnnouncements(response);
      console.log(`Fetched ${response.length} announcements`);
    }

    setLoading(true);
    // get user details
    await fetchUserData()
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUserDetails(data);
        }
      })
      .catch((err) => console.log(err));

    setLoading(false);
  };
  useEffect(() => {
    fetchData();
    if (!isNaN(th)) {
      setTextheight(th);
    }
  }, []);

  if (loading) return <Loadingscreen />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {view === "Home" ? (
          <Home
            announcements={trendingAnnouncements}
            th={textHeight}
            changeTh={changeTh}
          />
        ) : view === "Search" ? (
          <Search announcements={announcements} th={textHeight} />
        ) : view === "Profile" ? (
          <Profile userDetails={userDetails} />
        ) : null}
      </ScrollView>

      <View style={styles.footerWrapper}>
        <Footer view={view} setView={setView} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  contentContainer: {
    flexGrow: 1,
  },
  loader: {
    alignSelf: "center",
    marginTop: "50%",
  },
  footerWrapper: {
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});
