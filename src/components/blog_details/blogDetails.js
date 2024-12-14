import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import RenderHTML from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPostDetails } from "../../api/fetch_announcement_details";
import { BoldText } from "../../subcomponents/text";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";
import { PrimaryButton } from "../../subcomponents/button";
import { useNavigation } from "@react-navigation/native";

export const BlogDetails = ({ route }) => {
  const navigation = useNavigation();
  const { announcement } = route.params;
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);

  const { width } = Dimensions.get("window").width;

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      await fetchPostDetails(announcement.id)
        .then(async (res) => {
          console.log(res);
          if (res.ok) {
            const data = await res.json();
            console.log(data);
            setPost(data);
            console.log("data set successfully");
          }
        })
        .catch((err) => {
          navigation.navigate("Layout");
        });

      setLoading(false);
    };

    fetchDetails();
  }, []);

  if (loading || !post) return <Loadingscreen />;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Layout")}
        style={{ paddingLeft: 20 }}
      >
        <Text style={{ fontSize: 50, color: "green" }}>{"<"}</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Image source={{ uri: post.thumbnail }} style={styles.bannerImage} />
          <View style={styles.textContainer}>
            <BoldText fontSize={20} textAlign={"start"}>
              {post.title}
            </BoldText>
          </View>
          <View style={styles.textContainer}>
            {/* <PrimaryText fontSize={14} textAlign={'start'}>
                {post.body}
              </PrimaryText> */}
            <RenderHTML
              contentWidth={width - 40}
              source={{ html: post.body }}
              baseStyle={{
                ...styles.baseText,
                fontSize: 14,
                textAlign: "left",
              }}
            />
          </View>
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
  bannerImage: {
    // width: "100%",
    width: "100vw",
    height: 200,
    borderRadius: 8,
  },
  textContainer: {
    paddingTop: 30,
    // width: '100%',
  },
  loader: {
    alignSelf: "center",
    marginTop: "50%",
  },
  baseText: {
    color: "#333",
    lineHeight: 20,
  },
});
