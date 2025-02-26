import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import STYLES from "../styles/STYLES";

// кнопка для перехода в чат 
export default function StartButton() {
  // какая-то хуйня для навигации
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.MainContainer}>
      <View style={styles.TextContainer}>
        <Text style={styles.TextTitle}>mi2U</Text>
      </View>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => navigation.navigate("MainScreen")} // срабатывает по нажатии на кнопку 
      >
        <Text style={styles.ButtonText}>Начать</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: STYLES.COLORS.app_main, // purple
    alignItems: "center",
    justifyContent: "center",
  },
  TextContainer: {
    marginBottom: 20,
  },
  TextTitle: {
    color: STYLES.COLORS.logo_text, // light purple
    fontSize: 60,
    fontFamily: "K2D_800ExtraBold",
    textAlign: "center",
  },
  Button: {
    borderRadius: 15,
    backgroundColor: STYLES.COLORS.start_button_background, // white
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  ButtonText: {
    fontSize: 25,
    fontWeight: "800",
    fontFamily: "K2D_800ExtraBold",
    color: STYLES.COLORS.start_button_text, // purple
  },
});