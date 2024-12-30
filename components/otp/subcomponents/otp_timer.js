import { PrimaryText } from "../../../subcomponents/text";

import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const OtpTimer = ({ onResend }) => {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds === 0) return;
    const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <View style={styles.timerContainer}>
      {seconds > 0 ? (
        <>
          <PrimaryText fontSize={16} color={"gray"}>
            Resend OTP
          </PrimaryText>
          <PrimaryText fontSize={16} color={"gray"}>
            {seconds}s
          </PrimaryText>
        </>
      ) : (
        <TouchableOpacity onPress={onResend}>
          <PrimaryText fontSize={16} color={"blue"}>
            Resend OTP
          </PrimaryText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
});
