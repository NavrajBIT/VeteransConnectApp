import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendFeedback } from "../../api/feedback";
import { PrimaryButton } from "../../subcomponents/button";
import { BoldText } from "../../subcomponents/text";
import { TextField } from "../../subcomponents/textfield";

export const SendFeedback = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    await sendFeedback({ title: title, description: desc });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewFeedback")}
        style={{ paddingLeft: 20 }}
      >
        <Text style={{ fontSize: 50, color: "green" }}>{"<"}</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
