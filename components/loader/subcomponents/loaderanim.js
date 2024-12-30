import { useState, useEffect } from "react";
import { View } from "react-native";

const Loaderanim = () => {
  const [currentPos, setCurrentPos] = useState(0);
  useEffect(() => {
    const myInterval = setInterval(() => {
      setCurrentPos((prev) => {
        if (prev >= 3) return 0;
        return prev + 1;
      });
    }, 500);
    return () => clearInterval(myInterval);
  }, []);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <View
        style={{
          height: 50,
          width: 50,
          backgroundColor: currentPos > 0 ? "#633ba3" : "transparent",
          borderRadius: 50,
        }}
      />
      <View
        style={{
          height: 50,
          width: 50,
          backgroundColor: currentPos > 1 ? "#633ba3" : "transparent",
          borderRadius: 50,
        }}
      />
      <View
        style={{
          height: 50,
          width: 50,
          backgroundColor: currentPos > 2 ? "#633ba3" : "transparent",
          borderRadius: 50,
        }}
      />
    </View>
  );
};

export default Loaderanim;
