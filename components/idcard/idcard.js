import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { PrimaryText, BoldText } from "../../subcomponents/text";
import { PrimaryButton } from "../../subcomponents/button";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { fetchUserData } from "../../api/get_user_data";
import Loadingscreen from "../../subcomponents/loadingscreen/loadingscreen";

const Idcard = ({ navigation }) => {
  const [isQr, setIsQr] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const poppulateUserData = async () => {
    setLoading(true);
    await fetchUserData()
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          setUser(data.data);
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  useEffect(() => {
    poppulateUserData();
  }, []);

  if (loading) return <Loadingscreen />;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={{ paddingLeft: 20, paddingTop: 20, width: "100%" }}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <PrimaryText children={"< Back"} textAlign={"left"} fontSize={30} />
      </TouchableOpacity>
      {isQr ? <MyQr hash={user?.hash} isFullView /> : <Card user={user} />}

      <PrimaryButton
        title={isQr ? "Close Qr code" : "Open QR Code"}
        onPress={() => setIsQr(!isQr)}
      />
    </SafeAreaView>
  );
};

export default Idcard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 40,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

const MyQr = ({ isFullView, hash }) => {
  if (!hash) return null;

  const qr_value = `{"hash": "${hash}"}`;

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          borderWidth: 2,
          borderColor: "black",
        }}
      >
        <QRCode
          size={isFullView ? 256 : 64}
          value={qr_value}
          viewBox={`0 0 256 256`}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </View>
    </View>
  );
};

export const Card = ({ user }) => {
  if (!user) return null;

  return (
    <View style={{ backgroundColor: "blue", padding: 5, marginTop: 20 }}>
      <View style={{ padding: 20 }}>
        <PrimaryText
          children={"Veteran Id Card"}
          fontSize={30}
          color={"white"}
        />
      </View>
      <View
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <View
          style={{
            width: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={{
              uri: `http://192.168.1.10:8000${user?.mugshot}`,
            }}
            style={{
              aspectRatio: 1,
              width: "100%",
              borderWidth: 1,
              borderColor: "black",
            }}
          />
        </View>
        <View
          style={{
            width: "50%",
            padding: 10,
          }}
        >
          <View>
            <BoldText
              children={`S.N.: ${user?.service_no}`}
              fontSize={15}
              textAlign={"left"}
            />
            <BoldText
              children={`${user?.user?.first_name} ${user?.user?.last_name}`}
              fontSize={20}
              textAlign={"left"}
            />
            <BoldText
              children={`Phone ${user?.user?.phone_number}`}
              fontSize={12}
              textAlign={"left"}
            />
            {user?.dob && (
              <BoldText
                children={`DOB: ${user?.dob}`}
                fontSize={10}
                textAlign={"left"}
              />
            )}
            <MyQr hash={user?.hash} />
          </View>
        </View>
      </View>
    </View>
  );
};
