import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import StartButton from "../components/StartButton";
import STYLES from "../styles/STYLES";

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
    backgroundColor: STYLES.COLORS.app_main, // purple
    alignItems: "center",
    justifyContent: "center",
  },
});
