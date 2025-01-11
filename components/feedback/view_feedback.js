import { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { fetchFeedback } from "../../api/feedback";
import { PrimaryButton } from "../../subcomponents/button";
import { BoldText, PrimaryText } from "../../subcomponents/text";

export const ViewFeedback = ({ navigation }) => {
  const [feedbacks, setFeedbacks] = useState({ results: [] });

  useEffect(() => {
    const fetchAndSetFeedback = async () => {
      try {
        const response = await fetchFeedback();
        setFeedbacks(response);
        console.log("Fetched feedbacks:", response);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchAndSetFeedback();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={{
            margin: 10,
            backgroundColor: "green",
            borderRadius: 10,
            width: 60,
          }}
        >
          <Text style={{ fontSize: 60, color: "white", textAlign: "center" }}>
            {"<"}
          </Text>
        </TouchableOpacity>
        <BoldText children="Feedback" fontSize={20} textAlign="left" />
        <View
          style={{
            paddingTop: 30,
          }}
        >
          {feedbacks.results && feedbacks.results.length > 0 ? (
            feedbacks.results.map((feedback) => (
              <TouchableOpacity
                key={feedback.id}
                style={styles.feedbackRow}
                onPress={() => {
                  const id = feedback.id;
                  navigation.navigate("Feedback", { id });
                }}
              >
                <Text style={{ fontSize: 18 }}>{feedback.name}</Text>
                <Text style={{ fontSize: 12 }}>{feedback.status}</Text>
                <Text style={{ fontSize: 10 }}>
                  {new Date(feedback.created_at).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <PrimaryText>No feedbacks available</PrimaryText>
          )}
        </View>
      </ScrollView>
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
            navigation.navigate("SendFeedback");
          }}
        />
      </View>
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
    justifyContent: "flex-start",
  },
  feedbackRow: {
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: "10",
    borderRadius: 30,
    backgroundColor: "rgba(200,200,200,0.2)",
  },
});
