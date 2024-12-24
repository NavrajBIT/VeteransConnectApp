// DatePickerField.js
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Preferences from "./preferences";
import { translation } from "./localization/translation";

const DatePickerField = ({
  label,
  value,
  onChange,
  placeholder = "Select Date",
}) => {
  const { ln } = Preferences();
  try {
    label = ln === "en" ? label : translation[label][ln];
  } catch {}
  try {
    placeholder = ln === "en" ? placeholder : translation[placeholder][ln];
  } catch {}

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    const formattedDate = formatDate(date); // Format the date as YYYY/MM/DD
    onChange(formattedDate);
    hideDatePicker();
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0"); 
    return `${year}/${month}/${day}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.datePickerField} onPress={showDatePicker}>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            color: value ? "#000000" : "#888888",
          }}
        >
          {value ? value : placeholder}
        </Text>
        <FontAwesome
          name="calendar"
          size={24}
          color="#888888"
          style={{ alignSelf: "center" }}
        />
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width - 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    color: "#000000",
    marginBottom: 8,
  },
  datePickerField: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    height: 60,
    alignItems: "center",
  },
});

export default DatePickerField;
