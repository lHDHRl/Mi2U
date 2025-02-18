// Шапка приложения
import React, { useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import messageInterface from "../types/utils";

export function Header() {
  return (
    <View style={headerStyle.container}>
      <Text style={headerStyle.text}>mi2U</Text>
    </View>
  );
}

const headerStyle = StyleSheet.create({
  container: {
    backgroundColor: "#934CC2",
    padding: 2,
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
