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

  function replaceHttpWithHttps(url) {
    if (typeof url !== "string") {
      throw new Error("Input must be a string");
    }
    return url.replace(/^http:/, "https:");
  }

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      await fetchPostDetails(announcement.id)
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            data.thumbnail = replaceHttpWithHttps(data.thumbnail);
            setPost(data);
          }
        })
        .catch((err) => {
          navigation.navigate("Home");
        });

      setLoading(false);
    };

    fetchDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{
          margin: 10,
          backgroundColor: "green",
          borderRadius: 10,
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <Text
          children={"<"}
          style={{ fontSize: 40, color: "white", textAlign: "center" }}
        />
      </TouchableOpacity>

      {loading || !post ? (
        <Loadingscreen />
      ) : (
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 40,
  },
});
