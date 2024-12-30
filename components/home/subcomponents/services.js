import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "../../../subcomponents/icon";
import { PrimaryText } from "../../../subcomponents/text";

export const Services = ({ navigation }) => {
  const th = navigation.preferences.th;
  const styles = StyleSheet.create({
    servicesContainer: {
      flexDirection: "row",
      justifyContent: "flex-start",
      flexWrap: "wrap",
      paddingHorizontal: 16,
      marginRight: 16,
      marginTop: 16,
    },
    serviceItem: {
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 8,
      padding: 16,
      width: "28%",
      marginBottom: 16,
      marginRight: "3%",
      elevation: 4,
      shadowColor: "#000",
    },
    serviceIcon: {
      fontSize: 24,
    },
    serviceLabel: {
      fontSize: 12,
      marginTop: 8,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.servicesContainer}>
      {[
        // {
        //   label: 'Announcement',
        //   icon: <Icon icon={'announcement'} height={50} width={50} />,
        // },
        {
          label: "Veteran Registration",
          icon: <Icon icon={"vetreg"} height={50} width={50} />,
        },
        {
          label: "NOK Registration",
          icon: <Icon icon={"nokreg"} height={50} width={50} />,
        },
        {
          label: "ECHS Registration",
          icon: <Icon icon={"nokreg"} height={50} width={50} />,
        },
      ].map((service, index) => (
        <TouchableOpacity
          key={index}
          style={styles.serviceItem}
          onPress={() => {
            if (index === 0) navigation.navigate("VeteransRegistration");
            if (index === 1) navigation.navigate("NokRegistration");
            if (index === 2) navigation.navigate("EchsRegistration");
          }}
        >
          <Text style={styles.serviceIcon}>{service.icon}</Text>

          <PrimaryText
            children={service.label}
            fontSize={th === 1 ? 12 : th === 2 ? 18 : 24}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
