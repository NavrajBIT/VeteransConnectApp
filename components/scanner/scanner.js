import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Button,
} from "react-native";
import { PrimaryText, BoldText } from "../../subcomponents/text";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { Card } from "../idcard/idcard";
import { Loaderanim } from "../../subcomponents/loadingscreen/loadingscreen";
import { PrimaryButton } from "../../subcomponents/button";
import { verifyQRCode } from "../../api/verify_hash";

const Scanner = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanData, setScanData] = useState(null);
  const [isScanning, setIsScanning] = useState(true);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

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
      {isScanning ? (
        <CameraView
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          facing={"back"}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={(e) => {
            console.log("scab data ==== ");
            console.log(e.data);
            setIsScanning(false);
            setScanData(e.data ?? null);
          }}
        >
          <View
            style={{
              width: 250,
              height: 250,
              borderWidth: 2,
              borderColor: "white",
              borderRadius: 20,
            }}
          />
        </CameraView>
      ) : (
        <ScanDetails data={scanData} setIsScanning={setIsScanning} />
      )}
    </SafeAreaView>
  );
};

export default Scanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 40,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

const ScanDetails = ({ data, setIsScanning }) => {
  let hash = null;
  try {
    hash = JSON.parse(data)["hash"];
  } catch {}

  console.log(hash);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const verifyuser = async () => {
    if (!hash) return;
    setLoading(true);
    await verifyQRCode(hash)
      .then(async (res) => {
        if (res.ok) {
          setIsVerified(true);
          let data = await res.json();
          setUser(data.data);
        }
      })
      .catch((err) => console.log(err));
    setLoading(false);
  };

  useEffect(() => {
    verifyuser();
  }, []);

  if (loading) return <Loaderanim />;

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 20,
      }}
    >
      <BoldText
        children={isVerified ? "Verified" : "Unverified"}
        color={isVerified ? "green" : "red"}
        fontSize={isVerified ? 30 : 50}
      />
      {isVerified ? (
        <Card user={user} />
      ) : (
        <View>
          <PrimaryText
            children={"The user can not be verified."}
            fontSize={30}
            color={"red"}
          />
        </View>
      )}
      <PrimaryButton title={"Scan again"} onPress={() => setIsScanning(true)} />
    </View>
  );
};
