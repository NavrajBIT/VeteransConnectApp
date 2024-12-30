import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

export const Container = ({ children }) => {
  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 40 : 40,
    paddingBottom: Platform.OS === "ios" ? 40 : 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
