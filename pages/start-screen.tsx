import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import StartButton from "../components/StartButton";

export default function StartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StartButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#934CC2",
    alignItems: "center",
    justifyContent: "center",
  },
});