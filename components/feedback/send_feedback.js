import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { sendFeedback } from "../../api/feedback";
import { PrimaryButton } from "../../subcomponents/button";
import { BoldText } from "../../subcomponents/text";
import { TextField } from "../../subcomponents/textfield";

export const SendFeedback = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    await sendFeedback({ title: title, description: desc });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            margin: 10,
            backgroundColor: "green",
            borderRadius: 10,
            width: 60,
          }}
        >
          <Text style={{ fontSize: 50, color: "white", textAlign: "center" }}>
            {"<"}
          </Text>
        </TouchableOpacity>
        <BoldText children="Send Feedback" fontSize={20} textAlign="left" />
        <View style={{ paddingTop: 30 }}></View>
        <TextField
          label="Title"
          required
          placeholder={"Enter Title"}
          value={title}
          onChangeText={(e) => setTitle(e.toString())}
        />
        <TextField
          label={"Description"}
          required
          placeholder={"Enter Description"}
          value={desc}
          onChangeText={(e) => setDesc(e.toString())}
          multiline={true}
          numberOfLines={50}
          textAlignVertical="top"
        />
        <View
          style={{
            width: Dimensions.get("window").width - 40,
            marginBottom: 20,
            alignSelf: "center",
          }}
        >
          <PrimaryButton
            title={"Send Feedback"}
            onPress={() => {
              handleSubmit();
              navigation.goBack();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 40,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
