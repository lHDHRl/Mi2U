import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import StartButton from "../components/STRTBUTTON";

export default function StartScreen() {
  return (
    <View style={styles.container}>
      <StartButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#934CC2",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    color: "#B8B2EF",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#52B788",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
