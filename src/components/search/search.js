import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AnnouncementList } from "./subcomponents/announcement_list";

import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { TextField } from "../../subcomponents/textfield";

export const Search = ({ announcements, th }) => {
  const [searchQuery, setSearchQuery] = useState(null);

  const filteredAnnouncements = searchQuery
    ? announcements.filter((announcement) =>
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : announcements;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        {/* <TextInput
            style={styles.searchInput}
            placeholder="Search announcements..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          /> */}
        <TextField
          placeholder={"Search Announcements..."}
          value={searchQuery}
          onChangeText={(e) => setSearchQuery(e)}
          icon={"search"}
        />
      </View>
      <ScrollView>
        <AnnouncementList announcements={filteredAnnouncements} th={th} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
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
