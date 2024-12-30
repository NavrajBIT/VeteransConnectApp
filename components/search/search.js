import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { AnnouncementList } from "./subcomponents/announcement_list";
import { TextInput, View } from "react-native";
import { TextField } from "../../subcomponents/textfield";
import { useState, useEffect } from "react";
import { fetchPosts } from "../../api/fetch_announcements";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";
import Footer from "../../subcomponents/footer";

export const Search = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loadingscreen />;

  const filteredAnnouncements = searchQuery
    ? announcements.filter((announcement) =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : announcements;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextField
          placeholder={"Search Announcements..."}
          value={searchQuery}
          onChangeText={(e) => setSearchQuery(e)}
          icon={"search"}
        />
      </View>
      <ScrollView>
        <AnnouncementList
          announcements={filteredAnnouncements}
          navigation={navigation}
        />
      </ScrollView>
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    height: 80,
    marginHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 60,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginHorizontal: 12,
  },
});
