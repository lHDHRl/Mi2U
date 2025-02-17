import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import Input from "../components/Input";
export default function MainScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View></View>
      <Input />
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
  },
});
