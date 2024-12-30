import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Menu from "./subcomponents/menu_section";
import ProfileSection from "./subcomponents/profile_section";
import { useEffect, useState } from "react";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";
import { fetchUserData } from "../../api/get_user_data";
import { PrimaryText } from "../../subcomponents/text";

export const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      fetchUserData()
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            if (data.data) {
              setUser(data.data);
            }
          }
        })
        .catch((res) => console.log(res));
    };
    getData();
  }, []);

  if (!user) return <Loadingscreen />;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ paddingLeft: 20, paddingTop: 20, width: "100%" }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <PrimaryText children={"< Back"} textAlign={"left"} fontSize={30} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <ProfileSection
          name={user.user.first_name}
          email={user.user.email}
          imageUri={
            `http://192.168.1.8:8000${user.mugshot}` ||
            "https://via.placeholder.com/100"
          }
        />

        {/* Menu Section */}
        <Menu navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

export default Profile;
