// Шапка приложения
import React, { useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  SafeAreaView,
} from "react-native";
import messageInterface from "../types/utils";

// Шапка приложения
export function Header() {
  return (
    <SafeAreaView style={headerStyle.container}>
      <Text style={headerStyle.text}>mi2U</Text>
    </SafeAreaView>
  );
}

const headerStyle = StyleSheet.create({
  container: {
    backgroundColor: "#934CC2",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B8B2EF",
  },
});