import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View } from "react-native";
import { deleteAccount } from "../../../api/delete_account";
import MenuItem from "./menu_item";

const Menu = ({ navigation }) => {
  const logout = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Loader");
  };

  const deleteUser = async () => {
    const deletionStatus = await deleteAccount();
    if (deletionStatus) {
      AsyncStorage.clear();
      navigation.navigate("Loader");
    }
  };

  return (
    <View style={styles.menu}>
      <MenuItem
        icon="person-outline"
        label="Profile"
        onPress={() => {
          navigation.navigate("EditProfile");
        }}
      />
      {/* <MenuItem icon="bookmark-outline" label="Bookmarks" /> */}
      <MenuItem
        icon="document"
        label="Id Card"
        onPress={() => {
          navigation.navigate("Idcard");
        }}
      />
      <MenuItem
        icon="qr-scanner"
        label="Verify"
        onPress={() => {
          navigation.navigate("Scanner");
        }}
      />
      <MenuItem icon="information-circle-outline" label="Version" />
      <MenuItem
        icon="text-outline"
        label="Feedback"
        onPress={() => {
          navigation.navigate("ViewFeedback");
        }}
      />
      <MenuItem icon="log-out-outline" label="Logout" onPress={logout} />
      <MenuItem
        icon="trash-outline"
        label="Delete Account"
        onPress={deleteUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    marginTop: 20,
  },
});

export default Menu;
