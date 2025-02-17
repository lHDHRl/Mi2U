import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

export default function StartButton() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={ComponentStyle.MainContainer}>
      <View style={ComponentStyle.TextContainer}>
        <Text style={ComponentStyle.TextContainer}>mi2U</Text>
      </View>
      <View style={ComponentStyle.ButtonContainer}>
        <TouchableOpacity
          style={ComponentStyle.ButtonText}
          onPress={() => navigation.navigate("MainScreen")}
        >
          <Text style={ComponentStyle.ButtonText}>Начать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ComponentStyle = StyleSheet.create({
  ButtonContainer: {
    borderRadius: 15,
    backgroundColor: "#fff", // белый
    alignItems: "center",
    justifyContent: "center",
  },
  MainContainer: {
    backgroundColor: "#934CC2",
    alignItems: "center",
    justifyContent: "center",
  },
  TextContainer: {
    color: "#B8B2EF",
    fontSize: 60,
    fontFamily: "K2D_800ExtraBold",
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonText: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 25,
    fontWeight: 800,
    fontFamily: "K2D_800ExtraBold",
    color: "#958ED2",
  },
});
