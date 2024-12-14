import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { deleteAccount } from "../../../api/delete_account";
import MenuItem from "./menu_item";

const Menu = ({ userDetails }) => {
  const navigation = useNavigation();

  const logout = () => {
    AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Loader" }],
      })
    );
  };

  const deleteUser = async () => {
    const deletionStatus = await deleteAccount();
    if (deletionStatus) {
      AsyncStorage.clear();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Loader" }],
        })
      );
    }
  };

  return (
    <View style={styles.menu}>
      <MenuItem
        icon="person-outline"
        label="Profile"
        onPress={() => {
          navigation.navigate("EditProfile", { userDetails });
        }}
      />
      <MenuItem icon="bookmark-outline" label="Bookmarks" />
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
