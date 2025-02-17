import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

export default function StartButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.MainContainer}>
      <View style={styles.TextContainer}>
        <Text style={styles.TextTitle}>mi2U</Text>
      </View>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate("MainScreen")}
      >
        <Text style={styles.ButtonText}>Начать</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#934CC2",
    alignItems: "center",
    justifyContent: "center",
  },
  TextContainer: {
    marginBottom: 20,
  },
  TextTitle: {
    color: "#B8B2EF",
    fontSize: 60,
    fontFamily: "K2D_800ExtraBold",
    textAlign: "center",
  },
  Button: {
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ButtonText: {
    fontSize: 25,
    fontWeight: "800",
    fontFamily: "K2D_800ExtraBold",
    color: "#958ED2",
  },
});