import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from "react-native";
import { fetchPostDetails } from "../../api/fetch_announcement_details";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";
import { WebView } from "react-native-webview";

export const BlogDetails = ({ navigation }) => {
  const { announcement } = navigation.params;
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
          navigation.navigate("Home");
        });

      setLoading(false);
    };

    fetchDetails();
  }, []);

  if (loading || !post) return <Loadingscreen />;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ paddingLeft: 20 }}
      >
        <Text style={{ fontSize: 50, color: "green" }}>{"<"}</Text>
      </TouchableOpacity>

      <WebView
        originWhitelist={["*"]}
        source={{
          html: `<head>
          <meta content="width=width, initial-scale=1, maximum-scale=1" name="viewport"></meta>
        </head>
        <body >
       <img src="${post.thumbnail}" alt="${post.title}" width="100%">
       <h1>${post.title}</h1>
        ${post.body}
        
        </body>`,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 20,
  },
});
