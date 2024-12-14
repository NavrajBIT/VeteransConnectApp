import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const AnnouncementCard = ({ announcement, onPress, th }) => {
  const styles = StyleSheet.create({
    cardContainer: {
      marginBottom: 16,
      borderRadius: 8,
      backgroundColor: "#FFFFFF",
      elevation: 4,
      shadowColor: "#000",
    },
    cardContent: {
      flexDirection: "row",
      alignItems: "center",
      padding: 8,
    },
    textContainer: {
      flex: 1,
    },
    cardTitle: {
      fontSize: th === 1 ? 16 : th === 2 ? 24 : 32,
      fontWeight: "bold",
    },
    cardDate: {
      fontSize: th === 1 ? 12 : th === 2 ? 18 : 24,
      color: "#888",
      marginTop: 4,
    },
    cardImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginLeft: 8,
    },
  });
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{announcement.title}</Text>
          <Text style={styles.cardDate}>
            {new Date(announcement.created_at).toLocaleDateString()}
          </Text>
        </View>
        <Image
          source={{ uri: announcement.thumbnail }}
          style={styles.cardImage}
        />
      </View>
    </TouchableOpacity>
  );
};
